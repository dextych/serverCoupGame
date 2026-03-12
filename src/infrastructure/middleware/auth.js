import { verifyToken } from '../../services/jwtService.js';
import { findByGuid } from '../../repositories/user/index.js';

 //Middleware для проверки JWT аутентификации
export const authMiddleware = async (req, res, next) => {
    // Получаем токен из заголовка
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: {
            message: 'Не предоставлен токен',
            code: 'ERR_UNAUTHORIZED'
        }
      });
    }
    
    // Убираем 'Bearer ' если есть
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;
    
    const decoded = verifyToken(token);
    
    // Находим пользователя в БД
    const user = await findByGuid(decoded.userId);
    
    if (!user) {
        return res.status(404).json({
            success: false,
            error: {
                message: 'Пользователь не найден',
                code: 'ERR_NOT_FOUND'
            }
        });
    }
    
    // Добавляем пользователя в запрос
    req.user = user;
    req.userId = decoded.userId;
    
    next();
};

export default authMiddleware;