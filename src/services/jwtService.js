import { config } from "../../config/config.js";
import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
    return jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expires,
    });
};

export const verifyToken = (token) => {
    return jwt.verify(token, config.jwt.secret);
}

export const decodeToken = (token) => {
    return jwt.decode(token);
}