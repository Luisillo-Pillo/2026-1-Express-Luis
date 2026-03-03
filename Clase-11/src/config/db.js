import { Sequelize } from "sequelize";

const sequelize = new Sequelize("biblioteca", "root", "Fernandito130508", {
    host: localhost,
    dialect: "mysql"
});

export default sequelize;