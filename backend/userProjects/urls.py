from django.urls import path
from .views import (ProjectCreateView, UserProfileView, ProjectListView, ProjectDetailView, UserListView, UserEmailView)
from . import views

urlpatterns = [ 
    path('projects/create/', ProjectCreateView.as_view(), name='project-create'), 
    path('profile/', UserProfileView.as_view(), name='user-profile'),     
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('projects/<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),   
    #path('send-match-request/<str:sender_username>/<str:receiver_username>/', send_match_request, name='send_match_request'),
    #path('send-match-request/<str:username>', views.send_match_request1, name='send_match_request1'),
    # path('accept-match-request/<str:username>/', views.accept_match_request, name='accept_match_request'),
    # path('reject-match/<str:username>/', views.reject_match_request, name='reject_match'),
    path('user-id/<str:username>/', views.view_user_id, name='view_user_id'),
    path('get-user-pk/<str:username>/', views.get_user_pk, name='get-user-pk'),
    path('friend-project/<str:username>', views.friendProjectView.as_view(), name='view_friend_project'),
    # path('pending-requests/', views.list_pending_requests, name='pending_requests'),
    # path('matched-profile/<str:username>/', MatchedUserProfileView.as_view(), name='matched-profile'),
    # path('matched-userprofile/<str:username>/', views.view_profile, name='view_profile'),
    # path('user-list/', UserListView.as_view(), name='user-list'),
    # path('user-matches/', UserMatchesView.as_view(), name='user-matches'),
    # path('templates/', template, name='templates'),
    # path('get-username/', views.get_username, name='get_username'),
    path('userslist/', UserListView.as_view(), name='user-list'),
    path('get-email/<str:username>/', UserEmailView.as_view(), name='get_user_email'),
    path('get-username/<int:user_id>/', views.get_username_by_id, name='get_username_by_id'),
]