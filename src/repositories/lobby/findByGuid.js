import db from '#db';

export default async(lobbyId) => {
    return await db.Lobby.findByPk(lobbyId, {
        include: [
            {
                model: db.User,
                as: 'host',
                attributes: ['guid', 'name']
            }
        ]
    });
};