from django.db import models

# Create your models here.
class Video(models.Model):
    text=models.CharField(max_length=100)
    just=models.CharField(max_length=50)
    #video=models.FileField(upload_to="media/%y")
    def __str__(self):
        return self.text
