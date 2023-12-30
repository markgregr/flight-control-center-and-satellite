import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../middleware";

export const authApi = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "same-origin",
    mode: "no-cors",
  }),
  tagTypes: ["Authorization"],
  endpoints: (build) => ({
    signUp: build.mutation<unknown, null>({
      query: (body) => ({
        url: "/user/register",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Authorization" }],
    }),
    logIn: build.mutation({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Authorization" }],
    }),
    confirmRegister: build.mutation({
      query: (body) => ({
        url: "/user/confirm-registration",
        method: "POST",
        body,
      }),
    }),
    resendCode: build.mutation({
      query: (body) => ({
        url: "/user/resend-code",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLogInMutation,
  useResendCodeMutation,
  useConfirmRegisterMutation,
} = authApi;
