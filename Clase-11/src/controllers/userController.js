// Importamos el modelo User para interactuar con la tabla "user"
import Book from "../models/Book.js";
import Loan from "../models/Loan.js";
import Review from "../models/Review.js";
import User from "../models/User.js";

// ============================================================
// CONTROLADORES DE USUARIO (CRUD)
// ============================================================

// GET /api/users → Obtener todos los usuarios
export const getUsers = async (req, res) => {
  const users = await User.findAll(); // Busca todos los usuarios
  res.json(users); // Responde con la lista en JSON
};

// GET /api/users/:id → Obtener un usuario por su ID
export const getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Review,
        as: "reviews",
        include: {
          model: Book,
          as: "book",
        },
      },
      {
        model: Loan,
        as: "loans",
        include: {
          model: Book,
          as: "book",
        },
      },
    ],
  }); // Busca por clave primaria
  if (!user) return res.status(404).json({ error: "User not found" }); // 404 si no existe
  res.json(user);
};

// POST /api/users → Crear un nuevo usuario
export const createUser = async (req, res) => {
  const { name, age, address } = req.body; // Extraemos los datos del body
  if (!name)
    return res.status(400).json({ error: "The name of user is required" });

  const user = await User.create({ name, age, address }); // Crea el usuario en la BD
  res.status(201).json({ message: "User created", user }); // 201 = creado
};

// PUT /api/users/:id → Actualizar un usuario existente
export const updateUser = async (req, res) => {
  const { name, age, address } = req.body; // Nuevos datos
  const user = await User.findByPk(req.params.id); // Buscamos el usuario
  if (!user) return res.status(404).json({ error: "User not found" });

  user.name = name || user.name; // Actualiza nombre si se envió
  user.age = age || user.age; // Actualiza edad si se envió
  user.address = address || user.address; // Actualiza dirección si se envió

  await user.save(); // Guarda cambios en la BD
  res.json({ message: "Updated user", user });
};

// DELETE /api/users/:id → Eliminar un usuario
export const deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id); // Buscamos el usuario
  if (!user) return res.status(404).json({ error: "User not found" });

  await user.destroy(); // Elimina el registro de la BD
  res.json({ message: "Deleted user" });
};
