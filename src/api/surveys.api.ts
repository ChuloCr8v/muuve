import { api } from "./base";
import {
  AssignSurveyInput,
  CompleteSurveyInput,
  DeleteSurveyInput,
  NewSurveyInput,
  RejectSurveyInput,
  RevertSurveyInput,
  Survey,
  UpdateSurveyInput,
} from "./types";

export const surveysApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    requestSurvey: mutation<void, NewSurveyInput>({
      query: (body) => ({
        url: "surveys",
        method: "POST",
        body,
      }),
      invalidatesTags: ["survey"],
    }),

    listSurveys: query<Survey[], void>({
      query: () => "surveys",
      providesTags: ["survey"],
    }),

    updateSurvey: mutation<void, UpdateSurveyInput>({
      query: ({ id, ...rest }) => ({
        url: `surveys/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["survey"],
    }),

    assignSurvey: mutation<void, AssignSurveyInput>({
      query: ({ id, ...rest }) => ({
        url: `surveys/${id}/assign`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["survey"],
    }),

    reassignSurvey: mutation<void, AssignSurveyInput>({
      query: ({ id, ...rest }) => ({
        url: `surveys/${id}/reassign`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["survey"],
    }),

    revertSurvey: mutation<void, RevertSurveyInput>({
      query: ({ id, ...rest }) => ({
        url: `surveys/${id}/revert`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["survey"],
    }),

    rejectSurvey: mutation<void, RejectSurveyInput>({
      query: ({ id, ...rest }) => ({
        url: `surveys/${id}/reject`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["survey"],
    }),

    completeSurvey: mutation<void, CompleteSurveyInput>({
      query: ({ id, ...rest }) => ({
        url: `surveys/${id}/complete`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["survey"],
    }),

    deleteSurvey: mutation<void, DeleteSurveyInput>({
      query: ({ id, ...rest }) => ({
        url: `surveys/${id}`,
        method: "DELETE",
        body: rest,
      }),
      invalidatesTags: ["survey"],
    }),
  }),
});

export const {
  useListSurveysQuery,
  useUpdateSurveyMutation,
  useAssignSurveyMutation,
  useRevertSurveyMutation,
  useRejectSurveyMutation,
  useDeleteSurveyMutation,
  useRequestSurveyMutation,
  useReassignSurveyMutation,
  useCompleteSurveyMutation,
} = surveysApi;
