from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'user', 'title', 'content', 'created_at', 'updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at']

    def validate_user(self, value):
        request = self.context.get('request')
        if value != request.user:
            raise serializers.ValidationError("You can only create notes for yourself.")
        return value
