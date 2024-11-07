import { api } from "./base";
import { NewTicketDataType, TicketCategoryDataType, User } from "./types";

export const ticketApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    createTicket: mutation<void, NewTicketDataType>({
      query: (body) => ({
        url: "tickets",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ticket"],
    }),

    updateTicket: mutation({
      query: ({ id, body }) => ({
        url: `/customer/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ticket"],
    }),

    listTickets: query<User[], void>({
      query: () => "tickets",
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

    listTicketCategories: query<TicketCategoryDataType[], void>({
      query: () => "tickets/category",
      providesTags: ["ticket"],
    }),
  }),
});

export const {
  useCreateTicketMutation,
  useListTicketsQuery,
  useCreateTicketCategoryMutation,
  useListTicketCategoriesQuery,
} = ticketApi;
