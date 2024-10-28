import { api } from "./base";
import { AddModelInput, ModelNoteInput, UpdateModelInput, User } from "./types";

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
      query: () => "models",
      providesTags: ["model"],
    }),

    updateModel: mutation<void, UpdateModelInput> ({
      query: ({id, ...rest}) => ({
        url: `models/${id}`,
        method: 'PATCH',
        body: rest
      }),
      invalidatesTags: ["model"]
    }),

    createModelNote: mutation<void, ModelNoteInput> ({
      query: ({modelId, ...rest}) => ({
        url: `models/${modelId}/notes`,
        method: "POST",
        body: rest
      }),
      invalidatesTags: ["model"]
    }),

    listModelNotes: query<AddModelInput, void>({
      query: (id) => `models/${id}/notes`,
      providesTags: ["model"]

    })
  }),
});

export const { useAddModelMutation, useListModelQuery, useUpdateModelMutation, useCreateModelNoteMutation, useLazyListModelNotesQuery } = modelApi;
