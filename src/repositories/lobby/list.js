import db from '#db';

export default async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    
    const { count, rows } = await db.Lobby.findAndCountAll({
        where: { status: 'waiting' },
        order: [['createdAt', 'DESC']],
        offset,
        limit,
        include: [
            {
                model: db.User,
                as: 'host',
                attributes: ['name']
            },
            {
                model: db.User,
                as: 'participants',
                attributes: [], // не нужны сами участники
                through: { attributes: [] }
            }
        ],
        // Добавляем вычисляемые поля
        attributes: {
            include: [
                [
                    db.Sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM "LobbyParticipants" AS participants
                        WHERE participants."lobbyId" = "Lobby"."guid"
                    )`),
                    'participantsCount'
                ]
            ]
        },
        // Преобразуем в plain объекты
        raw: false,
        nest: true
    });

    return {
        lobbies: rows,
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit)
    };
};