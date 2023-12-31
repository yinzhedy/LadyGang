#database py
from django.db import models
import string
import random

def generate_unique_code():
    length = 6
    
    #generate bunch of codes until unique one found
    while True:
        #generate a random code that is k length and that only contains uppercase ascii characters
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        #check if code in unique
        #room.objects.file(code) gives all room objects, filtered by code
        #code=code checks if the Room model's code matches our variable code
        # .count() returns a list of all objects that meet the code==code criteria
        #if none meet this criteria, then the code is unique, break and return code variable
        if Room.objects.filter(code=code).count() == 0:
            break
    return code


# Create your models here.
# in a stndrd db you have table (rows/columns)
#in django, when you create a table you make a model

#group users in a room to control host's music
#models.Model tells us that room is going to be a model
class Room(models.Model):
    #fields found via django documentation and looking them up
    
    #unique code that identifies the room
    #code is going to store a bunch of characters
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    
    #host = unique, 1 host per room
    host = models.CharField(max_length=50, unique=True)
    
    guest_can_pause = models.BooleanField(null=False, default=False)

    votes_to_skip = models.IntegerField(null=False, default=2)
    
    #automatically add date room was created at
    created_at = models.DateTimeField(auto_now_add=True)
    
    is_host = models.BooleanField(null=False, default=False)
    
    room_name = models.CharField(max_length=50, unique=False, default='Room')
    
    #can add methods on this model
    #want fat models and thin views, put most your logic on your models