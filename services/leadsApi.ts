import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const leadsApi = createApi({
  reducerPath: "leadsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/leads`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getLeads: builder.query<
      LeadsResponse,
      Partial<{
        search: string;
        source: string;
        status: string;
        stage: string;
        sortby: string;
        order: string;
        page: number;
        limit: number;
      }>
    >({
      query: (params) => {
        const queryString = new URLSearchParams();

        if (params?.search) queryString.append("search", params.search);
        if (params?.source) queryString.append("source", params.source);
        if (params?.status) queryString.append("status", params.status);
        if (params?.stage) queryString.append("stage", params.stage);
        if (params?.sortby) queryString.append("sortBy", params.sortby);
        if (params?.order) queryString.append("order", params.order);
        if (params?.page) queryString.append("page", String(params.page));
        if (params?.limit) queryString.append("limit", String(params.limit));

        return {
          url: `/?${queryString.toString()}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
});

export const { useGetLeadsQuery } = leadsApi;

export default leadsApi;
