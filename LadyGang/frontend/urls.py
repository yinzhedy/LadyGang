from django.urls import path
from .views import index

urlpatterns = [
    #render index template whenever we have blank path
    path('', index),
    path('join', index),
    path('create', index),
    path('test', index),
    path('room/<str:roomCode>', index)
]   
