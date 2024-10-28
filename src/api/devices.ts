import { DataType } from '../components/tableItems/columns/reportTable'
import  {api} from './base'
import { AddDeviceInput, AssignDevice, DeviceNoteInput, ReportFault, UpdateDeviceInput, User } from './types'

export const deviceApi = api.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        addDevice: mutation<void, AddDeviceInput>({
            query: (body =>({
                url: "/devices",
                method: "POST",
                body,
            })),
             invalidatesTags: ["device"]
        }),

        listDevices: query<DataType[], void> ({
            query: () => "devices",
            providesTags: ["device"]
        }),

        updateDevice: mutation<void, UpdateDeviceInput>({
            query: ({id, ...rest})=> ({
                url: `devices/${id}`,
                method: "PATCH",
                body: rest
            }),
            invalidatesTags: ["device"]
        }),

        assignDevice: mutation<void, AssignDevice>({
            query: () => ({
                url: "/devices/assign", 
                method: "POST",
            }),
            invalidatesTags: ["device"]
        }),

        createDeviceNote: mutation<void, DeviceNoteInput> ({
            query: (body) => ({
              url: "/devices/note",
              method: "POST",
              body,
            }),
            invalidatesTags: ["model"]
          }),

        listDeviceNotes: query<AddDeviceInput, void>({
            query: (id) => `devices/${id}/notes`,
            providesTags: ["device"]
      
          }),

        reportFault: mutation<void, ReportFault>({
            query: ({id, ...rest}) =>({
                url: `devices/${id}/report-fault`,
                method: "POST",
                body: rest

            })
        })
       
    })
})

export const { useAddDeviceMutation, useListDevicesQuery, useUpdateDeviceMutation, useReportFaultMutation, useLazyListDeviceNotesQuery, useAssignDeviceMutation} = deviceApi