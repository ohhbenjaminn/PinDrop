from django.forms import ModelForm
from django import forms
from .models import Event

from .widgets import DateTimePickerInput, DatePickerInput, TimePickerInput

class DateInput(forms.DateInput):
    input_type = 'date'

class EventForm(ModelForm):
    class Meta:
        model = Event
        fields = ['user', 'lat', 'lng']
        # , 'event_time_field', 'event_date_field'
        event_time = forms.DateTimeField(widget=DateTimePickerInput)
        event_date = forms.DateTimeField(widget=DateTimePickerInput)

        # widgets = {
        #     'event_time_field' : TimePickerInput(),
        #     'event_date_field'  : DatePickerInput(),
        # }
