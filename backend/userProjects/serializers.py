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
        fields = '__all__'

    def update(self, instance, validated_data):
        # Correctly checking if 'contributors' is provided in the validated data
        contributors = validated_data.pop('contributors', None)
        if contributors is not None:
            instance.contributors.set(contributors)
        # Always call the superclass to save the instance and handle other fields
        return super().update(instance, validated_data)



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'full_name', 'github_url', 'major','bio']