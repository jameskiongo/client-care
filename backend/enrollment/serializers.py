from rest_framework import serializers

from client.models import Client
from client.serializers import ClientSerializer
from programs.models import Program
from programs.serializers import ProgramSerializer

from .models import Enrollment


class EnrollmentSerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only=True)
    program = ProgramSerializer(read_only=True)
    client_id = serializers.PrimaryKeyRelatedField(
        queryset=Client.objects.all(), source="client", write_only=True
    )
    program_id = serializers.PrimaryKeyRelatedField(
        queryset=Program.objects.all(), source="program", write_only=True
    )

    class Meta:
        model = Enrollment
        fields = [
            "id",
            "client",
            "client_id",
            "program",
            "program_id",
            "enrollment_date",
            "completion_date",
        ]
        read_only_fields = ["enrollment_date", "client", "program"]

    def validate(self, data):
        client = data.get("client", self.instance.client if self.instance else None)
        program = data.get("program", self.instance.program if self.instance else None)
        if Enrollment.objects.filter(client=client, program=program).exists():
            raise serializers.ValidationError(
                "This client is already enrolled in this program."
            )
        return data

    def validate_completion_date(self, value):
        if value and value < self.instance.enrollment_date:
            raise serializers.ValidationError(
                "Completion date cannot be before enrollment date."
            )

        return value
