import { AppForms } from "@/types";

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
  orgId: string;
  verified: string;
  signature: string;
  isAdmin: string;
  isActive: boolean;
  staff: Staff;
  vendor: Vendor;
  customer: Customer;
  createdAt: string;
};

export type AddCustomerInput = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type CommentDto = {
  comment: string;
  attachments: Attachments;
};

export type NewTicketInput = {
  subject: string;
  description: string;
  customerId: string;
  severity: TicketSeverity;
  categoryId: string;
};

export type EditTicketInput = NewTicketInput & {
  id: string;
};

export type TicketCategory = {
  id: string;
  name: string;
  orgId: string;
};

export type ReassignTicketInput = {
  id: string;
  assigneeId: string;
  comment: string;
};

export type OrgServiceType = {
  id: string;
  name: string;
};

export type OrgRequestType = {
  id: string;
  name: string;
};

export type OrgProjectCategory = {
  id: string;
  name: string;
};

export type OrgModeOfDelivery = {
  id: string;
  name: string;
};

export type OrgProjectPhases = {
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
  startDate: Date;
  dueDate: Date;
  assignedDate: Date;
  completedDate: Date;
  isSlaInWorkDays: boolean;
  state: string;
  region: string;
  longitude: number;
  latitude: number;
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
  latitude: string;
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
  slaDays?: number;
  isWorkingDays?: boolean;
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
  byCustomer: User;
  toStaff: User;
  toVendor?: User;
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

export enum SmModules {
  PROJECT = "PROJECT",
  INVENTORY = "INVENTORY",
}

export enum SmSubModules {
  SURVEY = "SURVEY",
  JOB_ORDER = "JOB_ORDER",
}

export enum ProjectStage {
  // Project
  NOT_STARTED = "NOT_STARTED",
  LEAD_ASSIGNED = "LEAD_ASSIGNED",
  IMPLEMENTATION = "IMPLEMENTATION",

  // Design
  DESIGN_REQUESTED = "DESIGN_REQUESTED",
  DESIGN_ASSIGNED = "DESIGN_ASSIGNED",
  DESIGN_SUBMITTED = "DESIGN_SUBMITTED",
  DESIGN_REVERTED = "DESIGN_REVERTED",
  DESIGN_REWORK = "DESIGN_REWORK",

  SUSPENDED = "SUSPENDED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",

  AS_BUILT = "AS_BUILT",
  AS_BUILT_REVIEW = "AS_BUILT_REVIEW",
  AS_BUILT_REJECTED = "AS_BUILT_REJECTED",
  ACCEPTANCE_REVIEW = "ACCEPTANCE_REVIEW",
  ACCEPTANCE_REJECTED = "ACCEPTANCE_REJECTED",

  PRE_ATP = "PRE_ATP",
  FIELD_ATP = "FIELD_ATP",
  PRE_ATP_FAILED = "PRE_ATP_FAILED",
  FIELD_ATP_FAILED = "FIELD_ATP_FAILED",

  PROJECT_SIGNOFF = "PROJECT_SIGNOFF",
  CUSTOMER_SIGNOFF = "CUSTOMER_SIGNOFF",
  SIGNOFF_SUSPENDED = "SIGNOFF_SUSPENDED",

  // End Stage
  CLOSED = "CLOSED",
}

export type VendorUpdate = {
  id: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  vendorId: string;
  comment: string;
  phase: string;
  attachmentsId: string;
  attachments: Attachments;
};

export type ProjectDesign = {
  id: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  designerId: string;
  comment: string;
  connectingSiteId: string;
  connectingSiteName: string;
  customerId: string;
  frequency: string;
  lanIp: string;
  latitude: number;
  longitude: number;
  loopbackIp: string;
  serviceVlan: string;
  terminalEquipmentType: string;
  txMedium: string;
  upeCtnInterface: string;
  wanIp: string;
  attachmentsId: string;
  attachments: Attachments;
  designer: User;
};

export type ProjectAsBuilt = ProjectDesign & {
  cpeType: string;
  ceDevice: string;
  accessPortNode: string;
  antenna: string;
  deviceOem: string;
  indoor: string;
  polarization: string;
  radioVersion: string;
  serviceProvider: string;
  lga: string;
};

export type Project = {
  id: string;
  jobId: string;
  designStage: ProjectStage;
  projectStage: ProjectStage;
  startDate: string;
  designDueDate: Date;
  designAssignedDate: Date;
  designCompletedDate: Date;
  projectDueDate: Date;
  billingDate: Date;
  vendorAssignedDate: Date;
  projectCompletedDate: Date;
  isDesignSlaInWorkDays: boolean;
  isProjectSlaInWorkDays: boolean;
  acceptanceStage: ProjectStage;
  unapprovedStage: ProjectStage;
  isAssigned: boolean;
  isVendorAssigned: boolean;
  isDesignUploaded: boolean;
  phase: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  description: string;
  address: string;
  bandwidth: string;
  nrr: number;
  mrr: number;
  state: string;
  region: string;
  longitude: number;
  latitude: number;
  modeOfDeliveryId: string;
  categoryId: string;
  requestTypeId: string;
  serviceTypeId: string;
  requesterId: string;
  customerId: string;
  managerId: string;
  leadId: string;
  orgId: string;
  manager: User;
  customer: User;
  lead: User;
  assignee: User;
  vendor: User;
  requestType: OrgRequestType;
  serviceType: OrgServiceType;
  category: OrgProjectCategory;
  modeOfDelivery: OrgModeOfDelivery;
  logs: Log[];
  vendorUpdates: VendorUpdate[];
  design: ProjectDesign;
  asBuilt: ProjectAsBuilt;
};

export type NewProjectInput = {
  customerId: string;
  managerId: string;
  surveyId: string;
  leadId: string;
  serviceTypeId: string;
  requestTypeId: string;
  categoryId: string;
  modeOfDeliveryId: string;
  address: string;
  bandwidth: string;
  state: string;
  region: string;
  longitude: number;
  latitude: number;
  mrr: number;
  nrr: number;
  description: string;
  attachments?: Attachments;
  comment?: string;
};

export type AssignProjectInput = CommentDto & {
  id: string;
  assigneeId: string;
  slaDays?: number;
  isWorkingDays?: boolean;
};

export type CommentProjectInput = CommentDto & {
  id: string;
};

export type EditProjectInput = NewProjectInput & {
  id: string;
};

export type ReassignProjectLeadInput = CommentDto & {
  id: string;
  leadId: string;
};

export type AssignProjectVendorInput = CommentDto & {
  id: string;
  vendorId: string;
  slaDays?: number;
  isWorkingDays?: boolean;
};

export type ProjectVendorUpdate = CommentDto & {
  id: string;
  phase: string;
  vendorId: string;
};

export type ProjectUpdatePhase = CommentDto & {
  id: string;
  phase: string;
};

export interface DynamicFormInput {
  type: AppForms;
  module: SmModules;
  content: string;
}

export interface ListProjectsQuery {
  atp?: boolean;
  customer?: boolean;
}

export interface SubmitDesignInput extends CommentDto {
  id: string;
  txMedium: string;
  frequency: string;
  terminalEquipmentType: string;
  loopbackIp: string;
  wanIp: string;
  lanIp: string;
  upeCtnInterface: string;
  serviceVlan: string;
  customerId: string;
  latitude: number;
  longitude: number;
  connectingSiteId: string;
  connectingSiteName: string;
}

export interface SubmitAsBuiltInput extends SubmitDesignInput {
  cpeType: string;
  ceDevice: string;
  accessPortNode: string;
  antenna: string;
  deviceOem: string;
  indoor: string;
  polarization: string;
  radioVersion: string;
  serviceProvider: string;
  lga: string;
}

export interface AsBuiltAction extends CommentDto {
  id: string;
}

export interface SkipEatpInput extends CommentDto {
  id: string;
}

export interface AcceptanceAction extends CommentDto {
  id: string;
}

export interface AtpAction extends CommentDto {
  id: string;
}

export enum TicketSeverity {
  LOW = "LOW",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  CRITICAL = "CRITICAL",
}

enum TicketStatus {
  CLOSED = "CLOSED",
  RESOLVED = "RESOLVED",
  ASSIGNED = "ASSIGNED",
  ESCALATED = "ESCALATED",
}

export interface Ticket {
  id: string;
  ticketId: string;
  subject: string;
  description: string;
  createdAt: Date;
  categoryId: Date;
  status: TicketStatus;
  severity: TicketSeverity;
  requesterId: string;
  assigneeId: string;
  customerId: string;
  orgId: string;
  assignee: User;
  customer: User;
  category: TicketCategory;
  requester: User;
  log: Log[];
}

export interface ProjectSignoffInput {
  id: string;
  signature?: string;
  billingDate?: string;
  contactEmail?: string;
}

export interface CustomerSignoffInput extends CommentDto {
  id: string;
  signature?: string;
}

// export enum DiscountType {
//   FIXED,
//   PERCENTAGE
// }

// export type AddServicesInput = {
//   plans: any;
//   serviceName: any;
//   billingCycle: string | null | undefined;
//   name: string;
//   description: string;
//   cycle: BillingCycle;
//   tiers: {
//     name: string;
//     description: string;
//     amount: number;
//     features: string[];
//    }[]
//   discount?: number;
//   discountType?: DiscountType;
// }
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
  plans: any;
  serviceName: any;
  billingCycle: string | null | undefined;
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
