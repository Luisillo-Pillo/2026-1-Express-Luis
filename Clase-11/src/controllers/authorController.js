// Importamos el modelo Author para interactuar con la tabla "author"
import Author from "../models/Author.js";
import Book from "../models/Book.js";

// ============================================================
// CONTROLADORES DE AUTOR (CRUD)
// Cada función maneja una operación sobre la tabla de autores.
// req = lo que el cliente envía (datos, parámetros de URL)
// res = lo que el servidor responde (JSON, código de estado)
// ============================================================

// GET /api/authors → Obtener todos los autores
export const getAuthors = async (req, res) => {
  const authors = await Author.findAll({
    include: {
      model: Book,
      as: "books", // usa el alias definido en index.js
    },
  }); // Busca todos los registros en la tabla
  res.json(authors); // Responde con la lista en formato JSON
};

// GET /api/authors/:id → Obtener un autor por su ID
export const getAuthorById = async (req, res) => {
  const author = await Author.findByPk(req.params.id, {
    include: {
      model: Book,
      as: "books", // usa el alias definido en index.js
    },
  }); // Busca por clave primaria (PK)
  if (!author) return res.status(404).json({ error: "Author not found" }); // Si no existe, error 404
  res.json(author); // Si existe, lo devuelve
};

// POST /api/authors → Crear un nuevo autor
export const createAuthor = async (req, res) => {
  const { name } = req.body; // Extraemos "name" del cuerpo de la petición
  if (!name)
    return res
      .status(400) // Error 400 = petición incorrecta
      .json({ error: "The name of the author is required" });

  const author = await Author.create({ name }); // Crea el registro en la BD
  res.status(201).json({ message: "Author created", author }); // 201 = creado exitosamente
};

// PUT /api/authors/:id → Actualizar un autor existente
export const updateAuthor = async (req, res) => {
  const { name } = req.body; // Nuevos datos enviados por el cliente
  const author = await Author.findByPk(req.params.id); // Buscamos el autor
  if (!author) return res.status(404).json({ error: "Author not found" });
  author.name = name || author.name; // Si se envió name lo actualiza, si no mantiene el anterior
  await author.save(); // Guarda los cambios en la BD
  res.json({ message: "Updated author", author });
};

// DELETE /api/authors/:id → Eliminar un autor
export const deleteAuthor = async (req, res) => {
  const author = await Author.findByPk(req.params.id); // Buscamos el autor
  if (!author) return res.status(404).json({ error: "Author not found" });

  await author.destroy(); // Elimina el registro de la BD
  res.json({ message: "Deleted author" });
};
