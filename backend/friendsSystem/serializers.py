from rest_framework.serializers import ModelSerializer

from .models import Friend, FriendRequest

class FriendSerializer(ModelSerializer):
    class Meta:
        model = Friend
        fields = (
            'id', 'name', 'skills', 'projects', 'github_url'
        )
        
class FriendRequestSerializer(ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = (
            'friendRequest_id', 'reqSender', 'reqReceiver', 'status'
        )