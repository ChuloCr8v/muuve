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

    listStaff: query<User[], void>({
      query: () => "staff",
      providesTags: ["staff"],
    }),
  }),
});

export const { useAddStaffMutation, useListStaffQuery } = staffApi;
