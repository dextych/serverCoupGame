import db from '#db';

export default async (lobbyId, maxPlayers) => {
    const participants = await db.LobbyParticipant.findAll({
        where: { lobbyId },
        attributes: ['position'],
        order: [['position', 'ASC']]
    });
    
    const takenPositions = participants.map(p => p.position);
    
    // Ищем первую свободную позицию
    for (let i = 0; i < maxPlayers; i++) {
        if (!takenPositions.includes(i)) {
            return i;
        }
    }
    
    return null; // нет свободных мест
};