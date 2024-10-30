import { api } from "./base";
import {
  AddDeviceInput,
  AssignDevice,
  Device,
  DeviceNoteInput,
  InventoryNotes,
  ReportFault,
  UpdateDeviceInput,
} from "./types";

export const deviceApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    addDevice: mutation<void, AddDeviceInput>({
      query: (body) => ({
        url: "/devices",
        method: "POST",
        body,
      }),
      invalidatesTags: ["device"],
    }),

    listDevices: query<Device[], void>({
      query: () => "devices",
      providesTags: ["device"],
    }),

    updateDevice: mutation<void, UpdateDeviceInput>({
      query: ({ id, ...rest }) => ({
        url: `devices/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["device"],
    }),

    assignDevice: mutation<void, AssignDevice>({
      query: (body) => ({
        url: "/devices/assign",
        method: "POST",
        body,
      }),
      invalidatesTags: ["device"],
    }),

    createDeviceNote: mutation<void, DeviceNoteInput>({
      query: ({ deviceId, ...rest }) => ({
        url: `devices/${deviceId}/note`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["model"],
    }),

    listDeviceNotes: query<InventoryNotes[], { id: string }>({
      query: ({ id }) => `devices/${id}/notes`,
      providesTags: ["device"],
    }),

    reportFault: mutation<void, ReportFault>({
      query: ({ id, ...rest }) => ({
        url: `devices/${id}/report-fault`,
        method: "POST",
        body: rest,
      }),
    }),
  }),
});

export const {
  useAddDeviceMutation,
  useListDevicesQuery,
  useUpdateDeviceMutation,
  useReportFaultMutation,
  useListDeviceNotesQuery,
  useAssignDeviceMutation,
  useCreateDeviceNoteMutation,
} = deviceApi;
