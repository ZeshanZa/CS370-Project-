from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model
from .models import Friend, FriendRequest
from rest_framework import serializers

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

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'first_name', 'last_name', 'email')  # Adjust based on the information you want to include