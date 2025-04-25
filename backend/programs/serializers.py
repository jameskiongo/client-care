from django.utils import timezone
from rest_framework import serializers

from .models import Program


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at", "is_active")

    def validate(self, data):
        # Get current date
        today = timezone.now().date()

        # Check if we're doing an update (instance exists)
        instance = getattr(self, "instance", None)

        # For updates, use existing values if not provided in request
        start_date = data.get("start_date", instance.start_date if instance else None)
        end_date = data.get("end_date", instance.end_date if instance else None)

        # Validate start date
        if start_date and start_date < today:
            raise serializers.ValidationError(
                {"start_date": "Start date cannot be in the past"}
            )

        # Validate end date
        if end_date:
            if end_date < today:
                raise serializers.ValidationError(
                    {"end_date": "End date cannot be in the past"}
                )
            if start_date and end_date <= start_date:
                raise serializers.ValidationError(
                    {"end_date": "End date must be after start date"}
                )

        return data
