from django.urls import path
from .views import ProjectCreateView, UserProfileView, ProjectListView, ProjectDetailView

urlpatterns = [ 
    path('projects/create/', ProjectCreateView.as_view(), name='project-create'), 
    path('profile/', UserProfileView.as_view(), name='user-profile'),     
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('projects/<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),   
]