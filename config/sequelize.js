import { Sequelize } from "sequelize";
import { config } from "./config.js";

const sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    {
        host: config.db.host,
        port: config.db.port,
        dialect: config.db.dialect,
        logging: false,
        pool: {
            max: 10,
            min: 2,
            acquire: 60000,
            idle: 10000,
        },
        define: {
        timestamps: true,
        underscored: false,
        freezeTableName: true
        }
    }
);

export default sequelize;