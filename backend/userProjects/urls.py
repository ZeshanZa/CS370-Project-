from django.urls import path
from .views import ProjectCreateView, UserProfileView

urlpatterns = [ 
    path('projects/create/', ProjectCreateView.as_view(), name='project-create'), 
    path('profile/', UserProfileView.as_view(), name='user-profile'),          
]