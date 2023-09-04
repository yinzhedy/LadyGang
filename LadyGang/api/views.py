#write our endpoints - after the slash - location on web
from django.shortcuts import render
#allows us to createa a class that inherits from a generic api view
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room

# Create your views here.

#need request param
#incoming request goes to endpoint, endpoint delivers a response

#urls are stored in url.py

#allow us to view all rooms/create a room
#tell it the query set (what we want to return) 
#give serializer class that returns in a useable format defined in serializer.py
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer