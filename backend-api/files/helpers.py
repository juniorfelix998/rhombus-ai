import pandas as pd


def infer_and_convert_data_types(df: pd.DataFrame) -> pd.DataFrame:
    """
    Infers and converts data types for each column in a Pandas DataFrame.

    Args:
        df (pd.DataFrame): The input DataFrame to process.

    Returns:
        pd.DataFrame: A DataFrame with inferred and converted data types.

    This function iterates over each column in the input DataFrame and attempts to infer and convert its data type.
    It follows a series of conversion steps, including numeric, timedelta, datetime, boolean, categorical, and complex numbers.
    If a column's data type cannot be inferred, it defaults to object type.

    Note:
        This function modifies the input DataFrame in place and returns the modified DataFrame.

    Example:
        import pandas as pd
        df = pd.DataFrame({'A': ['2021-01-01', '2021-01-02', '2021-01-03'],
                               'B': [1, 2, 3],
                               'C': ['foo', 'bar', 'baz']})
        infer_and_convert_data_types(df)
               A  B    C
        0  2021-01-01  1  foo
        1  2021-01-02  2  bar
        2  2021-01-03  3  baz

    """
    for col in df.columns:
        try:
            df_converted = pd.to_numeric(df[col], errors="coerce")
            if not df_converted.isna().all():
                df[col] = df_converted
                continue
        except ValueError:
            pass

        try:
            if pd.api.types.is_timedelta64_dtype(df[col]):
                df_converted_to_time_delta = pd.to_timedelta(df[col], errors="coerce")
                if (
                    not df_converted_to_time_delta.isna().all()
                ):  # If at least one value is timedelta
                    df[col] = df_converted_to_time_delta
                    continue
        except (ValueError, TypeError):
            pass

        try:
            df_to_date_time = pd.to_datetime(df[col])
            if not df_to_date_time.isna().all():
                df[col] = df_to_date_time
            continue
        except ValueError:
            pass

        if set(df[col].unique()) == {True, False}:
            df[col] = df[col].astype(bool)
            continue

        if len(df[col].unique()) / len(df[col]) < 0.5:
            df[col] = pd.Categorical(df[col])
            continue

        if all(isinstance(val, complex) for val in df[col]):
            df[col] = df[col].astype(complex)
            continue

        df[col] = df[col].astype(object)

    return df


def process_file_to_data_frame(file_path: str, chunk_size: int = 1000) -> pd.DataFrame:
    """
    Process a file and yield the DataFrame.

    Args:
        file_path (str): Path to the file to be processed.
        chunk_size (int, optional): Size of the chunks to be read. Defaults to 1000.

    Yields:
        pd.DataFrame: A DataFrame containing processed data.

    This function reads the specified file and yields either the entire DataFrame (for Excel files)
    or chunks of the DataFrame (for CSV files) with inferred and converted data types.

    If the file is in Excel format (.xlsx), the entire DataFrame is processed and yielded.
    If the file is a CSV file, it is processed in chunks of the specified size, and each chunk
    is yielded after inferring and converting data types.

    Example:
        for chunk in process_file('data.xlsx'):
        ...     print(chunk.head())
               A  B    C
        0  2021-01-01  1  foo
        1  2021-01-02  2  bar
        2  2021-01-03  3  baz
    """

    if (
        file_path.content_type
        == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ):
        excel_file = pd.ExcelFile(file_path)
        data_frame = pd.read_excel(excel_file)
    else:
        data_frame = pd.read_csv(file_path, chunksize=chunk_size)

    for chunk in data_frame:
        yield infer_and_convert_data_types(chunk)
