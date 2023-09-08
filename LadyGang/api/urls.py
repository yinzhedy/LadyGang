from django.urls import path
from .views import RoomsView, CreateRoomView, GetRoom, JoinRoom, UserInRoom

#if we get an url which is blank, call the main function
# and do whatever main function says to do as an http response
urlpatterns = [
    #as view takes the class and gives the view for it
    path('rooms', RoomsView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room/<str:roomCode>', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('user-in-room', UserInRoom.as_view())
]
