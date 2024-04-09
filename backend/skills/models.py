from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField


# new models
# class Skills(models.Model):
#     name = models.CharField(max_length=100, unique=True)
#     users = models.ManyToManyField(User, through='UserSkills',  related_name='skills_set')
#     def __str__(self):
#         return self.name
    
# class UserSkills(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     skill = models.ForeignKey(Skills, on_delete=models.CASCADE)
#     acquiring = models.BooleanField(default=False)
#     searching = models.BooleanField(default=False)
    
#     class Meta:
#         unique_together = ('user','skill')
        
#     def __str__(self):
#         return f"{self.user.username}'s skill: {self.skill}"
    
    
class UserProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE, related_name='skills_userprofile')
    have = ArrayField(models.CharField(max_length=100), default=list)
    searching = ArrayField(models.CharField(max_length=100), default=list)
    
    def __str__(self):
        return self.user.username
    
    def update_user_skills(user_id, new_array, array_type):
        user_profile, created = UserProfile.objects.get_or_create(user_id=user_id)
        if array_type == 'have':
           user_profile.have = new_array
        elif array_type == 'searching':
            user_profile.searching = new_array
        else: 
            raise ValueError("Invalid array type. Choose 'have' or 'searching'.")
        user_profile.save()
        
    def get_user_skills(user_id, array_type):
        user_profile = UserProfile.objects.get(user_id=user_id)
        if array_type == 'have':
            return user_profile.have
        elif array_type == 'searching':
            return user_profile.searching
        else: 
            return ValueError("Invalid array type. Choose 'have' or 'searching'.")
    
    # dictionary variant
    @staticmethod
    def get_skills_with_user_specification(specific_user_id):
        all_users_skills = {}

        # Process for all users except the specified one
        for profile in UserProfile.objects.exclude(user_id=specific_user_id):
            all_users_skills[profile.user_id] = {
                'have': profile.have,
                'searching': profile.searching
            }

        # Process for the specified user
        specific_user_profile = UserProfile.objects.get(user_id=specific_user_id)
        specific_user_skills = {
            'user_id': specific_user_id,
            'have': specific_user_profile.have,
            'searching': specific_user_profile.searching
        }

        return all_users_skills, specific_user_skills
    
    #list variant
    # @staticmethod
    # def get_skills_with_user_specification(specific_user_id):
    #     all_users_skills = []

    #     # Process for all users except the specified one
    #     for profile in UserProfile.objects.exclude(user_id=specific_user_id):
    #         user_skills = {
    #             'user_id': profile.user_id,
    #             'have': profile.have,
    #             'searching': profile.searching
    #         }
    #         all_users_skills.append(user_skills)

    #     # Process for the specified user
    #     specific_user_profile = UserProfile.objects.get(user_id=specific_user_id)
    #     specific_user_skills = {
    #         'user_id': specific_user_id,
    #         'have': specific_user_profile.have,
    #         'searching': specific_user_profile.searching
    #     }

    #     return all_users_skills, specific_user_skills
    
    # add usernames later