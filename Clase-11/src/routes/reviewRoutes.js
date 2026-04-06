// Importamos Router de Express para crear un grupo de rutas
import { Router } from "express";
// Importamos las funciones del controlador de reseñas
import {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

// Creamos una instancia del router
const router = Router();

// Definimos las rutas y qué función las maneja:
router.get("/", getReviews); // GET    /api/reviews      → lista todas
router.get("/:id", getReviewById); // GET    /api/reviews/1    → obtiene una
router.post("/", createReview); // POST   /api/reviews      → crea una
router.put("/:id", updateReview); // PUT    /api/reviews/1    → actualiza una
router.delete("/:id", deleteReview); // DELETE /api/reviews/1    → elimina una

// Exportamos el router
export default router;
