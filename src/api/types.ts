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

export type Vendor ={

}

export type User = {
  id: string;
  email: string;
  verified: string;
  isAdmin: string;
  orgId: string;
  staff: Staff;
  customer: Customer;
  createdAt: string;
  vendor: Vendor
};

export type AddCustomerInput = {
  name: string;
  email: string;
  phone: string;
  address: string;
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

export type Survey = {
  id: string;
  surveyId: string;
  state: string;
  region: string;
  longitude: number;
  lattitude: number;
  address: string;
  comment: string;
  customerId: string;
  orgId: string;
  serviceTypeId: string;
  requestTypeId: string;
  managerId: string;
  createdAt: string;
  bandwidth: string;
  manager: Staff;
  assignee: Staff;
  customer: Customer;
  status: SurveyStatus;
  requestType: OrgRequestType;
  serviceType: OrgServiceType;
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
  email: string
}

export type AddModelInput = {
  name: string;
  number: string;
  manufacturer: string;
  cost: number;
  description: string;
  category: string;
  vendorId: string;
}
