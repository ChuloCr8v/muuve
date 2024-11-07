import { api } from "./base";
import {
  OrgModeOfDelivery,
  OrgProjectCategory,
  OrgProjectPhases,
  OrgRequestType,
  OrgServiceType,
} from "./types";

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

    listProjectModeOfDelivery: query<OrgModeOfDelivery[], void>({
      query: () => "org/config/mode-of-delivery",
      providesTags: ["org-config"],
    }),

    listProjectCategory: query<OrgProjectCategory[], void>({
      query: () => "org/config/project-category",
      providesTags: ["org-config"],
    }),

    listProjectPhases: query<OrgProjectPhases[], void>({
      query: () => "org/config/project-phases",
      providesTags: ["org-config"],
    }),
  }),
});

export const {
  useListServiceTypesQuery,
  useListRequestTypesQuery,
  useListProjectCategoryQuery,
  useListProjectModeOfDeliveryQuery,
  useListProjectPhasesQuery,
} = orgApi;
