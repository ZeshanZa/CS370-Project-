from rest_framework import serializers
from .models import Skills, UserSkills
from django.contrib.auth.models import User
        
# new serializers        
class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = ['id','name']
        
class UserSkillsSerializer(serializers.ModelSerializer):
    skill = SkillsSerializer(read_only=True)
    skill_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = UserSkills
        fields = ['id', 'user', 'skill', 'skill_id', 'acquiring', 'searching']

class UserSerializer(serializers.ModelSerializer):
    skills = UserSkillsSerializer(source='userskill_set', many=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'skills']