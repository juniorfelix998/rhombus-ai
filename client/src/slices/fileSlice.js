import { apiSlice } from './apiSlice';

const FILES_URL = '/api/v1/files/';

export const filesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFiles: builder.query({
            query: () => ({
                url: FILES_URL,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Files'],
        }),
        getFileDetails: builder.query({
            query: (fileId) => ({
                url: `${FILES_URL}/${fileId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createFile: builder.mutation({
            query: (data) => ({
                url: `${FILES_URL}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['File'],
        }),
    }),
});

export const {
    useGetFilesQuery,
    useGetFileDetailsQuery,
    useCreateFileMutation,
} = filesApiSlice;