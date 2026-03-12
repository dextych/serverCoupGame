import { Server } from 'socket.io';
import { verifyToken } from '../services/jwtService.js';
import setupLobbyHandlers from './lobbyHandlers.js';
import { config } from '../../config/config.js';

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: config.client,
            credentials: true
        }
    });

    // Middleware для аутентификации
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error('Authentication error'));
            }

            const decoded = verifyToken(token);
            socket.userId = decoded.userId;
            socket.userName = decoded.name;
            
            next();
        } catch (error) {
            next(new Error('Authentication error'));
        }
    });

    // Обработка подключений
    io.on('connection', (socket) => {
        console.log(`🔌 Новое сокет-соединение: ${socket.id} (User: ${socket.userId})`);

        // Подключаем обработчики лобби
        setupLobbyHandlers(io, socket);

        // Отключение
        socket.on('disconnect', () => {
            console.log(`❌ Сокет отключен: ${socket.id}`);
        });
    });

    return io;
};

export const getIo = () => {
    if (!io) {
        throw new Error('Socket.io не инициализирован');
    }
    return io;
};