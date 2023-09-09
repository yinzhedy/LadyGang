from django.urls import path
from .views import index

urlpatterns = [
    #render index template whenever we have blank path
    path('', index),
    path('music', index),
    path('music/join', index),
    path('music/create', index),
    path('testpage', index),
    path('music/room/<str:roomCode>', index)
]   
