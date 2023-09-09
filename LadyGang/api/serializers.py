#takes model to json response
#returns values from model
#use serializers to handle request and responses

from rest_framework import serializers
from .models import Room

#take a room object and serialize as something we can return back as a response
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        #what model we wan serialized
        model = Room
        #include all fields we want in the serialization / output
        #id is the primary key (unique int) that can identify the model in relation to all other models
        #id ia automatically created when model is created
        fields = ('__all__')
        

#make sure that data being sent in create room request fits to create room
#serialize a request and make sure its valid in a format we can work with
class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip', 'room_name')

#takes in code, guest_can_pause, and votes_to_skip
class UpdateRoomSerializer(serializers.ModelSerializer):
    
    #bypass need for unique code bc code we'll be passing does already exist (therefore isnt unique)
    #redefined code field so not referencing code field from models (which is unique)
    #now code will referencing the field below under fields []
    code = serializers.CharField(validators=[])
    
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip', 'room_name', 'code')