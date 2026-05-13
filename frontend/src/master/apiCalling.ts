/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  queryGet,
  queryPost,
  queryPut,
  queryDelete,
} from "@/shared/services/api";
import { API_ENDPOINTS } from "@/shared/const/api";
import { type AxiosResponse } from "axios";

const unwrapData = (res: AxiosResponse<any>) => res.data?.data || res.data;


//----------------------Employee CRUD Calling---------------------------------------
export const getEmployee = () => {
  return queryGet(API_ENDPOINTS.EMPLOYEE, {}).then(
    (res) => unwrapData(res).employee || unwrapData(res),
  );
};
export const createEmployee = (payload: any) => {
  return queryPost(API_ENDPOINTS.EMPLOYEE, payload, {}).then(unwrapData);
};
export const updateEmployee = (id: string, payload: any) => {
  return queryPut(`${API_ENDPOINTS.EMPLOYEE}/${id}`, payload, {}).then(
    unwrapData,
  );
};
export const deleteEmployee = (id: string) => {
    return queryDelete(`${API_ENDPOINTS.EMPLOYEE}/${id}`,{})
    .then(unwrapData)
};



//-----------------------Purposse CRUD Calling-------------------------------------
export const getPurpose = () => {
  return queryGet(API_ENDPOINTS.PURPOSE, {}).then(
    (res) => unwrapData(res).purpose || unwrapData(res),
  );
};
export const createpurpose = (payload: any) => {
  return queryPost(API_ENDPOINTS.PURPOSE, payload, {}).then(unwrapData);
};
export const updatePurpose = (id: string, payload: any) => {
  return queryPut(`${API_ENDPOINTS.PURPOSE}/${id}`, payload, {}).then(
    unwrapData,
  );
};
export const deletePurpose = (id: string) => {
    return queryDelete(`${API_ENDPOINTS.PURPOSE}/${id}`,{})
    .then(unwrapData)
};

//----------------------Visiting Area CRUD Calling--------------------------------

export const getVisitingArea = () => {
  return queryGet(API_ENDPOINTS.VISITING_AREA, {}).then(
    (res) => unwrapData(res).visitingAreas || unwrapData(res),
  );
};
export const createVisitingArea = (payload: any) => {
  return queryPost(API_ENDPOINTS.VISITING_AREA, payload, {}).then(unwrapData);
};
export const updateVisitingArea = (id: string, payload: any) => {
  return queryPut(`${API_ENDPOINTS.VISITING_AREA}/${id}`, payload, {}).then(
    unwrapData,
  );
};
export const deleteVisitingArea = (id: string) => {
    return queryDelete(`${API_ENDPOINTS.VISITING_AREA}/${id}`,{})
    .then(unwrapData)
};

//-----------------Visitor Type CRUD Calling---------------------------------------
export const getVisitorType = () => {
  return queryGet(API_ENDPOINTS.VISITOR_TYPE, {}).then(
    (res) => unwrapData(res).visitorTypes || unwrapData(res),
  );
};
export const createVisitorType = (payload: any) => {
  return queryPost(API_ENDPOINTS.VISITOR_TYPE, payload, {}).then(unwrapData);
};
export const updateVisitorType = (id: string, payload: any) => {
  return queryPut(`${API_ENDPOINTS.VISITOR_TYPE}/${id}`, payload, {}).then(
    unwrapData,
  );
};
export const deleteVisitorType = (id: string) => {
    return queryDelete(`${API_ENDPOINTS.VISITOR_TYPE}/${id}`,{})
    .then(unwrapData)
};

//---------------------Carry With CRUD calling--------------------------------

export const getCarryWith = () => {
  return queryGet(API_ENDPOINTS.CARRY_WITH, {}).then(
    (res) => unwrapData(res).carryWithItems || unwrapData(res),
  );
};
export const createCarryWith = (payload: any) => {
  return queryPost(API_ENDPOINTS.CARRY_WITH, payload, {}).then(unwrapData);
};
export const updateCarryWith = (id: string, payload: any) => {
  return queryPut(`${API_ENDPOINTS.CARRY_WITH}/${id}`, payload, {}).then(
    unwrapData,
  );
};
export const deleteCarryWith = (id: string) => {
    return queryDelete(`${API_ENDPOINTS.CARRY_WITH}/${id}`,{})
    .then(unwrapData)
};