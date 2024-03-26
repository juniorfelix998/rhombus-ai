import logging

from rest_framework import permissions, generics

from files.models import FileModel
from files.pagination import FilePagination
from files.renderers import FilesJSONRenderer
from files.serializers import FileSerializer

logger = logging.getLogger(__name__)


class FileListCreateView(generics.ListCreateAPIView):
    queryset = FileModel.objects.select_related("user")
    serializer_class = FileSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = FilePagination

    renderer_classes = [FilesJSONRenderer]

    def get_queryset(self, *args, **kwargs):
        return self.queryset.filter(user=self.request.user).filter(is_upload_success=True)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        logger.info(
            f"file {serializer.data.get('name')} uploaded by {self.request.user.first_name}"
        )


class FileDetailAPIView(generics.RetrieveAPIView):
    queryset = FileModel.objects.select_related("user").all()
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "id"
    serializer_class = FileSerializer
    renderer_classes = [FilesJSONRenderer]


