from django.shortcuts import render
#allows us to createa a class that inherits from a generic api view
#custom http status codes to use for response
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer, UpdateRoomSerializer
from .models import Room

#generic API view
from rest_framework.views import APIView
#enable us to send custom response from our view
from rest_framework.response import Response
from django.http import JsonResponse


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
            room_name = serializer.data.get('room_name')
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            
            #check to see if the host already has a room
            queryset = Room.objects.filter(host=host)
            
            #if the host already has a room, take the room the host already owns
            #update the settings of the old room with the new settings
            if queryset.exists():
                room = queryset[0]
                room.room_name = room_name
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                #not creating a new room so we need to include update parameters
                room.save(update_fields=['guest_can_pause', 'votes_to_skip', 'room_name'])
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
                
            #if host does not already have a room 
            else:
                room = Room(host=host,
                            guest_can_pause=guest_can_pause,
                            votes_to_skip=votes_to_skip,
                            room_name=room_name)
                room.save()
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request' : 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    
#single room view 
class GetRoom(APIView):
    def get(self, request, roomCode):
        # Query the database for a room with the specified code
        try:
            room = Room.objects.get(code=roomCode)
        except Room.DoesNotExist:
            return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)

        # Serialize the room object to JSON using your RoomSerializer
        serializer = RoomSerializer(room)

        # Check if the current session key matches the host's session key
        if request.session.session_key == room.host:
            is_host = request.session.session_key == room.host
            room.is_host = is_host
            room.save(update_fields=['is_host'])
            return Response(serializer.data, status=status.HTTP_200_OK)

        else:
            return Response(serializer.data, status=status.HTTP_304_NOT_MODIFIED)
        
class JoinRoom(APIView):
    lookup_url_kwarg = 'code'
    
    def post(self, request, format=None):
        
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        code = request.data.get(self.lookup_url_kwarg)
        
        if code != None:
            room_result = Room.objects.filter(code=code)
            if len(room_result) > 0:
                room = room_result[0]
                #if user was originally in a room, return them to that room
                self.request.session['room_code'] = code
                return Response({'message' : 'Room Joined!'}, status=status.HTTP_200_OK)
            return Response({'Bad Request' : 'Invalid room code'}, status=status.HTTP_400_BAD_REQUEST)
        #if no room code found
        return Response({'Bad Request': 'Invalid post data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)
    
class UserInRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        data = {
            'code': self.request.session.get('room_code')
        }
        #JsonResponse takes python disctionary serializing using json serializer and sends it back in request
        return JsonResponse(data, status=status.HTTP_200_OK)
        
class LeaveRoom(APIView):
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            #removes room_code from the user's session
            self.request.session.pop('room_code')
            #get host_id
            host_id = self.request.session.session_key
            #filter all room objejcts to see if user is hosting a room
            room_results = Room.objects.filter(host=host_id)
            #if there is a room, delete it
            if len(room_results) > 0:
                room = room_results[0]
                room.delete()
        return Response({'Message' : 'Success'}, status=status.HTTP_200_OK)
    
class UpdateRoomView(APIView):
    serializer_class = UpdateRoomSerializer
    
    def patch(self, request, format=None):
        #make sure we create a session if there isnt one
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        #passing data to serializer to see if valid
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            code = serializer.data.get('code')
            name = serializer.data.get('room_name')
            
            #find room with the same code
            queryset = Room.objects.filter(code=code)
            
            #make sure we found room
            #if it doesnt exist
            if not queryset.exists():
                return Response({'Message' : 'Room Doesnt Exist'}, status=status.HTTP_404_NOT_FOUND)
            #if we did find a room
            room = queryset[0]
            user_id = self.request.session.session_key
            #see if user is host
            #if host not do this
            if room.host != user_id:
                return Response({'Message' : 'You are not the host of this room'}, status=status.HTTP_403_FORBIDDEN)
            #if passed test and is host then update fields and save room
            room.guest_can_pause = guest_can_pause
            room.votes_to_skip = votes_to_skip
            room.room_name = name
            room.save(update_fields=['guest_can_pause', 'votes_to_skip', 'room_name'])
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK )
            
        return Response({'Bad Request' : 'Invalid Data...'} , status=status.HTTP_400_BAD_REQUEST)