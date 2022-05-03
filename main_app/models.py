from django.db import models
# from django.contrib.auth.models import User
# Create your models here
class User(models.Model):
    name = models.CharField(max_length=100)

class Event(models.Model):
    name = models.CharField(max_length=101)
    location = models.CharField(max_length=300)
    event_time = models.DateTimeField()
    time_created = models.DateTimeField()
    details = models.CharField(max_length=1000)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
