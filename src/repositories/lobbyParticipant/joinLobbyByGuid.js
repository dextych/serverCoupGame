import db from '#db';
import { findByGuid, canJoinLobby, findFreePosition, getLobby } from '../lobby/index.js';

export default async (lobbyId, userId) => {
    const lobby = await findByGuid(lobbyId);

    const check = await canJoinLobby(lobby, userId);
    if (!check.can) {
        return { error: check.reason };
    }

    const maxPlayers = lobby.maxPlayers || 6;
    const position = await findFreePosition(lobby.guid, maxPlayers);
    if(position === null) {
        return { success: false, reason: 'NO_FREE_POS'};
    }

    await db.LobbyParticipant.create({
        lobbyId: lobby.guid,
        userId,
        position
    });
    const updatedLobby = await getLobby(lobby.guid);

    return { success: true, lobby: updatedLobby };
};