import { api } from "./base";
import { NewSurveyInput, Survey } from "./types";

export const projectApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    createSurvey: mutation<void, NewSurveyInput>({
      query: (body) => ({
        url: "project/survey",
        method: "POST",
        body,
      }),
      invalidatesTags: ["survey"],
    }),

    listSurveys: query<Survey[], void>({
      query: () => "project/survey",
      providesTags: ["survey"],
    }),
  }),
});

export const { useCreateSurveyMutation, useListSurveysQuery } = projectApi;
