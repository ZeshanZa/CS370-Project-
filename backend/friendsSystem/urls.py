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
    path('removeFriend/<str:self_username>/<str:friend_username>/', views.removeFriend, name='removeFriend'),
    path('friendProfile/<str:username>', views.FriendUserProfileView.as_view(), name='friend-profile'),
    path('searchFriends/', views.NonFriendsList.as_view(), name='non-friends'),
    path('pending_requests/<int:user_id>/', views.view_pending_friend_requests, name='pending-requests'),
    path('mark_notification_as_sent_interacted/<str:friend_request_id>/', views.mark_notification_as_sent_interaction, name='mark-notification-as-sent-interacted'),
    path('mark_notification_as_sent_pending/<str:friend_request_id>/', views.mark_notification_as_sent_pending, name='mark-notification-as-sent-pending'),
    path('check_friend_request_status/<int:user_id>/', views.check_friend_request_status, name='check-friend-request-status'),

]