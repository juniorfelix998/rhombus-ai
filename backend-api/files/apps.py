from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class FilesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "files"
    verbose_name = _("File")
