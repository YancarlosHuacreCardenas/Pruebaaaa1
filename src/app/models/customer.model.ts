export interface Customer {
  customerId?: number;
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  registeredAt?: string;
  updatedAt?: string;
  preferences?: string;
  isActive?: boolean;
  clientType: string;
}
