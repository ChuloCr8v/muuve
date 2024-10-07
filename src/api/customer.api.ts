import { api } from "./base";
import { AddCustomerInput, User } from "./types";

export const customerApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    addCustomer: mutation<void, AddCustomerInput>({
      query: (body) => ({
        url: "customer",
        method: "POST",
        body,
      }),
      invalidatesTags: ["customer"],
    }),

    listCustomers: query<User[], void>({
      query: () => "customer",
      providesTags: ["customer"],
    }),
  }),
});

export const { useAddCustomerMutation, useListCustomersQuery } = customerApi;
