// Importamos el modelo Loan para interactuar con la tabla "loan"
import Book from "../models/Book.js";
import Loan from "../models/Loan.js";
import User from "../models/User.js";

// ============================================================
// CONTROLADORES DE PRÉSTAMO (CRUD)
// ============================================================

// GET /api/loans → Obtener todos los préstamos
export const getLoans = async (req, res) => {
  const loans = await Loan.findAll(); // Busca todos los préstamos
  res.json(loans); // Responde con la lista en JSON
};

// GET /api/loans/:id → Obtener un préstamo por su ID
export const getLoanById = async (req, res) => {
  const loan = await Loan.findByPk(req.params.id, {
    include: [
      { model: User, as: "user" },
      { model: Book, as: "book" },
    ],
  }); // Busca por clave primaria
  if (!loan) return res.status(404).json({ error: "Loan not found" }); // 404 si no existe
  res.json(loan);
};

// POST /api/loans → Crear un nuevo préstamo
export const createLoan = async (req, res) => {
  const { userId, bookId, startDate, endDate } = req.body; // Extraemos los datos del body
  // Validamos que los campos obligatorios estén presentes
  if (!userId)
    return res.status(400).json({ error: "The user for the loan is required" });
  if (!bookId)
    return res.status(400).json({ error: "The book for the loan is required" });
  if (!startDate)
    return res
      .status(400)
      .json({ error: "The start date for the loan is required" });
  if (!endDate)
    return res
      .status(400)
      .json({ error: "The end date for the loan is required" });

  const loan = await Loan.create({ userId, bookId, startDate, endDate }); // Crea el préstamo en la BD
  res.status(201).json({ message: "Loan created", loan }); // 201 = creado
};

// PUT /api/loans/:id → Actualizar un préstamo existente
export const updateLoan = async (req, res) => {
  const { userId, bookId, startDate, endDate } = req.body; // Nuevos datos
  const loan = await Loan.findByPk(req.params.id); // Buscamos el préstamo
  if (!loan) return res.status(404).json({ error: "Loan not found" });

  loan.userId = userId || loan.userId; // Actualiza usuario si se envió
  loan.bookId = bookId || loan.bookId; // Actualiza libro si se envió
  loan.startDate = startDate || loan.startDate; // Actualiza fecha inicio si se envió
  loan.endDate = endDate || loan.endDate; // Actualiza fecha fin si se envió

  await loan.save(); // Guarda cambios en la BD
  res.json({ message: "Updated loan", loan });
};

// DELETE /api/loans/:id → Eliminar un préstamo
export const deleteLoan = async (req, res) => {
  const loan = await Loan.findByPk(req.params.id); // Buscamos el préstamo
  if (!loan) return res.status(404).json({ error: "Loan not found" });

  await loan.destroy(); // Elimina el registro de la BD
  res.json({ message: "Deleted loan" });
};
