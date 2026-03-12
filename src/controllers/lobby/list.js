import { listLobby } from "../../repositories/lobby/index.js";

export default async (req, res) => {
    // Получаем параметры из запроса
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    // Валидация
    if (page < 1 || limit < 1 || limit > 50) {
        return res.status(400).json({
            success: false,
            error: {
                message: 'Неверные параметры пагинации',
                code: 'ERR_INVALID_PARAMS'
            }
        });
    }
    const result = await listLobby(page, limit);
    
    // Форматируем минимальный вывод
    const formattedLobbies = result.lobbies.map(lobby => {
        const lobbyData = lobby.toJSON ? lobby.toJSON() : lobby;
        
        return {
            code: lobbyData.code,
            hostName: lobbyData.host?.name || 'Неизвестно',
            participantsCount: parseInt(lobbyData.participantsCount) || 0,
            maxPlayers: lobbyData.settings?.maxPlayers || 6
        };
    });
    
    // Отправляем ответ
    res.status(200).json({
        success: true,
        data: {
            lobbies: formattedLobbies,
            pagination: {
                page: result.page,
                limit: result.limit,
                total: result.total,
                totalPages: result.totalPages,
                hasNextPage: page < result.totalPages,
                hasPrevPage: page > 1
            }
        }
    });
};