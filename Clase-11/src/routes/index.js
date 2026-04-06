// Importamos Router de Express
import { Router } from "express";

// Importamos cada archivo de rutas individual
import authorRoutes from "./authorRoutes.js";
import bookRoutes from "./bookRoutes.js";
import loanRoutes from "./loanRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import userRoutes from "./userRoutes.js";

// Creamos el router principal que agrupa todas las rutas
const router = Router();

// Montamos cada grupo de rutas bajo su prefijo:
// Cuando alguien visita /api/authors, Express usa authorRoutes
router.use("/authors", authorRoutes); // /api/authors/*
router.use("/books", bookRoutes); // /api/books/*
router.use("/loans", loanRoutes); // /api/loans/*
router.use("/reviews", reviewRoutes); // /api/reviews/*
router.use("/users", userRoutes); // /api/users/*

// Exportamos el router principal para usarlo en server.js
export default router;
