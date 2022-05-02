from django import forms
from .models import Video

class UploadFileForm(forms.Form):
    file = forms.FileField()
    text=forms.CharField()
    '''class Meta:
        pass'''
