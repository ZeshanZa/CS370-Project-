from rest_framework.serializers import ModelSerializer

from .models import Friend

class FriendSerializer(ModelSerializer):
    class Meta:
        model = Friend
        fields = (
            'id', 'name', 'skills', 'projects', 'github_url'
        )