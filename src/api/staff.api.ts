import { api } from "./base";
import { AddStaffInput, User } from "./types";

export const staffApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    addStaff: mutation<void, AddStaffInput>({
      query: (body) => ({
        url: "staff",
        method: "POST",
        body,
      }),
      invalidatesTags: ["staff"],
    }),

    updateStaff: mutation({
      query: ({ id, body }) => ({
        url: `/staff/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["staff"],
    }),

    updateStaffStatus: mutation({
      query: ({ id }) => ({
        url: `/auth/${id}/status`,
        method: "POST",
      }),
      invalidatesTags: ["staff", "customer", "vendor"],
    }),

    listStaff: query<User[], void>({
      query: () => "staff",
      providesTags: ["staff"],
    }),
  }),
});

export const {
  useAddStaffMutation,
  useUpdateStaffMutation,
  useListStaffQuery,
  useUpdateStaffStatusMutation,
} = staffApi;
