from django.urls import path
from .views import RoomView

#if we get an url which is blank, call the main function
# and do whatever main function says to do as an http response
urlpatterns = [
    #as view takes the class and gives the view for it
    path('room', RoomView.as_view())
]
