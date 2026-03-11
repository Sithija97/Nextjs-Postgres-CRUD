export type CustomerType =
  | "Individual"
  | "Business"
  | "Enterprise"
  | "Partner"
  | "Reseller"
  | "Other";

export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  country: string;
  customer_type: CustomerType;
  date_created: string;
}

export const customers: Customer[] = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@email.com",
    phone_number: "+1-555-0123",
    address: "123 Main St, Anytown",
    country: "United States",
    customer_type: "Individual",
    date_created: "2026-01-15T10:30:00.000Z",
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@email.com",
    phone_number: "+1-555-0456",
    address: "456 Elm St, Othertown",
    country: "Canada",
    customer_type: "Business",
    date_created: "2026-01-20T14:20:00.000Z",
  },
  {
    id: 3,
    first_name: "Mike",
    last_name: "Johnson",
    email: "mike.johnson@email.com",
    phone_number: "+44-20-7123-4567",
    address: "789 Oak St, Sometown",
    country: "United Kingdom",
    customer_type: "Individual",
    date_created: "2026-02-01T09:15:00.000Z",
  },
  {
    id: 4,
    first_name: "Sarah",
    last_name: "Williams",
    email: "sarah.williams@email.com",
    phone_number: "+1-555-0789",
    address: "321 Pine St, Anycity",
    country: "United States",
    customer_type: "Enterprise",
    date_created: "2026-02-10T16:45:00.000Z",
  },
  {
    id: 5,
    first_name: "David",
    last_name: "Brown",
    email: "david.brown@email.com",
    phone_number: "+61-2-9876-5432",
    address: "654 Cedar St, Othercity",
    country: "Australia",
    customer_type: "Partner",
    date_created: "2026-02-15T11:30:00.000Z",
  },
  {
    id: 6,
    first_name: "Emily",
    last_name: "Davis",
    email: "emily.davis@email.com",
    phone_number: "+49-30-1234-5678",
    address: "987 Spruce St, Somecity",
    country: "Germany",
    customer_type: "Business",
    date_created: "2026-02-20T13:20:00.000Z",
  },
  {
    id: 7,
    first_name: "Robert",
    last_name: "Miller",
    email: "robert.miller@email.com",
    phone_number: "+1-555-0147",
    address: "159 Maple St, Anothertown",
    country: "United States",
    customer_type: "Individual",
    date_created: "2026-02-25T08:10:00.000Z",
  },
  {
    id: 8,
    first_name: "Lisa",
    last_name: "Anderson",
    email: "lisa.anderson@email.com",
    phone_number: "+33-1-4567-8901",
    address: "753 Birch St, Yetanothertown",
    country: "France",
    customer_type: "Reseller",
    date_created: "2026-03-01T15:40:00.000Z",
  },
  {
    id: 9,
    first_name: "James",
    last_name: "Wilson",
    email: "james.wilson@email.com",
    phone_number: "+81-3-1234-5678",
    address: "852 Walnut St, Newtown",
    country: "Japan",
    customer_type: "Enterprise",
    date_created: "2026-03-05T12:25:00.000Z",
  },
  {
    id: 10,
    first_name: "Maria",
    last_name: "Garcia",
    email: "maria.garcia@email.com",
    phone_number: "+34-91-123-4567",
    address: "951 Chestnut St, Oldtown",
    country: "Spain",
    customer_type: "Business",
    date_created: "2026-03-08T10:50:00.000Z",
  },
];
