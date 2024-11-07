import { api } from "./base";
import { AddServicesInput } from "./types";

export const servicesAPI = api.injectEndpoints ({
    endpoints: ({query, mutation}) => ({
        addServices: mutation<void, AddServicesInput> ({
            query: (body => ({
                url: '/services',
                method: 'POST',
                body,
            })),
            invalidatesTags: ["services"]
        })
    })
})

export const {useAddServicesMutation} = servicesAPI