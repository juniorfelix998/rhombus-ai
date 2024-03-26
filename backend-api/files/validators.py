import os
from django.conf import settings
from rest_framework.serializers import ValidationError


def validate_file_extension(value):
    """
    Validate that the file has a valid extension.

    Args:
        value (file): The file object to be validated.

    Raises:
        serializers.ValidationError: If the file extension is not supported.

    This function checks if the provided file has a valid extension based on the allowed document import extensions
    specified in the list. If the extension is not in the list of allowed extensions, a ValidationError
    is raised indicating the supported extensions.

    Example:
        validate_file_extension(file)
        None
    """
    allowed_extension_types = [".xls", ".xlsx", ".csv"]
    get_extension = os.path.splitext(value.name)[1].lower()

    if get_extension not in allowed_extension_types:
        raise ValidationError(
            f"Unsupported file extension. Supported extensions are: {', '.join(allowed_extension_types)}"
        )
