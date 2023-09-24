import {
    createApi,
    fetchBaseQuery,
    BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import {
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query";
import { BOOKROUTES } from "../utils/constants/apiRoutes";
import { IBook } from "../models";




const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_WEB_BASE_URL,
    prepareHeaders: (headers) => {
        headers.set("Access-Control-Allow-Origin", `*`);
        headers.set("Accept", `application/json`);
        return headers;
    },
});

export const baseQueryApp: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {},
    FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    return result;
};

export const generalApi = createApi({
    baseQuery: baseQueryApp,
    reducerPath: "generalApi",
    tagTypes: [
        'allBooks'
    ],
    endpoints: (builder) => ({
        getAllBooks: builder.query<
            any,
            { title?: string; orderBy?: string }
        >({
            query: ({ title = '', orderBy = "asc" }) => ({
                url: `${BOOKROUTES.GET_BOOKS}?title=${title}&orderBy=${orderBy}`,
            }),
            providesTags: ["allBooks"],
        }),

        getSingleBooks: builder.query<
            any,
            { id: string; }
        >({
            query: ({ id }) => ({
                url: `${BOOKROUTES.GET_BOOKS}/${id}`,
            }),
            providesTags: ["allBooks"],
        }),

        postNewBook: builder.mutation<
            {},
            IBook
        >({
            query: (body) => ({
                url: `${BOOKROUTES.GET_BOOKS}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["allBooks"],
        }),

        updateBook: builder.mutation<
            {},
            { id: string, payload: IBook }
        >({
            query: ({ id, payload }) => ({
                url: `${BOOKROUTES.GET_BOOKS}/${id}`,
                method: "PUT",
                body: payload,
            }),
            invalidatesTags: ["allBooks"],
        }),

        deleteBook: builder.mutation<
            {},
            { id: string }
        >({
            query: ({ id }) => ({
                url: `${BOOKROUTES.GET_BOOKS}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["allBooks"],
        }),

    }),
})

export const {
    useGetAllBooksQuery,
    useGetSingleBooksQuery,
    usePostNewBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation
} = generalApi