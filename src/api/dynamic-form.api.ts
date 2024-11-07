import { api } from "./base";
import { DynamicFormInput } from "./types";

export const dynamicFormApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    addFormField: mutation<void, DynamicFormInput>({
      query: (body) => ({
        url: "dynamic-form",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dynamic-form"],
    }),

    getFormField: query({
      query: ({ module, type }) => `dynamic-form/${module}/form/${type}`,
      providesTags: ["dynamic-form"],
    }),
  }),
});

export const { useAddFormFieldMutation, useGetFormFieldQuery } = dynamicFormApi;
