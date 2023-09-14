from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from .credentials import CLIENT_ID, CLIENT_SECRET
from requests import post, put, get

BASE_URL ="https://api.spotify.com/v1/me/"

#function that checks if user (session id) has a token already
def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None

#function that saves tokens, either brand new model or update existing model
def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token):
    #use get_user_tokens id to check if user has a token already
    tokens = get_user_tokens(session_id)
    #store time at which token expires, get current time and add 1 hr
    print(refresh_token, 'ggggggggggggggggggggggggggggggggggggggggggg')
    print(tokens, '555555555555555555555555555555555555555555555555')
    print(expires_in, '********************************************************')
    expires_in = timezone.now() + timedelta(seconds=expires_in)
    
    #if user has token, update existing one
    if tokens:
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.save(update_fields=['access_token', 'refresh_token', 'expires_in', 'token_type' ])
        
    #if no existing token, create
    else:
        tokens= SpotifyToken(user=session_id, 
                            access_token=access_token, 
                            refresh_token=refresh_token, 
                            token_type=token_type, 
                            expires_in=expires_in)
        tokens.save()
        
#function to check is user is already authenticated
def is_spotify_authenticated(session_id):
    #check is user is already authenticated / has token
    tokens = get_user_tokens(session_id)
    if tokens:
        print(tokens, '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
        expiry = tokens.expires_in
        #check if token is expired
        if expiry <= timezone.now():
            #if it is expired then refresh it
            refresh_spotify_token(session_id)
        #return true if there was a token
        return True
    #return false if no token for user
    return False

#refreshes spotify tooken
def refresh_spotify_token(session_id):
    refresh_token = get_user_tokens(session_id).refresh_token
    print(refresh_token, 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()
    
    print(response, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    
    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')
    #refresh_token = response.get('refresh_token')
    print(refresh_token, 'ffffffffffffffffffffffffffffffffffffffffffffffffff')
    
    update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token)
    
#function that can send a request to any spotify endpoint
def execute_spotify_api_request(session_id, endpoint, post_=False, put_=False):
    tokens = get_user_tokens(session_id)
    headers = {'Content-Type': 'application/json', 'Authorization': "Bearer " + tokens.access_token}
    
    if post_:
        post(BASE_URL + endpoint, headers=headers)
    if put_:
        put(BASE_URL + endpoint, headers=headers)
    #if you didnt want to post or put we assume get
    response = get(BASE_URL + endpoint, {}, headers=headers)
    #we could possibly have issue sending get request, if error return error
    try:
        return response.json()
    except:
        return {'Error': 'Issue with request'}