from django.urls import path
from .views import ProjectCreateView, UserProfileView, ProjectListView, ProjectDetailView, MatchedUserProfileView
from . import views

urlpatterns = [ 
    path('projects/create/', ProjectCreateView.as_view(), name='project-create'), 
    path('profile/', UserProfileView.as_view(), name='user-profile'),     
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('projects/<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),   
    path('send-friend-request/<int:user_id>/', views.send_friend_request, name='send_friend_request'),
    path('accept-friend-request/<int:match_id>/', views.accept_friend_request, name='accept_friend_request'),
    path('user-id/<str:username>/', views.view_user_id, name='view_user_id'),
    path('pending-requests/', views.list_pending_requests, name='pending_requests'),
    path('matched-profile/<str:username>/', MatchedUserProfileView.as_view(), name='matched-profile'),

]