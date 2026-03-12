import db from '#db';

export default async(lobbyData, options) => {
    const lobby = await db.Lobby.create(lobbyData, options);

    await db.LobbyParticipant.create({
        lobbyId: lobby.guid,
        userId: lobby.hostId,
        position: 0
    });

    return await db.Lobby.findByPk(lobby.guid, {
        include: ['participants']
    });
}