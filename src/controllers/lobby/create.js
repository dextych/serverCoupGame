import { createLobby } from "../../repositories/lobby/index.js";
import generateLobbyCode from "../../services/lobbyCodeGenerator.js";

export default async(req, res) => {
    //const { settings } = req.body;
    const userId = req.user.guid;
    const code = generateLobbyCode();

    const lobby = await createLobby({
        hostId: userId,
        settings: {
            maxPlayers: 6,
            isPrivate: false,
          //  ...settings
        },
        code
    });

    res.status(201).json({
        success: true,
        data: lobby,
        msg: 'Лобби создано'
    });
}