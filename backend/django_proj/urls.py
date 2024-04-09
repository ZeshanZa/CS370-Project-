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

# Add Django site authentication urls (for login, logout, password management)

router = DefaultRouter()
# router.register(r'skills', skill_views.SkillViewSet)
# router.register(r'user_skills', skill_views.UserSkillViewSet)
# router.register(r'users', skill_views.UserViewSet)
router.register(r'user_profiles', skill_views.UserProfileViewSet)

urlpatterns = [
    path('api/auth/', include('authentication.urls')),
    path("admin/", admin.site.urls),
    path('', include('userProjects.urls')),
    path('', include('matches.urls')),
    path('friendsList/', include('friendsSystem.urls')),
    path('api/update_user_skills/', skill_views.UpdateUserSkillsView.as_view(), name='update_user_skills'),
    path('api/get_user_skills/<int:user_id>/<str:array_type>/', skill_views.GetUserSkillsView.as_view(), name='get_user_skills'),
    path('api/get_skills_with_user_specification/<int:specific_user_id>/', skill_views.GetSkillsWithUserSpecificationView.as_view(), name='get_skills_with_user_specification'),
    path('api/', include(router.urls)),
]

