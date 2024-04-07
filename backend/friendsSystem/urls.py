from django.urls import path
from . import views


urlpatterns = [
    path('', views.FriendListView.as_view(), name='friendsList'),
    path('sendFriendRequest/<int:user_id>/', views.sendFriendRequest, name='sendFriendRequest'),
    path('acceptFriendRequest/<int:friendRequest_id>/', views.acceptFriendRequest, name='acceptFriendRequest'),
    path('rejectFriendRequest/<int:friendRequest_id>/', views.rejectFriendRequest, name='rejectFriendRequest'),

]