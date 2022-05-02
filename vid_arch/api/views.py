from django.shortcuts import render
from django.http import HttpResponse
from .models import Video
from django.views.decorators.csrf import ensure_csrf_cookie

# Create your views here.
def main(request):
    return render(request,"main.html")
    
    #return HttpResponse("<h1>Hello</h1>")
def upload(request):
    text=request.POST.get('text',False)
    just=request.POST.get('just',False)
    #ins=Video(text=request.POST.get('text',False),video=request.FILES['video'])
    #print(vid.name,vid.size)
    print(text,just)
    return render(request,"upload.html")

def search(request):
    video=Video.objects.all()
    #print(video)
    return render(request,"search.html",{"video":video})

