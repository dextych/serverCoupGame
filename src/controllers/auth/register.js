import { create, findByName } from "../../repositories/user/index.js";
import { generateToken } from "../../services/jwtService.js";
import { hashPassword } from "../../services/passwordHelper.js";

export default async(req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            success: false,
            error: {
                message: 'Заполните обязательные поля',
                code: 'VALID_ERR'
            }
        });
    }
    const existingUser = await findByName(name);
    if(existingUser){
        return res.status(409).json({
            success: false,
            error: {
                message: 'Пользователь с таким ником уже есть',
                code: 'ERR_NAME_EXIST'
            }
        });
    }

    const hashPass = await hashPassword(password);
    const User = await create({
        name,
        email,
        password: hashPass
    });
    
    const tokenPayload = {
        userId: User.guid,
        name: User.name,
        email: User.email
    }
    const token = generateToken(tokenPayload);

    res.status(201).json({
        success: true,
        message: 'Пользователь создан',
        data: {
            user: User,
            token,
            tokenType: 'Bearer'
        }
    });
}