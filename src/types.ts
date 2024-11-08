import { Dayjs } from "dayjs";
import { SmSubModules } from "./api/types";

export const AppModules = {
  Projects: { SURVEY: SmSubModules.SURVEY, JOB_ORDER: SmSubModules.JOB_ORDER },
};

export interface TierTypes {
  id: number;
  label: string;
  value: number;
}

export interface PricingTiersTypes {
  monthly: Array<TierTypes>;
  yearly: Array<TierTypes>;
}

export interface ProductsDataTypes {
  id: string;
  label: string;
  description: string;
  features: Array<string>;
  pricing: PricingTiersTypes;
}

export interface Products {
  id: string;
  label: string;
  pricing: PricingTiersTypes;
}

export interface productsState {
  products: {
    products: ProductsDataTypes[];
    allSelectedProducts: SelectedProductSummaryType[];
    duration: string;
    expandedProductId: string;
    planUpdateActive: boolean;
  };
}

export interface SelectedProductSummaryType {
  product: string;
  id: number;
  productId: string;
  tierLabel: string;
  tierValue: number;
}

export interface SurveyAttachmentIterface {
  name: string;
  size: string;
}

export interface SurveyLogInterface {
  id: number;
  action: string;
  by: string;
  to: string;
  createdAt: string;
  comment: string;
  attachments: SurveyAttachmentIterface[];
}

export interface FileInterface {
  name: string;
  size: number;
  type: string;
}
export interface SurveyDataType {
  id: string;
  title: string;
  customerName: string;
  serviceAddress: string;
  serviceType: string;
  requestType: string;
  manager: string;
  engineer: string;
  bandwidth: string;
  region: string;
  state: string;
  longitude: string;
  latitude: string;
  dueDate: number;
  status: string;
  paymentStatus: string;
  comment: string;
  uploads: Array<FileInterface>;
}

export interface JobOrderType {
  title: string;
  customerName: string;
  serviceAddress: string;
  serviceDescription: string;
  id: string;
  serviceType: string;
  projectType: string;
  projectCategory: string;
  modeOfDelivery: string;
  region: string;
  bandwidth: string;
  mrr: number;
  nrr: number;
  accountPartner: string;
  customerContact: string;
  customerPhone: string;
  customerEmail: string;
  dueDate: number;
  comment: string;
  paymentStatus: string;
  projectManager: string;
  projectLead: string;
  designManager: string;
  designEngineer: string;
  vendor: string;
  stage: string;
  uploads: FileInterface[];
  status: string;
  requestType: string;
  state: string;
  latitude: number;
  longitude: number;
}

export interface PopupDataInterface {
  isOpen: boolean;
  data: {
    id: string;
    title: string;
  };
  currentProject?: string;
  action?: string;
}

export interface detailsDrawerDataInterface {
  isOpen: boolean;
  data: any;
}

export interface popupInterface {
  popups: {
    currentPopup: PopupDataInterface;
    projectDetailsDrawerIsOpen: detailsDrawerDataInterface;
    newTicketDrawerIsOpen: {
      editTicket?: boolean;
      isOpen: boolean;
      ticketID?: string;
    };
    resetPasswordModalIsOpen: boolean;
    ticketActionModalIsOpen: {
      isOpen: boolean;
      ticketID: string;
      action?: string;
    };
  };
}

export interface newRoleModalInterface {
  isOpen: boolean;
  module: string;
  action?: string;
  data?: [];
}

export interface deactivateServiceInterface {
  isOpen: boolean;
  data: [];
}

export interface AssignTicketInterface {
  isOpen: boolean;
  ticketID: string;
  action: string;
}
export interface PopupState {
  currentPopup: PopupDataInterface;
  projectDetailsDrawerIsOpen: detailsDrawerDataInterface;
  newRoleModalIsOpen: newRoleModalInterface;
  deactivateServiceModalIsOpen: deactivateServiceInterface;
  newTicketDrawerIsOpen: {
    isOpen: boolean;
    editTicket?: boolean;
    ticketID?: string;
  };
  resetPasswordModalIsOpen: boolean;
  ticketActionModalIsOpen: AssignTicketInterface;
}

export interface TicketsHistoryDataType {
  id: number;
  action: string;
  by: string;
  assignee?: string;
  assigner?: string;
  description: string;
  date: 1759276800;
  attachments: Array<FileInterface>;
}

export interface NewRoleFormDataTypes {
  label: string;
  name: string;
  value: string | boolean;
  type: string;
  options?: { label: string; value: string }[];
  required?: boolean;
}

export interface SubscriptionDataType {
  subscriptionId: string;
  serviceName: string;
  ServiceID: string;
  customerName: string;
  customerEmail: string;
  customerComapny?: string;
  customerAddress?: string;
  startDate: Dayjs;
  endDate: Dayjs;
  cycle: string;
  unitPrice?: number;
  amount: number;
  status: string;
  services: {
    serviceName: string;
    plan: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }[];
  notes?: string;
}

export interface CustomerDataTypes {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
}

export interface serviceFormDataType {
  id: number;
  serviceName: string;
  plan: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  services?: Array<{
    label: string;
    description: string;
    features: Array<string>;
    price: number;
    tierName: string;
  }>;
}

export interface NewSubscriptionFormDataType {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  services: Array<{
    serviceName: string;
    plan: string;
    quantity: number;
    amount: number;
  }>;
  subscriptionId: string;
  startDate: Dayjs;
  endDate: Dayjs;
  notes: string;
}

export interface PlanDataType {
  label: string;
  tierName: string;
  description: string;
  features: Array<string>;
  price: number;
}

export interface ServiceType {
  id: string;
  serviceName: string;
  status: string;
  description: string;
  dateCreated: Dayjs;
  billingCycle: string;
  plans: Array<PlanDataType>;
}

export enum AppForms {
  REQUEST_SURVEY = "REQUEST_SURVEY",
  CREATE_JOB_ORDER = "CREATE_JOB_ORDER",
}
