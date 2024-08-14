export enum ApartmentStatus {
  NEW = "NEW",
  CONTINGENT = "CONTINGENT",
  SOLD = "SOLD",
  WITHDRAWN = "WITHDRAWN",
  BACK_ON_MARKET = "BACK_ON_MARKET",
  EXPIRED = "EXPIRED",
}

export interface Apartment {
  id: string;
  title: string;
  address?: string;
  price: number;
  status: ApartmentStatus;
  directions?: string;
  description?: string;
  pool?: boolean;
  waterfront?: boolean;
  bthrooms: number;
  bdrooms: number;
  sqft: number;
  createdAt: string;
  updatedAt: string;
}
