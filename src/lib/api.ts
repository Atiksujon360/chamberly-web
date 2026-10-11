import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ChamberResponse, ApiError } from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Chambers'],
  endpoints: (builder) => ({
    listChambers: builder.query<ChamberResponse[], string>({
      query: (organizationId) => `/api/v1/organizations/${organizationId}/chambers`,
      providesTags: ['Chambers'],
      transformErrorResponse: (response: { status: number; data: ApiError }) => {
        return response.data
      },
    }),
  }),
})

export const { useListChambersQuery } = apiSlice
