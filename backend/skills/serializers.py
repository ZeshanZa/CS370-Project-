from rest_framework import serializers
from .models import UserProfile #, Skills, UserSkills, 
from django.contrib.auth.models import User
        
# new serializers        
# class SkillsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Skills
#         fields = ['id','name']
        
# class UserSkillsSerializer(serializers.ModelSerializer):
#     skill = SkillsSerializer(read_only=True)
#     skill_id = serializers.IntegerField(write_only=True)

#     class Meta:
#         model = UserSkills
#         fields = ['id', 'user', 'skill', 'skill_id', 'acquiring', 'searching']

# class UserSerializer(serializers.ModelSerializer):
#     skills = UserSkillsSerializer(source='userskill_set', many=True)

#     class Meta:
#         model = User
#         fields = ['id', 'username', 'skills']
        
        
# new new serializers
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'have', 'searching']
        
# class SkillUpdateSerializer(serializers.Serializer):
#     user_id = serializers.IntegerField()
#     new_array = serializers.ListField(child=serializers.CharField(max_length=100))
#     array_type = serializers.ChoiceField(choices=['have', 'searching'])
    
# class UserSkillRequestSerializer(serializers.Serializer):
#     user_id = serializers.IntegerField()
#     array_type = serializers.ChoiceField(choices=['have', 'searching'])