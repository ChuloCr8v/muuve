import { api } from "./base";
import { OrgRequestType, OrgServiceType } from "./types";

export const orgApi = api.injectEndpoints({
  endpoints: ({ query }) => ({
    listServiceTypes: query<OrgServiceType[], void>({
      query: () => "org/config/service-type",
      providesTags: ["org-config"],
    }),

    listRequestTypes: query<OrgRequestType[], void>({
      query: () => "org/config/request-type",
      providesTags: ["org-config"],
    }),
  }),
});

export const { useListServiceTypesQuery, useListRequestTypesQuery } = orgApi;
