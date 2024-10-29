import { api } from "./base";
import { DyanamicField, DynamicFieldInput } from "./types";

export const dynamicFormApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    addField: mutation<void, DynamicFieldInput>({
      query: (body) => ({
        url: "dynamic-form",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dynamic-form"],
    }),

    listField: query<DyanamicField[], void>({
      query: (module) => `dynamic-form/${module}`,
      providesTags: ["dynamic-form"],
    }),
  }),
});

export const { useAddFieldMutation, useListFieldQuery } = dynamicFormApi;
