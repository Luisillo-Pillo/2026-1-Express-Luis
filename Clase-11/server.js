import express from "express";
import routes from './src/routes/index.js';
import sequelize from "./src/config/db.js";
import colors from 'colors';

const app = express();

const PORT = 3001;

app.use(express.json());
app.use("/api", routes);a

sequelize.authenticate().then(() => console.log("MySql Connection is successfully".bgBlue)).catch((err) => console.error(err));

app.listen(PORT, () => {
    console.log("Server running".bgBlue);
});