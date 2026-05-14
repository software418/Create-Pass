export type Status = 'active' | 'blocked' | 'deleted';

export interface IEmployee {
  _id: string; // MongoDB Document ID
  name: string;
  employeeId: string;
  department: string;
  designation?: string;
  email?: string;
  phone?: string;
  status: Status;
  createdAt?: string;
}

// Payload structure needed to create or update an employee record
export type EmployeePayload = Omit<IEmployee, '_id' | 'createdAt'>;

export interface IcarryWith {
  _id: string;
  name: string;
  description: string;
  status: Status;
  createdAt?: string;
}
export type CarryWithPayload = Omit<IcarryWith, '_id' | 'createdAt'>;



export interface Ipurpose {
  _id: string;
  name: string;
  description: string;
  status: Status;
  createdAt?: string;
}
export type PurposePayload = Omit<Ipurpose, '_id' | 'createdAt'>;


export interface IvisitingArea {
  _id: string;
  name: string;
  floor: string;
  description: string;
  status: Status;
  createdAt?: string;
}
export type VisitingAreaPayload = Omit<IvisitingArea, '_id' | 'createdAt'>;



export interface IvisitorType {
  _id: string;
  name: string;
  description: string;
  status: Status;
  createdAt?: string;
}
export type VisitorTypePayload = Omit<IvisitorType, '_id' | 'createdAt'>;