from django.urls import path

from files.views import FileListCreateView, FileDetailAPIView

urlpatterns = [
    path("", FileListCreateView.as_view(), name="file-list-create"),
    path("<uuid:id>/", FileDetailAPIView.as_view(), name="get-file"),
]
