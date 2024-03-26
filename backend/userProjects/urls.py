from django.urls import path
from .views import ProjectCreateView

urlpatterns = [ 
    path('projects/create/', ProjectCreateView.as_view(), name='project-create'),           
]