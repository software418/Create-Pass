import { Router } from "express";

import {
  // GET
  getEmployee,
  getPurpose,
  getVisitingArea,
  getCarryWith,
  getVisitorType,

  // CREATE
  createEmployee,
  createPurpose,
  createVisitingArea,
  createCarryWith,
  createVisitorType,

  // UPDATE
  updateEmployee,
  updatePurpose,
  updateVisitingArea,
  updateCarryWith,
  updateVisitorType,

  // DELETE
  deleteEmployee,
  deletePurpose,
  deleteVisitingArea,
  deleteCarryWith,
  deleteVisitorType,
} from "../master/master.controller";

const router = Router();

// ─────────────────────────────────────────────────────────────
// Employee Routes  →  /api/master/employee
// ─────────────────────────────────────────────────────────────
router.get("/employee", getEmployee);
router.post("/employee", createEmployee);
router.put("/employee/:id", updateEmployee);
router.delete("/employee/:id", deleteEmployee);

// ─────────────────────────────────────────────────────────────
// Purpose Routes  →  /api/master/purpose
// ─────────────────────────────────────────────────────────────
router.get("/purpose", getPurpose);
router.post("/purpose", createPurpose);
router.put("/purpose/:id", updatePurpose);
router.delete("/purpose/:id", deletePurpose);

// ─────────────────────────────────────────────────────────────
// Visiting Area Routes  →  /api/master/visiting-area
// ─────────────────────────────────────────────────────────────
router.get("/visiting-area", getVisitingArea);
router.post("/visiting-area", createVisitingArea);
router.put("/visiting-area/:id", updateVisitingArea);
router.delete("/visiting-area/:id", deleteVisitingArea);

// ─────────────────────────────────────────────────────────────
// Carry-With Routes  →  /api/master/carry-with
// ─────────────────────────────────────────────────────────────
router.get("/carry-with", getCarryWith);
router.post("/carry-with", createCarryWith);
router.put("/carry-with/:id", updateCarryWith);
router.delete("/carry-with/:id", deleteCarryWith);

// ─────────────────────────────────────────────────────────────
// Visitor Type Routes  →  /api/master/visitor-type
// ─────────────────────────────────────────────────────────────
router.get("/visitor-type", getVisitorType);
router.post("/visitor-type", createVisitorType);
router.put("/visitor-type/:id", updateVisitorType);
router.delete("/visitor-type/:id", deleteVisitorType);

export default router;