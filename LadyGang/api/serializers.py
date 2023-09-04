#takes model to json response
#returns values from model

from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        #what model we wan serialized
        model = Room
        #include all fields we want in the serialization / output
        #id is the primary key (unique int) that can identify the model in relation to all other models
        #id ia automatically created when model is created
        fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at')