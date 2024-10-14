import { api } from "./base";
import { AddVendorInput, User } from "./types";

export const vendorApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    addVendor: mutation<void, AddVendorInput>({
      query: (body) => ({
        url: "vendor",
        method: "POST",
        body,
      }),
      invalidatesTags: ["vendor"],
    }),

    listVendor: query<User[], void>({
      query: () => "vendor",
      providesTags: ["vendor"],
    }),
  }),
});

export const { useAddVendorMutation, useListVendorQuery } = vendorApi;
