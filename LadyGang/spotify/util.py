from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from .credentials import CLIENT_ID, CLIENT_SECRET
from requests import post

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
    print(refresh_token)
    print(tokens)
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
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token' : refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()
    
    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')
    refresh_token = response.get('refresh_token')
    
    update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token)