from django.shortcuts import render, redirect
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID
from api.models import Room
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response

from .util import *

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
    

#return info about current song
class CurrentSong(APIView):
    def get(self, request, format=None):
        room_code = self.request.session.get('room_code')
        #if person sending request is not host, find host and use their info to get song info
        room = Room.objects.filter(code=room_code)
        if room.exists():
            room = room[0]
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        host = room.host
        endpoint = "player/currently-playing"
        #send get request to spotify
        response = execute_spotify_api_request(host, endpoint)
        #if no song playing, return nothing but status
        if 'error' in response or 'item' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        item = response.get('item')
        duration = item.get('duration_ms')
        progress = response.get('progress_ms')
        album_cover = item.get('album').get('images')[0].get('url')
        is_playing = response.get('is_playing')
        song_id = item.get('id')
        #handle multiple artists
        artist_string = ''
        for i, artist in enumerate(item.get('artists')):
            if i > 0:
                artist_string += ', '
            name = artist.get('name')
            artist_string += name
        
        song = {
            'title': item.get('name'),
            'artist': artist_string,
            'duration' : duration,
            'time': progress,
            'image_url': album_cover,
            'is_playing' : is_playing,
            'votes': 0,
            'id' : song_id
        }
                
        return Response(song, status=status.HTTP_200_OK)