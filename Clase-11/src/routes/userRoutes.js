// Importamos Router de Express para crear un grupo de rutas
import { Router } from "express";
// Importamos las funciones del controlador de usuarios
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

// Creamos una instancia del router
const router = Router();

// Definimos las rutas y qué función las maneja:
router.get("/", getUsers); // GET    /api/users      → lista todos
router.get("/:id", getUserById); // GET    /api/users/1    → obtiene uno
router.post("/", createUser); // POST   /api/users      → crea uno
router.put("/:id", updateUser); // PUT    /api/users/1    → actualiza uno
router.delete("/:id", deleteUser); // DELETE /api/users/1    → elimina uno

// Exportamos el router
export default router;
