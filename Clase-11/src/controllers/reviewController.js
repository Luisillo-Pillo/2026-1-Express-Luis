// Importamos el modelo Review para interactuar con la tabla "review"
import Book from "../models/Book.js";
import Review from "../models/Review.js";
import User from "../models/User.js";

// ============================================================
// CONTROLADORES DE RESEÑA (CRUD)
// ============================================================

// GET /api/reviews → Obtener todas las reseñas
export const getReviews = async (req, res) => {
  const reviews = await Review.findAll({
    include: [
      { model: User, as: "user" }, // Quien escribió la reseña
      { model: Book, as: "book" }, // Sobre qué libo
    ],
  }); // Busca todas las reseñas
  res.json(reviews); // Responde con la lista en JSON
};

// GET /api/reviews/:id → Obtener una reseña por su ID
export const getReviewById = async (req, res) => {
  const review = await Review.findByPk(req.params.id); // Busca por clave primaria
  if (!review) return res.status(404).json({ error: "Review not found" }); // 404 si no existe
  res.json(review);
};

// POST /api/reviews → Crear una nueva reseña
export const createReview = async (req, res) => {
  const { userId, bookId, comment } = req.body; // Extraemos los datos del body
  // Validamos que los campos obligatorios estén presentes
  if (!userId)
    return res
      .status(400)
      .json({ error: "The user for the review is required" });
  if (!bookId)
    return res
      .status(400)
      .json({ error: "The book for the review is required" });
  if (!comment)
    return res
      .status(400)
      .json({ error: "The comment for the review is required" });

  const review = await Review.create({ userId, bookId, comment }); // Crea la reseña en la BD
  res.status(201).json({ message: "Review created", review }); // 201 = creado
};

// PUT /api/reviews/:id → Actualizar una reseña existente
export const updateReview = async (req, res) => {
  const { userId, bookId, comment } = req.body; // Nuevos datos
  const review = await Review.findByPk(req.params.id); // Buscamos la reseña
  if (!review) return res.status(404).json({ error: "Review not found" });

  review.userId = userId || review.userId; // Actualiza usuario si se envió
  review.bookId = bookId || review.bookId; // Actualiza libro si se envió
  review.comment = comment || review.comment; // Actualiza comentario si se envió

  await review.save(); // Guarda cambios en la BD
  res.json({ message: "Updated review", review });
};

// DELETE /api/reviews/:id → Eliminar una reseña
export const deleteReview = async (req, res) => {
  const review = await Review.findByPk(req.params.id); // Buscamos la reseña
  if (!review) return res.status(404).json({ error: "Review not found" });

  await review.destroy(); // Elimina el registro de la BD
  res.json({ message: "Deleted review" });
};
