from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

from commons.models import TimeStampedModel


User = get_user_model()


class FileModel(TimeStampedModel):
    name = models.CharField(max_length=100, null=True, blank=True)
    file = models.FileField(
        upload_to="file_import/",
        null=False,
        blank=False,
        max_length=1000,
    )
    file_column_data_types = models.JSONField(
        default=list,
        null=True,
        blank=True,
    )
    is_upload_success = models.BooleanField(default=False)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="files",
        verbose_name=_("User"),
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("File")
        verbose_name_plural = _("Files")
        get_latest_by = [
            "-name",
        ]
        ordering = [
            "-created_at",
        ]
