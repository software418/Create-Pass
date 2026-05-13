export type EmployeeStatus = 'active' | 'blocked' | 'deleted';

export interface IEmployee {
  _id: string; // MongoDB Document ID
  name: string;
  employeeId: string;
  department: string;
  designation?: string;
  email?: string;
  phone?: string;
  status: EmployeeStatus;
  createdAt?: string;
}

// Payload structure needed to create or update an employee record
export type EmployeePayload = Omit<IEmployee, '_id' | 'createdAt'>;
