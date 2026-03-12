import express from 'express';
import authRoute from './auth.js';
import lobbyRoute from './lobby.js';
import authMiddleware from '../infrastructure/middleware/auth.js';

const router = express.Router();

const registerRoutes = (routes) => {
    routes.forEach(route => {
        const { path, verb, handler, authedOnly } = route;
        if(authedOnly){
            router[verb](path, authMiddleware, handler);
        } else {
            router[verb](path, handler);
        }
    });
};

registerRoutes(authRoute);
registerRoutes(lobbyRoute);

export default router;