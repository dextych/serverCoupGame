import { joinLobbyByCode } from '../../repositories/lobbyParticipant/index.js';
import { getIo } from '../../socket/index.js';

export default async(req, res) => {
    const { code } = req.params;
    const userId = req.user.guid;
    if (!code) {
        return res.status(400).json({
            success: false,
            error: {
                message: 'Код лобби не указан',
                code: 'ERR_NO_CODE'
            }
        });
    }

    const result = await joinLobbyByCode(code, userId);
    if (!result.success) {
        return res.status(404).json({
            success: false,
            error: {
                message: 'Лобби не найдено',
                code: 'ERR_LOBBY_NOT_FOUND'
            }
        });
    }
    const io = getIo();
    // Отправляем событие всем в комнате лобби
    io.to(`lobby:${result.lobby.guid}`).emit('lobby:player:joined', {
        lobbyId: result.lobby.guid,
        newPlayer: {
            guid: userId,
            name: req.user.name // из middleware
        },
        allPlayers: result.lobby.participants,
        message: `Игрок ${req.user.name} присоединился к лобби`
    });

    // Успешный ответ
    res.status(200).json({
        success: true,
        data: {
            lobby: {
                guid: result.lobby.guid,
                code: result.lobby.code,
                host: result.lobby.host,
                participants: result.lobby.participants,
                settings: result.lobby.settings
            }
        },
        message: 'Вы успешно присоединились к лобби'
    });
}