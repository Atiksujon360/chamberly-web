import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  ChamberResponse,
  ApiError,
  LoginRequest,
  LoginResponse,
  UserProfile,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
    credentials: "include", // Include cookies for session-based auth
  }),
  tagTypes: ["Chambers", "Auth"],
  endpoints: (builder) => ({
    listChambers: builder.query<ChamberResponse[], string>({
      query: (organizationId) =>
        `/api/v1/organizations/${organizationId}/chambers`,
      providesTags: ["Chambers"],
      transformErrorResponse: (response: {
        status: number;
        data: ApiError;
      }) => {
        return response.data;
      },
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
      transformErrorResponse: (response: {
        status: number;
        data: ApiError;
      }) => {
        return response.data;
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/api/v1/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    getCurrentUser: builder.query<UserProfile, void>({
      query: () => "/api/v1/auth/me",
      providesTags: ["Auth"],
      transformErrorResponse: (response: {
        status: number;
        data: ApiError;
      }) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useListChambersQuery,
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = apiSlice;
