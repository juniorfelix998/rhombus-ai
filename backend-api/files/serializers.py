from collections import Counter

from rest_framework import serializers

from files.helpers import process_file_to_data_frame
from files.models import FileModel
from files.validators import validate_file_extension


DEFAULT_CHUNK_SIZE = 1000


class FileSerializer(serializers.ModelSerializer):
    file = serializers.FileField(
        max_length=1000, allow_empty_file=False, validators=[validate_file_extension]
    )

    class Meta:
        model = FileModel
        fields = (
            "id",
            "name",
            "file",
            "file_column_data_types",
            "is_upload_success",
            "created_at",
        )

    def validate_file(self, file):
        if file.content_type not in [
            "text/csv",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel",
        ]:
            raise serializers.ValidationError("The file type uploaded is not supported")
        return file

    def process_data_in_chunks(self, validated_data):
        """
        Process the chunk data and infer column data types.

        Args:
            validated_data (dict): Validated data containing the file information.

        Returns:
            dict: Processed and updated validated data.

        This method takes validated data containing file information, processes the data in chunks,
        infers file column data types, and updates the validated data with the most common column data types.
        """

        # Extract file data and chunk size from validated data
        file_data = validated_data.get("file")
        chunk_size = DEFAULT_CHUNK_SIZE

        if file_data:
            try:
                # Process file in chunks
                data_frame_chunks = process_file_to_data_frame(
                    file_data, chunk_size=chunk_size
                )

                # Initialize variables for chunk data types and most frequent data values
                chunk_data_types = {}
                frequent_values = {}

                # Iterate over each chunk
                for count, data_frame_chunk in enumerate(data_frame_chunks, start=1):
                    # Infer data types for each column in the chunk
                    chunk_data_types[count] = {
                        key: str(value)
                        for key, value in data_frame_chunk.dtypes.items()
                    }

                    # Update most common data values for each column
                    for key, value in chunk_data_types[count].items():
                        frequent_values.setdefault(key, []).append(value)

                # Compute the most common data value for each column
                frequent_values = {
                    key: Counter(values).most_common(1)[0][0]
                    for key, values in frequent_values.items()
                }

                # Update validated data with processed information
                validated_data.update(
                    {
                        "is_upload_success": True,
                        "file_column_data_types": frequent_values,
                    }
                )

            except Exception as e:
                # Handle errors during processing
                validated_data.update(
                    {
                        "is_upload_success": False,
                        "file_column_data_types": [{"error": str(e)}],
                    }
                )

        return validated_data

    def create(self, validated_data):
        processed_validated_data = self.process_data_in_chunks(validated_data)
        return super().create(processed_validated_data)

    def validate(self, attrs):
        file = attrs.get("file")
        instance = self.instance
        if instance and instance.is_upload_success and file:
            raise serializers.ValidationError(
                {"error": "File process completed. Cannot update."}
            )
        return attrs
