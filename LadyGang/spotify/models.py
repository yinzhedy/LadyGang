from django.db import models

# Create your models here.


 #store the tokens, for multiple users (every time a person creates a room)
#create database for tokens, associate session ID w token
#only need access tokens for hosts
class SpotifyToken(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=500)
    access_token = models.CharField(max_length=150)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length =50)