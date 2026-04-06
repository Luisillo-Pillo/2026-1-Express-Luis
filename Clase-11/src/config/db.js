// Importamos la clase Sequelize del paquete "sequelize"
// Sequelize es un ORM (Object-Relational Mapping) que nos permite
// interactuar con la base de datos usando JavaScript en lugar de SQL
import { Sequelize } from "sequelize";

// Creamos una nueva conexión a la base de datos
// Parámetros:
//   1. "biblioteca" → nombre de la base de datos en MySQL
//   2. "userTest"    → nombre de usuario de MySQL
//   3. "Password123" → contraseña del usuario
const sequelize = new Sequelize("biblioteca", "userTest", "Password123", {
  host: "localhost", // Dirección del servidor de MySQL (localhost = tu computadora)
  dialect: "mysql", // Tipo de base de datos que estamos usando
});

// Exportamos la conexión para usarla en otros archivos
export default sequelize;
