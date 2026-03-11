export type CustomerType =
  | "Individual"
  | "Business"
  | "Enterprise"
  | "Partner"
  | "Reseller"
  | "Other";

export interface CustomerRecord {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  customerType: CustomerType;
  dateCreated: string;
}

export interface CustomerFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  customerType: CustomerType;
}
