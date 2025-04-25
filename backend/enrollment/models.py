# Create your models here.
from django.db import models

from client.models import Client
from programs.models import Program


class Enrollment(models.Model):
    client = models.ForeignKey(
        Client, on_delete=models.CASCADE, related_name="enrollments"
    )
    program = models.ForeignKey(
        Program, on_delete=models.CASCADE, related_name="enrollments"
    )
    enrollment_date = models.DateField(auto_now_add=True)
    completion_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.client} enrolled in {self.program}"
