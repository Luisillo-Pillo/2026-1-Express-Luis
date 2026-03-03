import { Router } from 'express';
import { getBooks, getBookById, insertBook, updateBook, deleteBook } from '../controllers/bookController.js';

const router = Router ();

router.get("/", getBooks);

router.get("/:id", getBookById);

router.post("/", insertBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

export default router;  