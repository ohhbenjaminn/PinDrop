from django.forms import ModelForm
from django import forms
from .models import Event


class DateInput(forms.DateInput):
    input_type = 'date'

class EventForm(ModelForm):
    class Meta:
        model = Event
        fields = ['user', 'lat', 'lng']
       
