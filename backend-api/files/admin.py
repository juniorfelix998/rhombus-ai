from django.contrib import admin
from django.db import models
from django.utils.html import format_html
from django_json_widget.widgets import JSONEditorWidget


from files.models import FileModel


class FileAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "is_upload_success",
        "user",
        "created_at",
        "updated_at",
    )
    search_fields = ("id", "name", "user__first_name", "user__last_name")
    list_filter = ("created_at", "updated_at", "is_upload_success")
    readonly_fields = ("file",)
    list_per_page = 30
    autocomplete_fields = ("user",)
    save_on_top = True
    formfield_overrides = {models.JSONField: {"widget": JSONEditorWidget}}

    @admin.display
    def file(self, obj):
        file_list = " ".join(
            [
                f'<dt><a href="{_.file.url}" target="_blank">{_.file_type.name}</a></dt>'
                for _ in obj.files.all()
            ]
        )
        html = f"<dl>{file_list}</dl>"
        return format_html(html)


admin.site.register(FileModel, FileAdmin)
