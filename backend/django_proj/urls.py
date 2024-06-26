"""
URL configuration for django_proj project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import include
from django.contrib import admin
from django.urls import path
from skills import views as skill_views
from rest_framework.routers import DefaultRouter
from django.urls import get_resolver

# Add Django site authentication urls (for login, logout, password management)

router = DefaultRouter()
router.register(r'skills', skill_views.SkillsViewSet, basename='skills')
router.register(r'masterskills', skill_views.MasterSkillsViewSet, basename='master-skills')

urlpatterns = [
    path('api/auth/', include('authentication.urls')),
    path("admin/", admin.site.urls),
    path('', include('userProjects.urls')),
    path('', include('matches.urls')),
    path('friendsList/', include('friendsSystem.urls')),
    path('', include(router.urls)),
]

# all_urls = list(get_resolver().reverse_dict.keys())
# print(all_urls)
