// Importamos Router de Express para crear un grupo de rutas
import { Router } from "express";
// Importamos las funciones del controlador de autores
import {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorController.js";

// Creamos una instancia del router
const router = Router();

// Definimos las rutas y qué función las maneja:
router.get("/", getAuthors); // GET    /api/authors      → lista todos
router.get("/:id", getAuthorById); // GET    /api/authors/1    → obtiene uno
router.post("/", createAuthor); // POST   /api/authors      → crea uno
router.put("/:id", updateAuthor); // PUT    /api/authors/1    → actualiza uno
router.delete("/:id", deleteAuthor); // DELETE /api/authors/1    → elimina uno

// Exportamos el router para usarlo en el index de rutas
export default router;
