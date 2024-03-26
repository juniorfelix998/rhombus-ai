import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import {logout} from "./authSlice.js";

const baseQuery = fetchBaseQuery({ baseUrl: '' });


async function baseQueryWithAuth(args, api, extra) {
    const result = await baseQuery(args, api, extra);
    // Dispatch the logout action on 401.
    if (result.error && result.error.status === 401) {
        api.dispatch(logout());
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithAuth,
    tagTypes: ['File','User'],
    endpoints: (builder) => ({}),
});