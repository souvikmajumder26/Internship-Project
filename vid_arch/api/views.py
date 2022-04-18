from django.shortcuts import render
from django.http import HttpResponse
from .models import Video
from django.views.decorators.csrf import ensure_csrf_cookie

# Create your views here.
def main(request):
    return render(request,"main.html")
    
    #return HttpResponse("<h1>Hello</h1>")
def upload(request):
    video=Video.objects.all()
    print(request.FILES)
    return render(request,"upload.html",{"video":video})