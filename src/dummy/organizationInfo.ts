import { E164Number } from "libphonenumber-js";

export interface OrganizationInformationType {
  companyName: string;
  companyLogo: string;
  emailAddress: string;
  phoneNumber: E164Number | undefined;
  industry: string;
  website: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  facebook: string;
  twitter: string;
  linkedIn: string;
  supportFullName: string;
  supportEmail: string;
  supportPhone: E164Number | undefined;
}

export const orgInfo: OrganizationInformationType = {
  companyName: "Backbone Connectivity Network",
  companyLogo: "/user-logo.png",
  emailAddress: "backbone@connectivity.com",
  phoneNumber: "+123456789" as E164Number,
  industry: "Telecommunication",
  website: "www.backbone.com",
  bankName: "First Bank",
  accountName: "Backbone Connectivity",
  accountNumber: "1234567890",
  facebook: "official_Backbone",
  twitter: "official_Backbone",
  linkedIn: "official_Backbone",
  supportFullName: "Modesta Ishiguzo",
  supportEmail: "modesta@backbone.com",
  supportPhone: "+123456789" as E164Number,
};
