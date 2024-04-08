from django.urls import path
from . import views


urlpatterns = [
    path('', views.FriendListView.as_view(), name='friendsList'),
    path('viewFriend/<str:username>', views.FriendView.as_view(), name='friendsView'),
    path('sendFriendRequest/<str:username>/', views.sendFriendRequest, name='sendFriendRequest'),
    path('acceptFriendRequest/<str:friendRequest_id>/', views.acceptFriendRequest, name='acceptFriendRequest'),
    path('rejectFriendRequest/<str:friendRequest_id>/', views.rejectFriendRequest, name='rejectFriendRequest'),
    path('removeFriend/<str:username>/', views.removeFriend, name='removeFriend'),

]