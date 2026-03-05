import { config } from "../../config/config.js";
import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
    return jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expires,
    });
};

export const verifyToken = (token) => {
    if(!token){   //мб не надо?
        return {
            success: false,
            error: {
                message: 'Токен не предоставлен',
                code: 'ERR_NO_TOKEN',
                status: 401
            }
        };
    }
    return jwt.verify(token, config.jwt.secret);
}

export const decodeToken = (token) => {
    return jwt.decode(token);
}