// Importamos el modelo Book para interactuar con la tabla "book"
import Author from "../models/Author.js";
import Book from "../models/Book.js";
import Loan from "../models/Loan.js";
import Review from "../models/Review.js";

// ============================================================
// CONTROLADORES DE LIBRO (CRUD)
// ============================================================

// GET /api/books → Obtener todos los libros
export const getBooks = async (req, res) => {
  const books = await Book.findAll({
    include: {
      model: Author,
      as: "author",
    },
  }); // Busca todos los libros
  res.json(books); // Responde con la lista en JSON
};

// GET /api/books/:id → Obtener un libro por su ID
export const getBookById = async (req, res) => {
  const book = await Book.findByPk(req.params.id, {
    include: [
      {
        model: Author,
        as: "author",
      },
      {
        model: Review,
        as: "reviews",
      },
      {
        model: Loan,
        as: "loans",
      },
    ],
  }); // Busca por clave primaria
  if (!book) return res.status(404).json({ error: "Book not found" }); // 404 si no existe
  res.json(book);
};

// POST /api/books → Crear un nuevo libro
export const createBook = async (req, res) => {
  const { name, authorId } = req.body; // Extraemos nombre y ID del autor del body
  if (!name)
    return res.status(400).json({ error: "The name of the book is required" });

  const book = await Book.create({ name, authorId }); // Crea el libro en la BD
  res.status(201).json({ message: "Book created", book }); // 201 = creado
};

// PUT /api/books/:id → Actualizar un libro existente
export const updateBook = async (req, res) => {
  const { name, authorId } = req.body; // Nuevos datos
  const book = await Book.findByPk(req.params.id); // Buscamos el libro
  if (!book) return res.status(404).json({ error: "Book not found" });
  book.name = name || book.name; // Actualiza nombre si se envió
  book.authorId = authorId || book.authorId; // Actualiza autor si se envió
  await book.save(); // Guarda cambios en la BD
  res.json({ message: "Updated book", book });
};

// DELETE /api/books/:id → Eliminar un libro
export const deleteBook = async (req, res) => {
  const book = await Book.findByPk(req.params.id); // Buscamos el libro
  if (!book) return res.status(404).json({ error: "Book not found" });

  await book.destroy(); // Elimina el registro de la BD
  res.json({ message: "Deleted book" });
};
