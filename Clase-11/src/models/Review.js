// Importamos DataTypes para definir los tipos de columna
import { DataTypes } from "sequelize";
// Importamos la conexión a la base de datos
import sequelize from "../config/db.js";

// Definimos el modelo "Review" que representa la tabla "review" en la BD
// Una reseña es un comentario que un usuario hace sobre un libro
const Review = sequelize.define(
  "Review", // Nombre del modelo
  {
    id: {
      type: DataTypes.INTEGER, // Número entero
      autoIncrement: true, // Auto-incremento
      primaryKey: true, // Clave primaria
    },
    userId: {
      type: DataTypes.INTEGER, // Referencia al usuario que escribió la reseña
      allowNull: false, // Obligatorio
    },
    bookId: {
      type: DataTypes.INTEGER, // Referencia al libro reseñado
      allowNull: false, // Obligatorio
    },
    comment: {
      type: DataTypes.STRING, // Texto del comentario
      allowNull: false, // Obligatorio
    },
  },
  {
    tableName: "review", // Nombre de la tabla en MySQL
    timestamps: false, // Sin columnas de fecha automáticas
  },
);

// Exportamos el modelo
export default Review;
