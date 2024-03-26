from django.contrib import admin
from django.urls import path, include 
from .views import project_detail

urlpatterns = [ 
    path('projects/', project_detail, name='projects' )            
]