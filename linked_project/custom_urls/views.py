from django.views.generic import ListView

from .models import URLS

class ToDoListView(ListView):
    model = URLS
    template_name = 'home.html'