from rest_framework import serializers
from .models import Project
from .models import UserProfile
from django.contrib.auth import get_user_model

User = get_user_model()

class ProjectSerializer(serializers.ModelSerializer):
    contributors = serializers.PrimaryKeyRelatedField(
        many=True, queryset=User.objects.all(), required=False
    )

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'github_url', 'contributors', 'created_at']



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'full_name', 'github_url', 'major','bio']