# from django.db import models

# # Create your models here.
from django.db import models

class UploadedImage(models.Model):
    image = models.ImageField(upload_to="uploads/")   # images will be saved in /media/uploads/
    question = models.TextField()                     # user’s question
    answer = models.TextField(blank=True, null=True)  # AI’s answer (can be empty at first)
    created_at = models.DateTimeField(auto_now_add=True)  # timestamp when uploaded

    def __str__(self):
        return f"Q: {self.question[:30]}..."  # shows first 30 chars of question
