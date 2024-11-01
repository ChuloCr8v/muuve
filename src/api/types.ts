export type AuthState = {
  token: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthResult = AuthState;

export type OrgVerInput = {
  email: string;
};

export type VerifyOrgInput = {
  code: string;
};

export type OnboardOrgInput = {
  name: string;
  orgName: string;
  industry: string;
  phone: string;
  password: string;
};

export type AddStaffInput = {
  email: string;
  name: string;
};

export type Staff = {
  id: string;
  name: string;
  isActive: string;
  userId: string;
  orgId: string;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  isActive: string;
  userId: string;
  orgId: string;
  customerId: string;
};

export type Vendor = {
  spocName: string;
  companyName: string;
  email: string;
};

export type User = {
  name: any;
  id: string;
  email: string;
  verified: string;
  isAdmin: string;
  isActive: boolean;
  orgId: string;
  staff: Staff;
  customer: Customer;
  createdAt: string;
  vendor: Vendor;
};

export type AddCustomerInput = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type NewTicketDataType = {
  subject: string;
  description: string;
  customerId: string;
  severity: string;
  categoryId: string;
};

export type TicketCategoryDataType = {
  id: string;
  name: string;
  orgId: string;
};

export type OrgServiceType = {
  id: string;
  name: string;
};

export type OrgRequestType = {
  id: string;
  name: string;
};

export enum SurveyStatus {
  REQUESTED = "REQUESTED",
  REJECTED = "REJECTED",
  ONGOING = "ONGOING",
  REVERTED = "REVERTED",
  COMPLETED = "COMPLETED",
}

export type Upload = {
  id: string;
  name: string;
  key: string;
  mime: string;
  order: number;
  size: number;
  createdAt: number;
  fileContent?: {
    data: Buffer;
  };
};

type Attachments = {
  id: string;
  uploads: Upload[];
};

export type Survey = {
  id: string;
  surveyId: string;
  isAssigned: boolean;
  state: string;
  region: string;
  longitude: number;
  lattitude: number;
  address: string;
  customerId: string;
  orgId: string;
  serviceTypeId: string;
  requestTypeId: string;
  managerId: string;
  createdAt: string;
  bandwidth: string;
  manager: User;
  assignee: User;
  customer: User;
  status: SurveyStatus;
  requestType: OrgRequestType;
  serviceType: OrgServiceType;
  logs: Log[];
};

export type NewSurveyInput = {
  customerId: string;
  serviceLocationAddress: string;
  serviceTypeId: string;
  requestTypeId: string;
  state: string;
  region: string;
  longitude: string;
  lattitude: string;
  comment?: string;
};

export type UpdateSurveyInput = NewSurveyInput & {
  id: string;
  surveyId: string;
};

export type AssignSurveyInput = {
  id: string;
  comment: string;
  surveyId: string;
  assigneeId: string;
};

export type RevertSurveyInput = {
  id: string;
  surveyId: string;
  comment: string;
};

export type RejectSurveyInput = {
  id: string;
  surveyId: string;
  comment: string;
};

export type DeleteSurveyInput = {
  id: string;
  surveyId: string;
  comment: string;
};

export type CompleteSurveyInput = {
  id: string;
  surveyId: string;
  comment: string;
};

export type AddVendorInput = {
  companyName: string;
  spocName: string;
  email: string;
};

export type InventoryNotes = {
  id: string;
  comment: string;
  createdAt: string;
  userId: string;
  user: User;
  modelId: string;
};

export type Model = {
  id: string;
  name: string;
  number: string;
  manufacturer: string;
  description: string;
  category: string;
  vendor: string;
  createdAt: string;
  updatedAt: string;
  orgId: string;
  devices: Device[];
  notes: InventoryNotes[];
};

export type AddModelInput = {
  name: string;
  number: string;
  manufacturer: string;
  cost?: number;
  description: string;
  category: string;
  vendor: string;
  vendorId: string;
};

export enum DeviceStatus {
  AVAILABLE = "AVAILABLE",
  ASSIGNED = "ASSIGNED",
  DELETED = "DELETED",
  FAULTY = "FAULTY",
}

export type Log = {
  id: string;
  action: string;
  attachments: Attachments;
  byStaff: User;
  toStaff: User;
  changedStatus: SurveyStatus;
  comment: string;
  createdAt: string;
};

export type Device = {
  id: string;
  name: string;
  manufacturer: string;
  partNumber: string;
  serialNumber: string;
  cost: number;
  location: string;
  description: string;
  dateProcured: string;
  vendor: string;
  status: DeviceStatus;
  assigneeId: string;
  modelId: string;
  orgId: string;
  model: Model;
  notes: InventoryNotes;
  attachments: Attachments;
  logs: Log[];
};

export type AddDeviceInput = {
  name: string;
  manufacturer: string;
  partNumber: string;
  serialNumber: string;
  cost: number;
  location: string;
  description: string;
  dateProcured: Date;
  modelId: string;
  attachments: string[];
};

export type UpdateModelInput = {
  id: string;
  name: string;
  number: string;
  manufacturer: string;
  description: string;
  category: string;
  vendorId: string;
};

export type UpdateDeviceInput = {
  id: string;
  name: string;
  manufacturer: string;
  serialNumber: string;
  cost: number;
  location: string;
  vendor: string;
  description: string;
  dateProcured: Date;
  modelId: string;
};

export type ReportFault = {
  id: string;
  comment: string;
  attachments: string[];
};

export type ModelNoteInput = {
  comment: string;
  modelId: string;
};

export type DeviceNoteInput = {
  comment: string;
  deviceId: string;
};

export type AssignDevice = {
  deviceIds: string[];
  assigneeId: string;
  comment: string;
};

export enum FieldType {
  TEXT = "TEXT",
  NUMBER = "NUMBER",
  SELECT = "SELECT",
  DATE = "DATE",
}

export enum SmModules {
  SURVEY = "SURVEY",
  JOB_ORDER = "JOB_ORDER",
}

export type DyanamicField = {
  id: string;
  label: string;
  module: SmModules;
  type: FieldType;
  createdAt: string;
  orgId: string;
};

export type DynamicFieldInput = {
  label: string;
  type: FieldType;
  module: SmModules;
};

//services endpoints
export enum BillingCycle {
  MONTHLY,
  YEARLY,
}

export enum DiscountType {
  FIXED,
  PERCENTAGE,
}

export type AddServicesInput = {
  name: string;
  description: string;
  cycle: BillingCycle;
  tiers: {
    name: string;
    description: string;
    amount: number;
    features: string[];
  }[];
  discount?: number;
  discountType?: DiscountType;
};
