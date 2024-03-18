from django.http import JsonResponse
from .models import Skill
from .serializers import SkillSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET','POST'])
def Skill_list(request, format=None):
    
    if request.method == 'GET':
        skills = Skill.objects.all()
        serializer = SkillSerializer(skills, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = SkillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_created)
        
        
@api_view(['GET','PUT', 'DELETE'])       
def skill_detail(request, id, format=None):
    
    try:
        skill = Skill.objects.get(pk=id)
    except Skill.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    
    if request.method == 'GET':
        serializer = SkillSerializer(skill)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = SkillSerializer(skill,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    elif request.method == 'DELETE':
        skill.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)