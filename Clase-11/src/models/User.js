// Importamos DataTypes para definir los tipos de columna
import { DataTypes } from "sequelize";
// Importamos la conexión a la base de datos
import sequelize from "../config/db.js";

// Definimos el modelo "User" que representa la tabla "user" en la BD
const User = sequelize.define(
  "User", // Nombre del modelo
  {
    id: {
      type: DataTypes.INTEGER, // Número entero
      autoIncrement: true, // Auto-incremento
      primaryKey: true, // Clave primaria
    },
    name: {
      type: DataTypes.STRING, // Texto (nombre del usuario)
      allowNull: false, // Obligatorio
    },
    age: {
      type: DataTypes.INTEGER, // Número entero (edad)
      allowNull: true, // Opcional
    },
    address: {
      type: DataTypes.STRING, // Texto (dirección)
      allowNull: true, // Opcional
    },
  },
  {
    tableName: "user", // Nombre de la tabla en MySQL
    timestamps: false, // Sin columnas de fecha automáticas
  },
);

// Exportamos el modelo
export default User;
