from django.shortcuts import render
#allows us to createa a class that inherits from a generic api view
#custom http status codes to use for response
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer, SingleRoomSerializer
from .models import Room

#generic API view
from rest_framework.views import APIView
#enable us to send custom response from our view
from rest_framework.response import Response


# views

#need request param
#incoming request goes to endpoint, endpoint delivers a response

#allow us to view all rooms/create a room
#tell it the query set (what we want to return) 
#give serializer class that returns in a useable format defined in serializer.py
class RoomsView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    
#using APIView allows us to overide some default methods
#when we def a method, when we send the req it will dispatch to correct method
class CreateRoomView(APIView):
    #this line not actually necessary, convenience
    serializer_class = CreateRoomSerializer
    
    def post(self, request, format=None):
        
        #need to get access to session id
        #checking if current request/user has an active session. if not create one
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            
        #serializer we created, createroomserializer, will tell us if data is valid
        #according to what is written in serializers.py
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            #create room using these values
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            
            #check to see if the host already has a room
            queryset = Room.objects.filter(host=host)
            
            #if the host already has a room, take the room the host already owns
            #update the settings of the old room with the new settings
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                #not creating a new room so we need to include update parameters
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
                
            #if host does not already have a room 
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request' : 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    
#single room view 
class RoomView(generics.ListAPIView):
    serializer_class = SingleRoomSerializer
    
    def get_queryset(self):
        #retrieve roomCode from the URL kwargs
        room_code = self.kwargs.get('roomCode')
        
        #print roomcode to console for debugging
        print(f"Recieved 'roomCode' : {room_code}")
        
        #query db for room w code matching roomCode
        queryset = Room.objects.filter(code=room_code)
        
        return queryset