import { comparePassword } from '../../services/passwordHelper.js';
import { findByName } from '../../repositories/user/index.js';
import { generateToken } from '../../services/jwtService.js';

export default async(req, res) => {
    const { name, password } = req.body;

    if(!name || !password){
        return res.status(400).json({
            success: false,
            error: {
                message: 'Заполните обязательные поля',
                code: 'ERR_VALID'
            }
        });
    }

    const user = await findByName(name, { raw: true });
    if(!user){
        return res.status(400).json({
            success: false,
            error: {
                message: 'Пользователь не найден',
                code: 'ERR_NOT_FOUND'
            }
        });
    }

    const isPasswordValid = comparePassword(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            success: false,
            error: {
                message: 'Неверный пароль',
                code: 'INVALID_PASS'
            }
        });
    }
    const tokenPayload = {
        userId: user.guid,
        name: user.name,
        email: user.email
    }
    const token = generateToken(tokenPayload);

    res.json({
        success: true,
        message: 'Вход выполнен',
        data: {
            user,
            token,
            tokenType: 'Bearer'
        }
    });
};