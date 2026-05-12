import { CarryWith } from "./carry_with.model";
import { Employee } from "./employee.model";
import { Purpose } from "./purpose.model";
import { VisitingArea } from "./visiting_area.model";
import { VisitorType } from "./visitor_type.model";
import logger from "../../utils/logger.utils";
import AppError from "../../utils/appError";

//--------------------------------------GET Service----------------------------------------------------------------------------------------------
export const getPurpose = async () => {
  logger.info(
    `[SERVICE]{master/master.service--getPurpose} getPurpose requested`,
  );
  const purpose = await Purpose.find({ status: "active" });
  return purpose;
};

export const getEmployee = async () => {
  logger.info(
    `[SERVICE]{master/master.service--getEmployee} getEmployee requested`,
  );
  const employee = await Employee.find({ status: "active" });
  return employee;
};

export const getVisitingArea = async () => {
  logger.info(
    `[SERVICE]{master/master.service--getVisitingArea} getVisitingArea requested`,
  );
  const carrywith = await CarryWith.find({ status: "active" });
  return carrywith;
};

export const getCarryWith = async () => {
  logger.info(
    `[SERVICE]{master/master.service--getCarryWith} getCarryWith requested`,
  );
  const visitingarea = await VisitingArea.find({ status: "active" });
  return visitingarea;
};

export const getVisitorType = async () => {
  logger.info(
    `[SERVICE]{master/master.service--getVisitorType} getVisitorType requested`,
  );
  const visitortype = await VisitorType.find({ status: "active" });
  return visitortype;
};

//----------------------------------CREATE Service--------------------------------------------

export const createEmployee = async (data: Record<string, any>) => {
  logger.info(
    `[SERVICE]{master/master.service--createEmployee} createEmployee requested`,
  );
  const newEmployee = await Employee.create(data);
  return newEmployee;
};

export const createPurpose = async (data: Record<string, any>) => {
  logger.info(
    `[SERVICE]{master/master.service--createPurpose} createPurpose requested`,
  );
  const newPurpose = await Purpose.create(data);
  return newPurpose;
};

export const createCarryWithItem = async (data: Record<string, any>) => {
  logger.info(
    `[SERVICE]{master/master.service--createCarryWithItem} createCarryWithItem requested`,
  );
  const newCarryItem = await CarryWith.create(data);
  return newCarryItem;
};

export const createVisitingArea = async (data: Record<string, any>) => {
  logger.info(
    `[SERVICE]{master/master.service--createVisitingArea} createVisitingArea requested`,
  );
  const newVisitingArea = await VisitingArea.create(data);
  return newVisitingArea;
};

export const createVisitorType = async (data: Record<string, any>) => {
  logger.info(
    `[SERVICE]{master/master.service--createVisitorType} createVisitorType requested`,
  );
  const newVisitorType = await VisitorType.create(data);
  return newVisitorType;
};

//------------------------------------------UPDATE Service---------------------------------------------------------

export const updateEmployee = async (
  employeeId: String,
  data: Record<string, any>,
) => {
  logger.info(
    `[SERVICE]{master/master.service --updateEmployee} updateEmployee requested for ID: ${employeeId}`,
  );
  const exist = Employee.findById(employeeId);
  if (!exist) {
    throw new AppError("Employee not found", 404, "NOT_FOUND");
  }
  const employee =await Employee.findByIdAndUpdate(employeeId, { $set: data });
  return employee;
};
export const updatepurpose = async (
  purposeId: String,
  data: Record<string, any>,
) => {
  logger.info(
    `[SERVICE]{master/master.service --updatepurpose} updatepurpose requested for ID: ${purposeId}`,
  );
  const exist = Purpose.findById(purposeId);
  if (!exist) {
    throw new AppError("Purpose not found", 404, "NOT_FOUND");
  }
  const purpose =await Purpose.findByIdAndUpdate(purposeId, { $set: data });
  return purpose;
};
export const updateCarrywith = async (
  itemId: String,
  data: Record<string, any>,
) => {
  logger.info(
    `[SERVICE]{master/master.service --updateCarrywith} updateCarrywith requested for ID: ${itemId}`,
  );
  const exist = CarryWith.findById(itemId);
  if (!exist) {
    throw new AppError("Carry With Item not found", 404, "NOT_FOUND");
  }
  const item =await CarryWith.findByIdAndUpdate(itemId, { $set: data });
  return item;
};
export const updateVisitingArea = async (
  areaId: String,
  data: Record<string, any>,
) => {
  logger.info(
    `[SERVICE]{master/master.service --updateVisitingArea} updateVisitingArea requested for ID: ${areaId}`,
  );
  const exist = VisitingArea.findById(areaId);
  if (!exist) {
    throw new AppError("Area not found", 404, "NOT_FOUND");
  }
  const area =await VisitingArea.findByIdAndUpdate(areaId, { $set: data });
  return area;
};
export const updateVisitortype = async (
  visitorId: String,
  data: Record<string, any>,
) => {
  logger.info(
    `[SERVICE]{master/master.service --updateVisitortype} updateVisitortype requested for ID: ${visitorId}`,
  );
  const exist = await VisitorType.findById(visitorId);
  if (!exist) {
    throw new AppError("Visitor Type not found", 404, "NOT_FOUND");
  }
  const employee = VisitorType.findByIdAndUpdate(visitorId, { $set: data });
  return employee;
};

//----------------------------------------------DELETE Service-------------------------------------------------------------------------------

export const delteEmployee = async (employeeId: String) => {
  logger.info(
    `[SERVICE]{master/master.service --deleteEmployee} deleteEmployee requested for ID: ${employeeId}`,
  );
  const exist = await Employee.findById(employeeId);
  if (!exist) {
    throw new AppError("Employee not found", 404, "NOT_FOUND");
  }
  if(exist && exist.status === "deleted"){
     throw new AppError('Account is already deleted', 409, 'CONFLICT');
  }
  const employee = await Employee.findOneAndDelete({_id: employeeId})
};
