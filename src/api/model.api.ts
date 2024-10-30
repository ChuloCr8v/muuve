import { api } from "./base";
import {
  AddModelInput,
  InventoryNotes,
  Model,
  ModelNoteInput,
  UpdateModelInput,
} from "./types";

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

    listModel: query<Model[], void>({
      query: () => "models",
      providesTags: ["model"],
    }),

    updateModel: mutation<void, UpdateModelInput>({
      query: ({ id, ...rest }) => ({
        url: `models/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["model"],
    }),

    createModelNote: mutation<void, ModelNoteInput>({
      query: ({ modelId, ...rest }) => ({
        url: `models/${modelId}/note`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["model"],
    }),

    listModelNotes: query<InventoryNotes[], { id: string }>({
      query: ({ id }) => `models/${id}/notes`,
      providesTags: ["model"],
    }),
  }),
});

export const {
  useAddModelMutation,
  useListModelQuery,
  useUpdateModelMutation,
  useCreateModelNoteMutation,
  useListModelNotesQuery,
} = modelApi;
