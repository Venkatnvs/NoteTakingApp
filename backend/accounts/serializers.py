from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=100, write_only=True)
    email = serializers.EmailField(max_length=100)
    first_name = serializers.CharField(max_length=100, min_length=2)
    last_name = serializers.CharField(max_length=100, min_length=1)

    class Meta:
        model = User
        fields = ['id','username','first_name','last_name','email','password']

    def validate(self, attrs):
        email = attrs.get('email','')
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({'email':('Email is already in use.')})
        username = attrs.get('username', '')
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({'username':('Username is already in use.')})
        password = attrs.get('password', '')
        try:
            validate_password(password, user=self.instance)
        except DjangoValidationError as e:
            raise serializers.ValidationError({'password':str(e)})
        return super().validate(attrs)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=200, min_length=1)
    password = serializers.CharField(max_length=100, min_length=0, write_only=True)

    class Meta:
        model = User
        fields = ['username','password']