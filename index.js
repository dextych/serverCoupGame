import express from 'express';
import sequelize from './config/sequelize.js';
import { config } from './config/config.js';
import './src/models/index.js';

const app = express();

app.get('/', (req, res) => {
    res.send("Hello!");
});

try {
    await sequelize.authenticate();
    console.log('Есть связь с БД');
    app.listen(config.port, () => {
        console.info(`Server running: http://localhost:${config.port}`);
    });
} catch (error) {
    console.error('Server init error', error);
}
