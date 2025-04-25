import datetime

from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from enrollment.models import Enrollment

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


class ClientDetailSerializer(serializers.ModelSerializer):
    enrolled_programs = serializers.SerializerMethodField()

    class Meta:
        model = Client
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "date_of_birth",
            "enrolled_programs",
        ]
        read_only_fields = ["enrolled_programs"]

    def get_enrolled_programs(self, obj):
        enrollments = Enrollment.objects.filter(client=obj).select_related(
            "program"
        )  # Optimize DB queries

        return [
            {
                "program_id": enrollment.program.id,
                "program_name": enrollment.program.name,
                "program_description": enrollment.program.description,
                "enrollment_date": enrollment.enrollment_date,
                "completion_date": enrollment.completion_date,
            }
            for enrollment in enrollments
        ]
