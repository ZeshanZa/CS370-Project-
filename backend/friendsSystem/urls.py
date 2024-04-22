from django.urls import path
from . import views


urlpatterns = [
    path('', views.getFriendsInfo, name='friendsList'),
    path('detailedFriendsList/', views.DetailedFriendListView.as_view(), name='detailedFriendsList'),
    path('outgoingPendingRequests/', views.OutgoingPendingRequestsView.as_view(), name='outgoingPendingRequests'),
    path('incomingPendingRequests/', views.view_friend_requests, name='incomingPendingRequests'),
    path('viewFriend/<str:username>', views.FriendView.as_view(), name='friendsView'),
    path('sendFriendRequest/<str:sender_username>/<str:receiver_username>/', views.sendFriendRequest, name='sendFriendRequest'),
    path('acceptFriendRequest/<str:sender_username>/', views.accept_friend_request, name='acceptFriendRequest'),
    path('rejectFriendRequest/<str:sender_username>/', views.reject_friend_request, name='rejectFriendRequest'),
    path('removeFriend/<str:username>/', views.removeFriend, name='removeFriend'),

]