from django.http import JsonResponse
from .models import Skills, UserSkills
from .serializers import SkillsSerializer, UserSkillsSerializer, UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from django.contrib.auth.models import User
    
# new views (generics can use all requests)
# create, retrieve, update, delete, etc
class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skills.objects.all()
    serializer_class = SkillsSerializer

class UserSkillViewSet(viewsets.ModelViewSet):
    queryset = UserSkills.objects.all()
    serializer_class = UserSkillsSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer