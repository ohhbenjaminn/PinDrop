from django.shortcuts import render
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from .models import Event
# Create your views here.
from django.http import HttpResponse

# Define the home view
def home(request):
    return HttpResponse('<h1>Hello /ᐠ｡‸｡ᐟ\ﾉ</h1>')

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
    fields = ['name', 'location', 'event_time', 'time_created', 'details']
#   '__all__'
    success_url = '/events/'

class EventUpdate(UpdateView):
  model = Event
  # Let's disallow the renaming of a cat by excluding the name field!
  fields = ['name', 'location', 'event_time', 'time_created', 'details']
  #   '__all__'

class EventDelete(DeleteView):
  model = Event
  success_url = '/events/'
