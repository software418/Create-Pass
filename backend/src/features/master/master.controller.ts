import {
  // GET
  getCarryWithService,
  getEmployeeService,
  getPurposeService,
  getVisitingAreaService,
  getVisitorTypeService,

  // CREATE
  createCarryWithItemService,
  createEmployeeService,
  createPurposeService,
  createVisitingAreaService,
  createVisitorTypeService,

  // UPDATE
  updateCarrywithService,
  updateEmployeeService,
  updateVisitingAreaService,
  updateVisitortypeService,
  updatepurposeService,

  // DELETE
  deleteCarryWithService,
  deletePurposeService,
  deleteVisitorAreaService,
  deleteVisitorTypeService,
  delteEmployeeService,
} from "../master/master.service";

import logger from "../../utils/logger.utils";
import { RequestHandler } from "express";

// ─────────────────────────────────────────────────────────────
// GET Controllers
// ─────────────────────────────────────────────────────────────

export const getEmployee: RequestHandler = async (req, res, next) => {
  try {
    logger.info(
      "[CONTROLLER]{master/master.controller} getEmployee → request received"
    );
    const employees = await getEmployeeService();
    res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      data: { employees },
    });
  } catch (err) {
    next(err);
  }
};

export const getPurpose: RequestHandler = async (req, res, next) => {
  try {
    logger.info(
      "[CONTROLLER]{master/master.controller} getPurpose → request received"
    );
    const purposes = await getPurposeService();
    res.status(200).json({
      success: true,
      message: "Purposes fetched successfully",
      data: { purposes },
    });
  } catch (err) {
    next(err);
  }
};

export const getVisitingArea: RequestHandler = async (req, res, next) => {
  try {
    logger.info(
      "[CONTROLLER]{master/master.controller} getVisitingArea → request received"
    );
    const visitingAreas = await getVisitingAreaService();
    res.status(200).json({
      success: true,
      message: "Visiting areas fetched successfully",
      data: { visitingAreas },
    });
  } catch (err) {
    next(err);
  }
};

export const getCarryWith: RequestHandler = async (req, res, next) => {
  try {
    logger.info(
      "[CONTROLLER]{master/master.controller} getCarryWith → request received"
    );
    const carryWithItems = await getCarryWithService();
    res.status(200).json({
      success: true,
      message: "Carry-with items fetched successfully",
      data: { carryWithItems },
    });
  } catch (err) {
    next(err);
  }
};

export const getVisitorType: RequestHandler = async (req, res, next) => {
  try {
    logger.info(
      "[CONTROLLER]{master/master.controller} getVisitorType → request received"
    );
    const visitorTypes = await getVisitorTypeService();
    res.status(200).json({
      success: true,
      message: "Visitor types fetched successfully",
      data: { visitorTypes },
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────
// CREATE Controllers
// ─────────────────────────────────────────────────────────────

export const createEmployee: RequestHandler = async (req, res, next) => {
  try {
    logger.info(
      "[CONTROLLER]{master/master.controller} createEmployee → request received"
    );
    const employee = await createEmployeeService(req.body);
    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: { employee },
    });
  } catch (err) {
    next(err);
  }
};

export const createPurpose: RequestHandler = async (req, res, next) => {
  try {
    logger.info(
      "[CONTROLLER]{master/master.controller} createPurpose → request received"
    );
    const purpose = await createPurposeService(req.body);
    res.status(201).json({
      success: true,
      message: "Purpose created successfully",
      data: { purpose },
    });
  } catch (err) {
    next(err);
  }
};

export const createVisitingArea: RequestHandler = async (req, res, next) => {
  try {
    logger.info(
      "[CONTROLLER]{master/master.controller} createVisitingArea → request received"
    );
    const visitingArea = await createVisitingAreaService(req.body);
    res.status(201).json({
      success: true,
      message: "Visiting area created successfully",
      data: { visitingArea },
    });
  } catch (err) {
    next(err);
  }
};

export const createCarryWith: RequestHandler = async (req, res, next) => {
  try {
    logger.info(
      "[CONTROLLER]{master/master.controller} createCarryWith → request received"
    );
    const carryWithItem = await createCarryWithItemService(req.body);
    res.status(201).json({
      success: true,
      message: "Carry-with item created successfully",
      data: { carryWithItem },
    });
  } catch (err) {
    next(err);
  }
};

export const createVisitorType: RequestHandler = async (req, res, next) => {
  try {
    logger.info(
      "[CONTROLLER]{master/master.controller} createVisitorType → request received"
    );
    const visitorType = await createVisitorTypeService(req.body);
    res.status(201).json({
      success: true,
      message: "Visitor type created successfully",
      data: { visitorType },
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────
// UPDATE Controllers
// ─────────────────────────────────────────────────────────────

export const updateEmployee: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id as string;
    logger.info(
      `[CONTROLLER]{master/master.controller} updateEmployee → request received for ID: ${id}`
    );
    const employee = await updateEmployeeService(id, req.body);
    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: { employee },
    });
  } catch (err) {
    next(err);
  }
};

export const updatePurpose: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id as string;
    logger.info(
      `[CONTROLLER]{master/master.controller} updatePurpose → request received for ID: ${id}`
    );
    const purpose = await updatepurposeService(id, req.body);
    res.status(200).json({
      success: true,
      message: "Purpose updated successfully",
      data: { purpose },
    });
  } catch (err) {
    next(err);
  }
};

export const updateVisitingArea: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id as string;
    logger.info(
      `[CONTROLLER]{master/master.controller} updateVisitingArea → request received for ID: ${id}`
    );
    const visitingArea = await updateVisitingAreaService(id, req.body);
    res.status(200).json({
      success: true,
      message: "Visiting area updated successfully",
      data: { visitingArea },
    });
  } catch (err) {
    next(err);
  }
};

export const updateCarryWith: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id as string;
    logger.info(
      `[CONTROLLER]{master/master.controller} updateCarryWith → request received for ID: ${id}`
    );
    const carryWithItem = await updateCarrywithService(id, req.body);
    res.status(200).json({
      success: true,
      message: "Carry-with item updated successfully",
      data: { carryWithItem },
    });
  } catch (err) {
    next(err);
  }
};

export const updateVisitorType: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id as string;
    logger.info(
      `[CONTROLLER]{master/master.controller} updateVisitorType → request received for ID: ${id}`
    );
    const visitorType = await updateVisitortypeService(id, req.body);
    res.status(200).json({
      success: true,
      message: "Visitor type updated successfully",
      data: { visitorType },
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────
// DELETE Controllers
// ─────────────────────────────────────────────────────────────

export const deleteEmployee: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id as string;
    logger.info(
      `[CONTROLLER]{master/master.controller} deleteEmployee → request received for ID: ${id}`
    );
    const employee = await delteEmployeeService(id);
    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      data: { employee },
    });
  } catch (err) {
    next(err);
  }
};

export const deletePurpose: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id as string;
    logger.info(
      `[CONTROLLER]{master/master.controller} deletePurpose → request received for ID: ${id}`
    );
    const purpose = await deletePurposeService(id);
    res.status(200).json({
      success: true,
      message: "Purpose deleted successfully",
      data: { purpose },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteVisitingArea: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id as string;
    logger.info(
      `[CONTROLLER]{master/master.controller} deleteVisitingArea → request received for ID: ${id}`
    );
    const visitingArea = await deleteVisitorAreaService(id);
    res.status(200).json({
      success: true,
      message: "Visiting area deleted successfully",
      data: { visitingArea },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCarryWith: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id as string;
    logger.info(
      `[CONTROLLER]{master/master.controller} deleteCarryWith → request received for ID: ${id}`
    );
    const carryWithItem = await deleteCarryWithService(id);
    res.status(200).json({
      success: true,
      message: "Carry-with item deleted successfully",
      data: { carryWithItem },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteVisitorType: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id as string;
    logger.info(
      `[CONTROLLER]{master/master.controller} deleteVisitorType → request received for ID: ${id}`
    );
    const visitorType = await deleteVisitorTypeService(id);
    res.status(200).json({
      success: true,
      message: "Visitor type deleted successfully",
      data: { visitorType },
    });
  } catch (err) {
    next(err);
  }
};