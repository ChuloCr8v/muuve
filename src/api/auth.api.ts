import { api, tagTypes } from "./base";
import {
  AuthResult,
  AuthState,
  LoginInput,
  OnboardOrgInput,
  OrgVerInput,
  User,
  VerifyOrgInput,
} from "./types";

export const authApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    login: mutation<AuthResult, LoginInput>({
      query: (body) => ({ url: "auth/login", method: "POST", body }),
      invalidatesTags: tagTypes,
    }),

    logout: mutation<undefined, void>({
      queryFn: async () => ({ data: undefined }),
      invalidatesTags: tagTypes,
    }),

    getAuthUser: query<User, void>({
      query: () => "auth/user",
      providesTags: ["user"],
    }),

    orgVerMail: mutation<AuthState, OrgVerInput>({
      query: (body) => ({ url: "auth/org/verification", method: "POST", body }),
    }),

    verifyOrg: mutation<void, VerifyOrgInput>({
      query: (body) => ({ url: "auth/org/verify", method: "POST", body }),
    }),

    resendOrgVerOtp: mutation<AuthState, void>({
      query: (body) => ({
        url: "auth/org/resend-verification",
        method: "POST",
        body,
      }),
    }),

    onboardOrg: mutation<AuthState, OnboardOrgInput>({
      query: (body) => ({
        url: "auth/org/onboard",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetAuthUserQuery,
  useVerifyOrgMutation,
  useOrgVerMailMutation,
  useOnboardOrgMutation,
  useResendOrgVerOtpMutation,
} = authApi;
