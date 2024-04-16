from django.urls import path
from . import views


urlpatterns = [
    path('', views.getFriendsInfo, name='friendsList'),
    path('detailedFriendsList/', views.DetailedFriendListView.as_view(), name='detailedFriendsList'),
    path('outgoingPendingRequests/', views.OutgoingPendingRequestsView.as_view(), name='outgoingPendingRequests'),
    path('incomingPendingRequests/', views.IncomingPendingRequestsView.as_view(), name='incomingPendingRequests'),
    path('viewFriend/<str:username>', views.FriendView.as_view(), name='friendsView'),
    path('sendFriendRequest/<str:username>/', views.sendFriendRequest, name='sendFriendRequest'),
    path('acceptFriendRequest/<str:username>/', views.acceptFriendRequest, name='acceptFriendRequest'),
    path('rejectFriendRequest/<str:username>/', views.rejectFriendRequest, name='rejectFriendRequest'),
    path('removeFriend/<str:username>/', views.removeFriend, name='removeFriend'),

]