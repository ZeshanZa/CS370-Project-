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
    path('accept-match-request/<str:sender_username>/', views.accept_match_request, name='accept-match-request')
]