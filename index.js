import express from 'express';
import sequelize from './config/sequelize.js';
import { config } from './config/config.js';
import routes from './src/routes/index.js';
import { initSocket } from './src/socket/index.js';
import './src/models/index.js';
import http from 'http';

const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = initSocket(server);

app.get('/', (req, res) => {
    res.send("Hello!");
});

app.use('/api', routes);

try {
    await sequelize.authenticate();
    console.log('Есть связь с БД');
    server.listen(config.port, () => {
        console.info(`Server running: http://localhost:${config.port}`);
    });
} catch (error) {
    console.error('Server init error', error);
}
