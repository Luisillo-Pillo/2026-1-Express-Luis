// Importamos DataTypes para definir el tipo de cada columna (INTEGER, STRING, etc.)
import { DataTypes } from "sequelize";
// Importamos la conexión a la base de datos
import sequelize from "../config/db.js";

// Definimos el modelo "Author" que representa la tabla "author" en la BD
const Author = sequelize.define(
  "Author", // Nombre del modelo dentro de Sequelize
  {
    // Definición de columnas:
    id: {
      type: DataTypes.INTEGER, // Tipo número entero
      autoIncrement: true, // Se incrementa solo (1, 2, 3...)
      primaryKey: true, // Es la clave primaria (identificador único)
    },
    name: {
      type: DataTypes.STRING, // Tipo texto
      allowNull: false, // No puede estar vacío (es obligatorio)
    },
  },
  {
    tableName: "author", // Nombre exacto de la tabla en MySQL
    timestamps: false, // No crear columnas createdAt / updatedAt
  },
);

// Exportamos el modelo para usarlo en controllers y relaciones
export default Author;
