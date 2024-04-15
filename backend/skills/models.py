from django.db import models
from django.contrib.auth.models import User

def default_skills():
    """
    Defines the default structure for the 'acquired' and 'search' fields in the Skills model.
    
    Returns:
        dict: A dictionary with keys for 'Exp', 'DB', 'Lang', 'Pers', each mapped to an empty list.
    """
    return {'Exp': [], 'DB': [], 'Lang': [], 'Pers': []}

class Skills(models.Model):
    """
    Represents a set of skills associated with a user.

    Attributes:
        user (User): The user to whom these skills belong, in a one-to-one relationship.
        acquired (JSONField): A dictionary storing skills the user has acquired.
        search (JSONField): A dictionary storing skills the user is interested in acquiring.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='skills')
    acquired = models.JSONField(default=default_skills)
    search = models.JSONField(default=default_skills)

    def __str__(self):
        """
        String representation of the Skills instance, showing the associated user's username.

        Returns:
            str: The username of the user associated with these skills.
        """
        return self.user.username

    @staticmethod
    def update_user_skills(user_id, category, skill_type, new_skills):
        """
        Updates a specific set of skills for a user based on the category and skill type.

        Parameters:
            user_id (int): The ID of the user whose skills need to be updated.
            category (str): Either 'acquired' or 'search', specifying which dictionary to update.
            skill_type (str): One of 'Exp', 'DB', 'Lang', 'Pers', specifying which array to update.
            new_skills (list): A list of new skills to replace the existing skills in the specified category and type.

        Raises:
            ValueError: If the category or skill type is invalid.
            Skills.DoesNotExist: If no Skills instance is found for the user.
        """
        VALID_CATEGORIES = ['acquired', 'search']
        VALID_SKILL_TYPES = ['Exp', 'DB', 'Lang', 'Pers']

        if category not in VALID_CATEGORIES:
            raise ValueError(f"Invalid category '{category}'. Must be one of {VALID_CATEGORIES}.")
        if skill_type not in VALID_SKILL_TYPES:
            raise ValueError(f"Invalid skill type '{skill_type}'. Must be one of {VALID_SKILL_TYPES}.")

        skills = Skills.objects.get(user_id=user_id)
        skills_data = getattr(skills, category)
        skills_data[skill_type] = new_skills
        setattr(skills, category, skills_data)
        skills.save()

    @staticmethod
    def get_user_skills(user_id, category, skill_type):
        """
        Retrieves a specific set of skills for a user based on the category and skill type.

        Parameters:
            user_id (int): The ID of the user whose skills are to be retrieved.
            category (str): Either 'acquired' or 'search', specifying which dictionary to access.
            skill_type (str): One of 'Exp', 'DB', 'Lang', 'Pers', specifying which array to retrieve.

        Returns:
            list: The skills list from the specified category and type.

        Raises:
            ValueError: If the category or skill type is invalid.
            Skills.DoesNotExist: If no Skills instance is found for the user.
        """
        VALID_CATEGORIES = ['acquired', 'search']
        VALID_SKILL_TYPES = ['Exp', 'DB', 'Lang', 'Pers']

        if category not in VALID_CATEGORIES:
            raise ValueError(f"Invalid category '{category}'. Must be one of {VALID_CATEGORIES}.")
        if skill_type not in VALID_SKILL_TYPES:
            raise ValueError(f"Invalid skill type '{skill_type}'. Must be one of {VALID_SKILL_TYPES}.")

        skills = Skills.objects.get(user_id=user_id)
        skills_data = getattr(skills, category)
        return skills_data.get(skill_type, [])

    @staticmethod
    def get_skills_with_user_specification(specific_user_id):
        """
        Retrieves skills data for all users except one specified user.

        Parameters:
            specific_user_id (int): The user ID of the user to exclude from the retrieval.

        Returns:
            tuple: Contains two elements; a dictionary of all users' skills and a dictionary of the specified user's skills.

        Raises:
            Skills.DoesNotExist: If no Skills instance is found for the specific user.
        """
        all_users_skills = {profile.user_id: {'acquired': profile.acquired, 'search': profile.search}
                            for profile in Skills.objects.exclude(user_id=specific_user_id)}
        try:
            specific_user_profile = Skills.objects.get(user_id=specific_user_id)
            specific_user_skills = {'user_id': specific_user_id, 'acquired': specific_user_profile.acquired,
                                    'search': specific_user_profile.search}
        except Skills.DoesNotExist:
            specific_user_skills = {'user_id': specific_user_id, 'acquired': {}, 'search': {}}

        return all_users_skills, specific_user_skills