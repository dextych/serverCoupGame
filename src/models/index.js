import sequelize from '../../config/sequelize.js';
import User from './user.model.js';

const models = {
    User
};

async function initDb() {
    try {
        await sequelize.sync({alter: true});
        console.log('База данных инициализирована!');
    } catch (error) {
        console.error('Ошибка инициализации БД', error);
    }
};

export {
    initDb,
    User
}