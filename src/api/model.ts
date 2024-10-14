import { api } from "./base";
import { AddModelInput, User } from "./types";

export const modelApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    addModel: mutation<void, AddModelInput>({
      query: (body) => ({
        url: "models",
        method: "POST",
        body,
      }),
      invalidatesTags: ["model"],
    }),

    listModel: query<User[], void>({
      query: () => "model",
      providesTags: ["model"],
    }),
  }),
});

export const { useAddModelMutation, useListModelQuery } = modelApi;
