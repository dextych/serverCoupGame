import db from '#db';

export default async(code, options) => {
    return await db.Lobby.findOne({
        where: {code},
        ...options
    });
};