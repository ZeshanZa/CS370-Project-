from django.urls import path
from . import views

urlpatterns = [
    path('send-match-request/<str:sender_username>/<str:receiver_username>/', views.send_match_request, name='send_match_request'),
    path('view-match-requests/', views.view_match_requests, name='view_match_request'),
    path('matched-profile/<str:username>/', views.MatchedUserProfileView.as_view(), name='matched-profile'),
    path('get-username/', views.get_username, name='get_username'),
    path('user-matches/', views.UserMatchesView.as_view(), name='user-matches'),
    path('user-list/', views.UserListView.as_view(), name='user-list'),
    path('decline-match/<str:sender_username>/', views.decline_match_request, name='decline-match-request'),
    path('accept-match-request/<str:sender_username>/', views.accept_match_request, name='accept-match-request'),
    path('pending_requests/<int:user_id>/', views.view_pending_matching_requests, name='pending-requests'),
    path('mark_notification_as_sent_interacted/<int:match_id>/', views.mark_notification_as_sent_interaction, name='mark-notification-as-sent-interacted'),
    path('mark_notification_as_sent_pending/<int:match_id>/', views.mark_notification_as_sent_pending, name='mark-notification-as-sent-pending'),
    path('check_match_request_status/<int:user_id>/', views.check_match_request_status, name='check-match-request-status'),
    path('delete-match/<str:self_username>/<str:username>/', views.add_removed_match, name='delete-match'),
    path('view-deleted-matches/<str:username>/', views.view_deleted_matches, name='view-deleted-matches'), 
    path('get-username/<int:user_id>/', views.get_username_by_id, name='get-username-by-id'),
]