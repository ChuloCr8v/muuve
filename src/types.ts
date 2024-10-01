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
  };
}

export interface newRoleModalInterface {
  isOpen: boolean;
  module: string;
}

export interface deactivateServiceInterface {
  isOpen: boolean;
  data: [];
}

export interface popupState {
  currentPopup: PopupDataInterface;
  projectDetailsDrawerIsOpen: detailsDrawerDataInterface;
  newRoleModalIsOpen: newRoleModalInterface;
  deactivateServiceModalIsOpen: deactivateServiceInterface;
}
