from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

# Define the home view
def home(request):
  return HttpResponse('<h1>Hello /ᐠ｡‸｡ᐟ\ﾉ</h1>')

def about(request):
  return render(request, 'about.html')

def events_index(request):
  return render(request, 'events/index.html', { 'events': events })
