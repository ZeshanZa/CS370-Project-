from rest_framework import generics, permissions
from .models import Project, UserProfile
from .serializers import ProjectSerializer, UserProfileSerializer

class ProjectCreateView(generics.CreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Associate the project with the logged-in user
        serializer.save(user=self.request.user)

class ProjectListView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    #Make sure you guys indent when doing def It took me like 20 minutes to figure out why I was getting an error 
    def get_queryset(self):
        # Filter projects by the current user
        return Project.objects.filter(user=self.request.user)

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user

class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    # No perform_create needed here



class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Ensure a UserProfile exists for the user or create one
        UserProfile.objects.get_or_create(user=self.request.user)
        return self.request.user.userprofile
