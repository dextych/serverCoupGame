import db from '#db';

export default async (lobby, userId) => {
    // Проверка статуса
    if (lobby.status !== 'waiting') {
        return { can: false, reason: 'GAME_STARTED' };
    }
    
    // Проверка, не в лобби ли уже
    const existingParticipant = await db.LobbyParticipant.findOne({
        where: { lobbyId: lobby.guid, userId }
    });
    
    if (existingParticipant) {
        return { can: false, reason: 'ALREADY_IN_LOBBY' };
    }
    
    // Проверка количества участников
    const countParticipant = await db.LobbyParticipant.count({
        where: { lobbyId: lobby.guid }
    });
    
    const maxPlayers = lobby.settings?.maxPlayers || 6;
    if (countParticipant >= maxPlayers) {
        return { can: false, reason: 'LOBBY_FULL' };
    }
    
    return { can: true };
};