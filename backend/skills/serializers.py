from rest_framework import serializers
from .models import Skills, Master_Skills

class MasterSkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Master_Skills
        fields = ['Exp', 'DB', 'Lang', 'Pers']


class SkillsSerializer(serializers.ModelSerializer):
    """
    Serializer for the Skills model.

    This serializer handles serialization and validation of the Skills model, which includes the user, 
    acquired skills, and search skills of the user. The user field is set to be read-only to prevent 
    modification through the API.

    Attributes:
        Meta: Metadata options defined for the SkillsSerializer.
    """
    
    class Meta:
        model = Skills
        fields = ['user', 'acquired', 'search']
        read_only_fields = ['user']  # Prevents the API consumer from changing the user directly

    def validate_acquired(self, value):
        """
        Validate that all keys in the 'acquired' dictionary are valid based on predefined skill types.

        Parameters:
            value (dict): The dictionary of acquired skills provided by the API consumer.

        Returns:
            dict: The validated dictionary of acquired skills.

        Raises:
            serializers.ValidationError: If any keys in the 'acquired' dictionary are invalid.
        """
        valid_keys = {'Exp', 'DB', 'Lang', 'Pers'}
        if not all(key in valid_keys for key in value.keys()):
            raise serializers.ValidationError("Each key in 'acquired' must be one of 'Exp', 'DB', 'Lang', 'Pers'.")
        return value

    def validate_search(self, value):
        """
        Validate that all keys in the 'search' dictionary are valid based on predefined skill types.

        Parameters:
            value (dict): The dictionary of search skills provided by the API consumer.

        Returns:
            dict: The validated dictionary of search skills.

        Raises:
            serializers.ValidationError: If any keys in the 'search' dictionary are invalid.
        """
        valid_keys = {'Exp', 'DB', 'Lang', 'Pers'}
        if not all(key in valid_keys for key in value.keys()):
            raise serializers.ValidationError("Each key in 'search' must be one of 'Exp', 'DB', 'Lang', 'Pers'.")
        return value