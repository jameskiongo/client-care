import datetime

from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import Client


class ClientSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        validators=[
            UniqueValidator(
                queryset=Client.objects.all(),
                message="Email already exists.",
            )
        ]
    )

    class Meta:
        model = Client
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "date_of_birth",
            "gender",
        ]

    def validate_gender(self, value):
        genders = [choice[0] for choice in Client.GENDER_CHOICES]
        if value not in genders:
            raise serializers.ValidationError("Invalid")
        return value

    def validate_date_of_birth(self, value):
        if value:
            if value > datetime.date.today():
                raise serializers.ValidationError("Enter a valid date.")
            if value.year < 1900:
                raise serializers.ValidationError("Enter a valid year.")
        return value
