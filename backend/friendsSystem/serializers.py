from rest_framework.serializers import ModelSerializer

from .models import Friend, FriendRequest

class FriendSerializer(ModelSerializer):
    class Meta:
        model = Friend
        fields = (
            'friend_id', 'friend1', 'friend2'
        )
        
class FriendRequestSerializer(ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = (
            'friendRequest_id', 'reqSender', 'reqReceiver', 'status'
        )