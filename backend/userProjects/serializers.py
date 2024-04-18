from rest_framework import serializers
from .models import Project
from .models import UserProfile

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'github_url', 'created_at']



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'full_name', 'github_url', 'major','bio']