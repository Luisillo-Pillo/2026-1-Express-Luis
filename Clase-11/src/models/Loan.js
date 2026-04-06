// Importamos DataTypes para definir los tipos de columna
import { DataTypes } from "sequelize";
// Importamos la conexión a la base de datos
import sequelize from "../config/db.js";

// Definimos el modelo "Loan" que representa la tabla "loan" en la BD
// Un préstamo registra que un usuario tomó prestado un libro
const Loan = sequelize.define(
  "Loan", // Nombre del modelo
  {
    id: {
      type: DataTypes.INTEGER, // Número entero
      autoIncrement: true, // Auto-incremento
      primaryKey: true, // Clave primaria
    },
    userId: {
      type: DataTypes.INTEGER, // Referencia al usuario que pide el préstamo
      allowNull: false, // Obligatorio
    },
    bookId: {
      type: DataTypes.INTEGER, // Referencia al libro prestado
      allowNull: false, // Obligatorio
    },
    startDate: {
      type: DataTypes.DATEONLY, // Solo fecha (sin hora), ej: "2026-03-05"
      allowNull: false, // Obligatorio
    },
    endDate: {
      type: DataTypes.DATEONLY, // Fecha de devolución
      allowNull: false, // Obligatorio
    },
  },
  {
    tableName: "loan", // Nombre de la tabla en MySQL
    timestamps: false, // Sin columnas de fecha automáticas
  },
);

// Exportamos el modelo
export default Loan;
