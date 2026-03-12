import register from '../controllers/auth/register.js';
import login from '../controllers/auth/login.js';

export default [
    {
        path: '/auth/registration',
        verb: 'post',
        handler: register,
        authedOnly: false,
    },
    {
        path: '/auth/login',
        verb: 'post',
        handler: login,
        authedOnly: false,
    },
];