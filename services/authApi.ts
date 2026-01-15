import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginData>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    logout: builder.mutation<BaseResponse, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterData>({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  authApi;

export default authApi;
