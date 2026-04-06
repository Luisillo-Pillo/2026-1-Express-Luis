// Importamos Router de Express para crear un grupo de rutas
import { Router } from "express";
// Importamos las funciones del controlador de libros
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

// Creamos una instancia del router
const router = Router();

// Definimos las rutas y qué función las maneja:
router.get("/", getBooks); // GET    /api/books      → lista todos
router.get("/:id", getBookById); // GET    /api/books/1    → obtiene uno
router.post("/", createBook); // POST   /api/books      → crea uno
router.put("/:id", updateBook); // PUT    /api/books/1    → actualiza uno
router.delete("/:id", deleteBook); // DELETE /api/books/1    → elimina uno

// Exportamos el router
export default router;
