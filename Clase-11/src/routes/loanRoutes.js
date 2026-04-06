// Importamos Router de Express para crear un grupo de rutas
import { Router } from "express";
// Importamos las funciones del controlador de préstamos
import {
  getLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan,
} from "../controllers/loanController.js";

// Creamos una instancia del router
const router = Router();

// Definimos las rutas y qué función las maneja:
router.get("/", getLoans); // GET    /api/loans      → lista todos
router.get("/:id", getLoanById); // GET    /api/loans/1    → obtiene uno
router.post("/", createLoan); // POST   /api/loans      → crea uno
router.put("/:id", updateLoan); // PUT    /api/loans/1    → actualiza uno
router.delete("/:id", deleteLoan); // DELETE /api/loans/1    → elimina uno

// Exportamos el router
export default router;
