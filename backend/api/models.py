# Create your models here.
from django.db import models

class Recommendation(models.Model):
    name = models.CharField(max_length=100)
    designation = models.CharField(max_length=100, help_text="e.g., Senior Developer")
    email = models.EmailField()
    company = models.CharField(max_length=100, help_text="Enter Company Name")
    description = models.TextField(help_text="Recommendation Description")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.designation} - {self.company} - {self.email} - {self.description} - {self.created_at}"