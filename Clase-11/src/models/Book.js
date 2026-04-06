// Importamos DataTypes para definir el tipo de cada columna
import { DataTypes } from "sequelize";
// Importamos la conexión a la base de datos
import sequelize from "../config/db.js";

// Definimos el modelo "Book" que representa la tabla "book" en la BD
const Book = sequelize.define(
  "Book", // Nombre del modelo
  {
    id: {
      type: DataTypes.INTEGER, // Número entero
      autoIncrement: true, // Se incrementa automáticamente
      primaryKey: true, // Clave primaria
    },
    name: {
      type: DataTypes.STRING, // Texto (nombre del libro)
      allowNull: false, // Obligatorio
    },
    authorId: {
      type: DataTypes.INTEGER, // Número entero (referencia al autor)
      allowNull: true, // Puede estar vacío (libro sin autor asignado)
    },
  },
  {
    tableName: "book", // Nombre de la tabla en MySQL
    timestamps: false, // Sin columnas de fecha automáticas
  },
);

// Exportamos el modelo
export default Book;
