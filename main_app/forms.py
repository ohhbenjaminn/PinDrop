from django.forms import ModelForm
from django import forms
from .models import Event
from .widgets import DateTimePickerInput

class DateInput(forms.DateInput):
    input_type = 'date'

class EventForm(ModelForm):
    class Meta:
        model = Event
        fields = ['user', 'lat', 'lng']
        event_time = forms.DateTimeField(widget=DateTimePickerInput)
        time_created = forms.DateTimeField(widget=DateTimePickerInput)
