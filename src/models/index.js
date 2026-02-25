import sequelize from "../../config/sequelize.js";

const models = {

};

export async function initDb() {
    try {
        await sequelize.sync({alter: true});
        console.log('База данных инициализирована!');
    } catch (error) {
        console.error('Ошибка инициализации БД', error);
    }
};