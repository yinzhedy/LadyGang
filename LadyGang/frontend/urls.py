from django.urls import path
from .views import index


#django needs to know this url py file belongs to front end app
app_name = 'frontend'

urlpatterns = [
    #render index template whenever we have blank path
    path('', index, name=''),
    path('music', index, name='music'),
    path('music/join', index),
    path('music/create', index),
    path('support', index),
    path('music/room/<str:roomCode>', index),
    path('music/room/<str:roomCode>/settings', index)
]   
