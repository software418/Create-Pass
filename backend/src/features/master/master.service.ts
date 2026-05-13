import { CarryWith } from "./carry_with.model";
import { Employee } from "./employee.model";
import { Purpose } from "./purpose.model";
import { VisitingArea } from "./visiting_area.model";
import { VisitorType } from "./visitor_type.model";
import { STATUS as CarryStatus } from "./carry_with.model";
import { STATUS as EmployeeStatus } from "./employee.model";
import { STATUS as PurposeStatus } from "./purpose.model";
import { STATUS as AreaStatus } from "./visiting_area.model";
import { STATUS as VisitorStatus } from "./visitor_type.model";

import logger from "../../utils/logger.utils";
import AppError from "../../utils/appError";

// ─────────────────────────────────────────────────────────────
// GET Services
// ─────────────────────────────────────────────────────────────

export const getPurposeService = async () => {
  logger.info(
    `[SERVICE]{master/master.service--getPurpose} getPurpose requested`
  );
  const purpose = await Purpose.find({ status: "active" });
  return purpose;
};

export const getEmployeeService = async () => {
  logger.info(
    `[SERVICE]{master/master.service--getEmployee} getEmployee requested`
  );
  const employee = await Employee.find({ status: "active" });
  return employee;
};

// BUG FIX: was querying CarryWith instead of VisitingArea
export const getVisitingAreaService = async () => {
  logger.info(
    `[SERVICE]{master/master.service--getVisitingArea} getVisitingArea requested`
  );
  const visitingArea = await VisitingArea.find({ status: "active" });
  return visitingArea;
};

// BUG FIX: was querying VisitingArea instead of CarryWith
export const getCarryWithService = async () => {
  logger.info(
    `[SERVICE]{master/master.service--getCarryWith} getCarryWith requested`
  );
  const carryWith = await CarryWith.find({ status: "active" });
  return carryWith;
};

export const getVisitorTypeService = async () => {
  logger.info(
    `[SERVICE]{master/master.service--getVisitorType} getVisitorType requested`
  );
  const visitorType = await VisitorType.find({ status: "active" });
  return visitorType;
};

// ─────────────────────────────────────────────────────────────
// CREATE Services
// ─────────────────────────────────────────────────────────────

export const createEmployeeService = async (data: Record<string, any>) => {
  logger.info(
    `[SERVICE]{master/master.service--createEmployee} createEmployee requested`
  );
  const newEmployee = await Employee.create({
    ...data,
    status: EmployeeStatus.ACTIVE,
  });
  return newEmployee;
};

export const createPurposeService = async (data: Record<string, any>) => {
  logger.info(
    `[SERVICE]{master/master.service--createPurpose} createPurpose requested`
  );
  const newPurpose = await Purpose.create({
    ...data,
    status: PurposeStatus.ACTIVE,
  });
  return newPurpose;
};

export const createCarryWithItemService = async (data: Record<string, any>) => {
  logger.info(
    `[SERVICE]{master/master.service--createCarryWithItem} createCarryWithItem requested`
  );
  const newCarryItem = await CarryWith.create({
    ...data,
    status: CarryStatus.ACTIVE,
  });
  return newCarryItem;
};

export const createVisitingAreaService = async (data: Record<string, any>) => {
  logger.info(
    `[SERVICE]{master/master.service--createVisitingArea} createVisitingArea requested`
  );
  const newVisitingArea = await VisitingArea.create({
    ...data,
    status: AreaStatus.ACTIVE,
  });
  return newVisitingArea;
};

export const createVisitorTypeService = async (data: Record<string, any>) => {
  logger.info(
    `[SERVICE]{master/master.service--createVisitorType} createVisitorType requested`
  );
  const newVisitorType = await VisitorType.create({
    ...data,
    status: VisitorStatus.ACTIVE,
  });
  return newVisitorType;
};

// ─────────────────────────────────────────────────────────────
// UPDATE Services
// ─────────────────────────────────────────────────────────────

export const updateEmployeeService = async (
  employeeId: string,
  data: Record<string, any>
) => {
  logger.info(
    `[SERVICE]{master/master.service--updateEmployee} updateEmployee requested for ID: ${employeeId}`
  );
  // BUG FIX: was missing await, so the existence check never actually executed
  const exist = await Employee.findById(employeeId);
  if (!exist) {
    throw new AppError("Employee not found", 404, "NOT_FOUND");
  }
  const employee = await Employee.findByIdAndUpdate(
    employeeId,
    { $set: data },
    { new: true }
  );
  return employee;
};

export const updatepurposeService = async (
  purposeId: string,
  data: Record<string, any>
) => {
  logger.info(
    `[SERVICE]{master/master.service--updatePurpose} updatePurpose requested for ID: ${purposeId}`
  );
  // BUG FIX: was missing await, so the existence check never actually executed
  const exist = await Purpose.findById(purposeId);
  if (!exist) {
    throw new AppError("Purpose not found", 404, "NOT_FOUND");
  }
  const purpose = await Purpose.findByIdAndUpdate(
    purposeId,
    { $set: data },
    { new: true }
  );
  return purpose;
};

export const updateCarrywithService = async (
  itemId: string,
  data: Record<string, any>
) => {
  logger.info(
    `[SERVICE]{master/master.service--updateCarryWith} updateCarryWith requested for ID: ${itemId}`
  );
  // BUG FIX: was missing await, so the existence check never actually executed
  const exist = await CarryWith.findById(itemId);
  if (!exist) {
    throw new AppError("Carry With item not found", 404, "NOT_FOUND");
  }
  const item = await CarryWith.findByIdAndUpdate(
    itemId,
    { $set: data },
    { new: true }
  );
  return item;
};

export const updateVisitingAreaService = async (
  areaId: string,
  data: Record<string, any>
) => {
  logger.info(
    `[SERVICE]{master/master.service--updateVisitingArea} updateVisitingArea requested for ID: ${areaId}`
  );
  // BUG FIX: was missing await, so the existence check never actually executed
  const exist = await VisitingArea.findById(areaId);
  if (!exist) {
    throw new AppError("Visiting area not found", 404, "NOT_FOUND");
  }
  const area = await VisitingArea.findByIdAndUpdate(
    areaId,
    { $set: data },
    { new: true }
  );
  return area;
};

export const updateVisitortypeService = async (
  visitorId: string,
  data: Record<string, any>
) => {
  logger.info(
    `[SERVICE]{master/master.service--updateVisitorType} updateVisitorType requested for ID: ${visitorId}`
  );
  const exist = await VisitorType.findById(visitorId);
  if (!exist) {
    throw new AppError("Visitor type not found", 404, "NOT_FOUND");
  }
  // BUG FIX: was missing await, so the updated document was never returned
  const visitorType = await VisitorType.findByIdAndUpdate(
    visitorId,
    { $set: data },
    { new: true }
  );
  return visitorType;
};

// ─────────────────────────────────────────────────────────────
// DELETE Services
// ─────────────────────────────────────────────────────────────

export const delteEmployeeService = async (employeeId: string) => {
  logger.info(
    `[SERVICE]{master/master.service--deleteEmployee} deleteEmployee requested for ID: ${employeeId}`
  );
  const exist = await Employee.findById(employeeId);
  if (!exist) {
    throw new AppError("Employee not found", 404, "NOT_FOUND");
  }
  if (exist.status === "deleted") {
    throw new AppError("Employee is already deleted", 409, "CONFLICT");
  }
  const employee = await Employee.findOneAndDelete({ _id: employeeId });
  return employee;
};

export const deletePurposeService = async (purposeId: string) => {
  logger.info(
    `[SERVICE]{master/master.service--deletePurpose} deletePurpose requested for ID: ${purposeId}`
  );
  const exist = await Purpose.findById(purposeId);
  if (!exist) {
    throw new AppError("Purpose not found", 404, "NOT_FOUND");
  }
  if (exist.status === "deleted") {
    throw new AppError("Purpose is already deleted", 409, "CONFLICT");
  }
  const purpose = await Purpose.findOneAndDelete({ _id: purposeId });
  return purpose;
};

export const deleteCarryWithService = async (itemId: string) => {
  logger.info(
    `[SERVICE]{master/master.service--deleteCarryWith} deleteCarryWith requested for ID: ${itemId}`
  );
  const exist = await CarryWith.findById(itemId);
  if (!exist) {
    throw new AppError("Carry-with item not found", 404, "NOT_FOUND");
  }
  if (exist.status === "deleted") {
    throw new AppError("Carry-with item is already deleted", 409, "CONFLICT");
  }
  const carryWith = await CarryWith.findOneAndDelete({ _id: itemId });
  return carryWith;
};

export const deleteVisitorAreaService = async (areaId: string) => {
  logger.info(
    `[SERVICE]{master/master.service--deleteVisitingArea} deleteVisitingArea requested for ID: ${areaId}`
  );
  // BUG FIX: error message said "Employee not found" instead of "Visiting area not found"
  const exist = await VisitingArea.findById(areaId);
  if (!exist) {
    throw new AppError("Visiting area not found", 404, "NOT_FOUND");
  }
  // BUG FIX: error message said "Account is already deleted" instead of entity-specific message
  if (exist.status === "deleted") {
    throw new AppError("Visiting area is already deleted", 409, "CONFLICT");
  }
  const area = await VisitingArea.findOneAndDelete({ _id: areaId });
  return area;
};

export const deleteVisitorTypeService = async (visitorId: string) => {
  logger.info(
    `[SERVICE]{master/master.service--deleteVisitorType} deleteVisitorType requested for ID: ${visitorId}`
  );
  // BUG FIX: error message said "Employee not found" instead of "Visitor type not found"
  const exist = await VisitorType.findById(visitorId);
  if (!exist) {
    throw new AppError("Visitor type not found", 404, "NOT_FOUND");
  }
  // BUG FIX: error message said "Account is already deleted" instead of entity-specific message
  if (exist.status === "deleted") {
    throw new AppError("Visitor type is already deleted", 409, "CONFLICT");
  }
  const visitor = await VisitorType.findOneAndDelete({ _id: visitorId });
  return visitor;
};