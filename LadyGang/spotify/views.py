from django.shortcuts import render, redirect
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID

from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response

from .util import update_or_create_user_tokens, is_spotify_authenticated

# Create your views here.
#authen application / request access

#return a URL we can go to to authenticate our spotify application
#not actually sending request, generating url to send request
class AuthURL(APIView):
    def get(self, request, format=None):
        #info we want access to = scopes, avail on spotify docs
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'
        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            #requesting code back to authenticate user
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID,
        }).prepare().url
        
        return Response({'url': url}, status=status.HTTP_200_OK)
    
#when we get our code and state returned from above, take that code and do something w it
def spotify_callback(request, format=None):
    code = request.GET.get('code')
    error = request.GET.get('error')
    
    #send request back to spotify acct service to get access and refresh token
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code, 
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()
    #want to look at response and get access token and refresh token
    print(response, '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')
    
    #get or create session key
    if not request.session.exists(request.session.session_key):
        request.session.create()
    #save these tokens
    update_or_create_user_tokens(
        request.session.session_key, access_token, token_type, expires_in, refresh_token)
    
    #if we want to redirect to a page within frontend application,
    # we need name of application : and page we want to go to
    #this redirects to front-end homepage
    return redirect('frontend:music')

#call util function is_user_authenticated to tell us whether or not were authenticated
class IsAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)