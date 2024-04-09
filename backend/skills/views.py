from django.http import JsonResponse
from .models import UserProfile #,Skills, UserSkills, 
from .serializers import UserProfileSerializer #SkillUpdateSerializer,UserSkillRequestSerializer, UserProfileSerializer #,SkillsSerializer, UserSkillsSerializer, UserSerializer,
from rest_framework.decorators import api_view, APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from django.contrib.auth.models import User
    
# new views (generics can use all requests)
# create, retrieve, update, delete, etc
# class SkillViewSet(viewsets.ModelViewSet):
#     queryset = Skills.objects.all()
#     serializer_class = SkillsSerializer

# class UserSkillViewSet(viewsets.ModelViewSet):
#     queryset = UserSkills.objects.all()
#     serializer_class = UserSkillsSerializer

# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer


# class UserProfileViewSet(viewsets.ModelViewSet):
#     queryset = UserProfile.objects.all()
#     serializer_class = UserProfileSerializer    
    
# class UpdateUserSkillsView(APIView):
#     def post(self, request, format=None):
#         serializer = SkillUpdateSerializer(data=request.data)
#         if serializer.is_valid():
#             user_id = serializer.validated_data['user_id']
#             new_array = serializer.validated_data['new_array']
#             array_type = serializer.validated_data['array_type']
#             UserProfile.update_user_skills(user_id, new_array, array_type)
#             return Response({'status': 'success'}, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class GetUserSkillsView(APIView):
#     def get(self, request, user_id, array_type, format=None):
#         serializer = UserSkillRequestSerializer(data={'user_id': user_id, 'array_type': array_type})
#         if serializer.is_valid():
#             user_id = serializer.validated_data['user_id']
#             array_type = serializer.validated_data['array_type']
#             skills = UserProfile.get_user_skills(user_id, array_type)
#             return Response({'skills': skills}, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class GetSkillsWithUserSpecificationView(APIView):
#     def get(self, request, specific_user_id, format=None):
#         try:
#             specific_user_id = int(specific_user_id)  # Basic integer validation
#             all_users_skills, specific_user_skills = UserProfile.get_skills_with_user_specification(specific_user_id)
#             return Response({
#                 'all_users_skills': all_users_skills, 
#                 'specific_user_skills': specific_user_skills
#             }, status=status.HTTP_200_OK)
#         except ValueError:
#             return Response({'error': 'Invalid user ID'}, status=status.HTTP_400_BAD_REQUEST)
        
class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class UpdateUserSkillsView(APIView):
    def post(self, request, format=None):
        user_id = request.data.get('user_id')
        new_array = request.data.get('new_array')
        array_type = request.data.get('array_type')
        
        if user_id is None or new_array is None or array_type is None:
            return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)
        
        UserProfile.update_user_skills(user_id, new_array, array_type)
        return Response({'status': 'success'}, status=status.HTTP_200_OK)

class GetUserSkillsView(APIView):
    def get(self, request, user_id, array_type, format=None):
        try:
            skills = UserProfile.get_user_skills(user_id, array_type)
            return Response({'skills': skills}, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

class GetSkillsWithUserSpecificationView(APIView):
    def get(self, request, specific_user_id, format=None):
        try:
            specific_user_id = int(specific_user_id)  # Basic integer validation
            all_users_skills, specific_user_skills = UserProfile.get_skills_with_user_specification(specific_user_id)
            return Response({
                'all_users_skills': all_users_skills, 
                'specific_user_skills': specific_user_skills
            }, status=status.HTTP_200_OK)
        except ValueError:
            return Response({'error': 'Invalid user ID'}, status=status.HTTP_400_BAD_REQUEST)