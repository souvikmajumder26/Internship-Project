from django import forms
from .models import Video

class UploadFileForm(forms.Form):
    file = forms.FileField()
    class Meta:
        pass
