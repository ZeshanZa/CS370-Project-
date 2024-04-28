from .models import Match
from django.contrib.auth.models import User
from rest_framework import serializers

class MatchSerializer(serializers.ModelSerializer):
    other_user = serializers.SerializerMethodField()
    status = serializers.CharField()

    class Meta:
        model = Match
        fields = ['other_user', 'status']

    def get_other_user(self, obj):
        request_user = self.context['request'].user
        # Determine the other user based on the sender and receiver fields
        if request_user == obj.sender:
            other_user = obj.receiver
        else:
            other_user = obj.sender
        return other_user.username
    
class MatchDetailSerializer(serializers.ModelSerializer):
    sender_id = serializers.ReadOnlyField(source='sender.id')
    receiver_id = serializers.ReadOnlyField(source='receiver.id')

    class Meta:
        model = Match
        fields = ['id', 'sender_id', 'receiver_id', 'status']
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']
        
