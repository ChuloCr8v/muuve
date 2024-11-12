import { api } from "./base";
import {
  EditTicketInput,
  NewTicketInput,
  ReassignTicketInput,
  Ticket,
  TicketCategory,
} from "./types";

export const ticketApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    createTicket: mutation<void, NewTicketInput>({
      query: (body) => ({
        url: "tickets",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ticket"],
    }),

    updateTicket: mutation<void, EditTicketInput>({
      query: ({ id, ...body }) => ({
        url: `/tickets/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ticket"],
    }),

    listTickets: query<Ticket[], void>({
      query: () => "tickets",
      providesTags: ["ticket"],
    }),

    getTicket: query<Ticket, { id: string }>({
      query: ({ id }) => `tickets/${id}`,
      providesTags: ["ticket"],
    }),

    createTicketCategory: mutation<void, { name: string }>({
      query: (body) => ({
        url: "tickets/category",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ticket"],
    }),

    listTicketCategories: query<TicketCategory[], void>({
      query: () => "tickets/category",
      providesTags: ["ticket"],
    }),

    reassignTicket: mutation<void, ReassignTicketInput>({
      query: ({ id, ...body }) => ({
        url: `tickets/${id}/reassign`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ticket"],
    }),
  }),
});

export const {
  useCreateTicketMutation,
  useListTicketsQuery,
  useGetTicketQuery,
  useCreateTicketCategoryMutation,
  useUpdateTicketMutation,
  useListTicketCategoriesQuery,
  useReassignTicketMutation,
} = ticketApi;
