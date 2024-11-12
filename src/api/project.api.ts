import { api } from "./base";
import {
  Project,
  AcceptanceAction,
  AsBuiltAction,
  AssignProjectInput,
  AssignProjectVendorInput,
  AtpAction,
  CommentProjectInput,
  EditProjectInput,
  ListProjectsQuery,
  NewProjectInput,
  ProjectUpdatePhase,
  ProjectVendorUpdate,
  ReassignProjectLeadInput,
  SkipEatpInput,
  SubmitAsBuiltInput,
  SubmitDesignInput,
  ProjectSignoffInput,
  CustomerSignoffInput,
} from "./types";

export const projectsApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    createProject: mutation<void, NewProjectInput>({
      query: (body) => ({
        url: "projects",
        method: "POST",
        body,
      }),
      invalidatesTags: ["project"],
    }),

    listProjects: query<Project[], ListProjectsQuery | undefined | void>({
      query: (q) => ({ url: "projects", params: q ?? undefined }),
      providesTags: ["project"],
    }),

    assignProject: mutation<void, AssignProjectInput>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/assign`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    reassignProject: mutation<void, AssignProjectInput>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/reassign`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    addProjectComment: mutation<void, CommentProjectInput>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/comment`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    editProject: mutation<void, EditProjectInput>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    reassignProjectLead: mutation<void, ReassignProjectLeadInput>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/lead/reassign`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    assignProjectVendor: mutation<void, AssignProjectVendorInput>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/vendor/assign`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    changeProjectVendor: mutation<void, AssignProjectVendorInput>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/vendor/change`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    cancelProject: mutation<void, CommentProjectInput>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/cancel`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    suspendProject: mutation<void, CommentProjectInput>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/suspend`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    vendorProjectUpdate: mutation<void, ProjectVendorUpdate>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/vendor/updates`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    updateProjectPhase: mutation<void, ProjectUpdatePhase>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/phase`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    approveRequestedPhase: mutation<void, CommentProjectInput>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/approve`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    revertProject: mutation<void, CommentProjectInput>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/revert`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    denyRequestedPhase: mutation<void, CommentProjectInput>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/deny`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    submitDesign: mutation<void, SubmitDesignInput>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/design/submit`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    reworkProjectDesign: mutation<void, CommentProjectInput>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/design/rework`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    submitAsBuilt: mutation<void, SubmitAsBuiltInput>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/as-built`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    rejectAsBuilt: mutation<void, AsBuiltAction>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/as-built/reject`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    acceptAsBuilt: mutation<void, AsBuiltAction>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/as-built/approve`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    skipEatp: mutation<void, SkipEatpInput>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/eatp/skip`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    approveReview: mutation<void, AcceptanceAction>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/review/pass`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    rejectReview: mutation<void, AcceptanceAction>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/review/fail`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    passPreAtp: mutation<void, AtpAction>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/pre-atp/pass`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    failPreAtp: mutation<void, AtpAction>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/pre-atp/fail`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    passFieldAtp: mutation<void, AtpAction>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/field-atp/pass`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    failFieldAtp: mutation<void, AtpAction>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/field-atp/fail`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    signoff: mutation<void, ProjectSignoffInput>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/signoff`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),

    customerSignoff: mutation<void, CustomerSignoffInput>({
      query: ({ id, ...rest }) => ({
        url: `projects/${id}/signoff/customer`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["project"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useListProjectsQuery,
  useAssignProjectMutation,
  useAddProjectCommentMutation,
  useEditProjectMutation,
  useReassignProjectLeadMutation,
  useAssignProjectVendorMutation,
  useChangeProjectVendorMutation,
  useCancelProjectMutation,
  useVendorProjectUpdateMutation,
  useSuspendProjectMutation,
  useApproveRequestedPhaseMutation,
  useDenyRequestedPhaseMutation,
  useUpdateProjectPhaseMutation,
  useReassignProjectMutation,
  useRevertProjectMutation,
  useSubmitDesignMutation,
  useReworkProjectDesignMutation,
  useSubmitAsBuiltMutation,
  useRejectAsBuiltMutation,
  useAcceptAsBuiltMutation,
  useSkipEatpMutation,
  useApproveReviewMutation,
  useRejectReviewMutation,
  usePassPreAtpMutation,
  useFailPreAtpMutation,
  usePassFieldAtpMutation,
  useFailFieldAtpMutation,
  useSignoffMutation,
  useCustomerSignoffMutation,
} = projectsApi;
