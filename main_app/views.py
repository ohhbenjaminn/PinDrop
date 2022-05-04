from django.forms import DateTimeField, DateTimeInput
from django.shortcuts import render
from django.core import serializers
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from .models import Event
import json
# Create your views here.
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse

# Define the home view
def home(request):
    events = Event.objects.all()
    return render(request, 'events/index.html', { 'events': events })

def about(request):
    return render(request, 'about.html')

def events_index(request):
    events = Event.objects.all()
    return render(request, 'events/index.html', { 'events': events })

def events_detail(request, event_id):
    event = Event.objects.get(id=event_id)
    return render(request, 'events/detail.html', { 'event': event })

class EventCreate(CreateView):
    model = Event
    fields = ['name', 'location', 'event_time', 'event_date', 'details',]
#   '__all__'
    success_url = '/events/'

    class Meta:
        widgets = {
            'event_time' : DateTimeInput()
        }

    def form_valid(self, form):
        event = form.save(commit=False)

        event.user = self.request.user
        event.lat = self.request.GET.get('lat', '')
        event.lng = self.request.GET.get('lng', '')
        # event.lng = json_stuff.lng
        #article.save()  # This is redundant, see comments.
        return super(EventCreate, self).form_valid(form)
    

class EventUpdate(UpdateView):
  model = Event
  # Let's disallow the renaming of a cat by excluding the name field!
  fields = ['name', 'location', 'event_time', 'time_created', 'details',]

  #   '__all__'
  def form_valid(self, form):
        event = form.save(commit=False)
        event.user = self.request.user # on every request we have the user property which is the logged in user
        return super(EventCreate, self).form_valid(form)

class EventDelete(DeleteView):
  model = Event
  success_url = '/events/'

def event_to_JSON(event):
    dict = {}
    dict[""]

def get_JSON(request):
    events_JSON = Event.objects.all().values('id', 'user', 'name', 'location', 'event_time', 'time_created', 'details', 'lat', 'lng')
    return HttpResponse(events_JSON)

def create_JSON(request):
    pass