from .models import Skills 
from .serializers import SkillsSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.status import HTTP_400_BAD_REQUEST

class SkillsViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user skills.
    """
    queryset = Skills.objects.all()
    serializer_class = SkillsSerializer
    
    @action(detail=False, methods=['post'], url_path='(?P<user_id>\d+)/reset-skills')
    def reset_skills(self, request, user_id=None):
        """
        Resets the skills of a user identified by user_id to their default values.
        """
        skills = get_object_or_404(Skills, user__id=user_id)
        skills.reset_skills()
        return Response({'status': 'Skills have been reset to default.'}, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['get'], url_path='get-complete-skills')
    def get_complete_skills(self, request, pk=None):
        """
        Retrieves the complete set of skills (both 'acquired' and 'search') for a specified user.

        Parameters:
            request (Request): The HTTP request object.
            pk (int): The primary key of the user whose complete skills set is to be retrieved.

        Returns:
            Response: HTTP response containing both 'acquired' and 'search' skills.
        """
        skills = get_object_or_404(Skills, user_id=pk)
        serializer = SkillsSerializer(skills)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], url_path='(?P<category>[^/.]+)/(?P<skill_type>[^/.]+)/update-skills')
    def update_skills(self, request, pk=None, category=None, skill_type=None):
        """
        Updates a specific type of skills for a user.

        Parameters:
            request (Request): The HTTP request object.
            pk (int): The primary key of the user whose skills are to be updated.
            category (str): The category of skills to update ('acquired' or 'search').
            skill_type (str): The type of skills to update (e.g., 'Exp', 'DB', 'Lang', 'Pers').

        Returns:
            Response: HTTP response with the update status.
        """
        skills = get_object_or_404(Skills, user_id=pk)
        new_skills = request.data.get('new_skills', [])
        if not new_skills:
            return Response({'error': 'new_skills is required'}, status=HTTP_400_BAD_REQUEST)

        skills.update_user_skills(pk, category, skill_type, new_skills)
        return Response({'status': 'Skills updated successfully'})

    @action(detail=True, methods=['get'], url_path='(?P<category>[^/.]+)/(?P<skill_type>[^/.]+)/get-skills')
    def get_skills(self, request, pk=None, category=None, skill_type=None):
        """
        Retrieves a specific type of skills for a user.

        Parameters:
            request (Request): The HTTP request object.
            pk (int): The primary key of the user whose skills are to be retrieved.
            category (str): The category of skills to retrieve ('acquired' or 'search').
            skill_type (str): The type of skills to retrieve (e.g., 'Exp', 'DB', 'Lang', 'Pers').

        Returns:
            Response: HTTP response containing the requested skills.
        """
        skills = get_object_or_404(Skills, user_id=pk)
        skill_data = skills.get_user_skills(pk, category, skill_type)
        return Response({skill_type: skill_data})

    @action(detail=True, methods=['get'], url_path='get-all-skills')
    def get_all_user_skills(self, request, pk=None):
        """
        Retrieves all skills data excluding the specified user.

        Parameters:
            request (Request): The HTTP request object.
            pk (int): The primary key of the user to exclude from the results.

        Returns:
            Response: HTTP response containing skills data for all users except the specified one.
        """
        all_skills, specific_skills = Skills.get_skills_with_user_specification(int(pk))
        return Response({
            'all_users_skills': all_skills,
            'specific_user_skills': specific_skills
        })