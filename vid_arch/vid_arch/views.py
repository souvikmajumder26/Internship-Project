from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def main(request):
    return render(request,"main.html")
    
    #return HttpResponse("<h1>Hello</h1>")

'''
def raked(request):
    text=request.GET.get('text')
    print(text)
    return HttpResponse("Raked")
'''