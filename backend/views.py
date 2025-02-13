from django.http import FileResponse
import os
from django.conf import settings

def home(request):
    index_path = os.path.join(settings.BASE_DIR, "frontend", "build", "index.html")
    return FileResponse(open(index_path, "rb"))