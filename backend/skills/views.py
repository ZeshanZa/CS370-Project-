from .models import Skills , Master_Skills
from .serializers import SkillsSerializer, MasterSkillsSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets , response
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.status import HTTP_400_BAD_REQUEST


class MasterSkillsViewSet(viewsets.ViewSet):
    
    def list(self, request):
        # Assuming there's only one instance of Master_Skills
        instance = Master_Skills.objects.first()
        if not instance:
            return response.Response({'error': 'Master skills data not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = MasterSkillsSerializer(instance)
        return response.Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='(?P<category>[^/.]+)')
    def category(self, request, category=None):
        instance = Master_Skills.objects.first()
        if not instance:
            return response.Response({'error': 'Master skills data not found'}, status=status.HTTP_404_NOT_FOUND)

        # Dynamically access the category's skills from the instance
        skills_list = getattr(instance, category, None)  # Removed .lower() to match field names exactly
        if skills_list is None:
            return response.Response({'error': 'Invalid category'}, status=status.HTTP_400_BAD_REQUEST)

        return response.Response(skills_list)


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
        skills = get_object_or_404(Skills, user_id=pk)
        new_skills = request.data.get('new_skills')

        # Check explicitly if new_skills is provided and allow empty list
        if new_skills is None:
            return Response({'error': 'new_skills is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            skills.update_user_skills(pk, category, skill_type, new_skills)
            return Response({'status': 'Skills updated successfully'})
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
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
         
    