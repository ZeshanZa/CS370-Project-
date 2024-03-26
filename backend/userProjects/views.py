# Create your views here.
from rest_framework import generics, permissions
from .models import Project, UserProfile
from .serializers import ProjectSerializer, UserProfileSerializer

class ProjectCreateView(generics.CreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Ensure a UserProfile exists for the user or create one
        UserProfile.objects.get_or_create(user=self.request.user)
        return self.request.user.userprofile

