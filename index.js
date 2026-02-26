import express from 'express';
import { config } from './config/config.js';
import { initDb } from './src/models/index.js';

const app = express();

app.get('/', (req, res) => {
    res.send("Hello!");
});

try {
    initDb();
    app.listen(config.port, () => {
        console.info(`Server running: http://localhost:${config.port}`);
    });
} catch (error) {
    console.error('Server inir error', error);
}
