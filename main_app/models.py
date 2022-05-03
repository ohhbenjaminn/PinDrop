from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from datetime import date
# Create your models here
# class User(models.Model):
#     name = models.CharField(max_length=100)

class Event(models.Model):
    name = models.CharField(max_length=101)
    location = models.CharField(max_length=300)
    event_time = models.DateTimeField()
    time_created = models.DateTimeField()
    details = models.CharField(max_length=1000)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"The event named {self.name} has id of {self.id}"
    
  # Add this method
    def get_absolute_url(self):
        return reverse('detail', kwargs={'event_id': self.id})
    
