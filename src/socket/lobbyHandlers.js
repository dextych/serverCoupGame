export default function setupLobbyHandlers(io, socket) {
    
    // Подписка на обновления лобби
    socket.on('lobby:subscribe', (lobbyId) => {
        socket.join(`lobby:${lobbyId}`);
        console.log(`👤 Клиент ${socket.userId} подписался на лобби ${lobbyId}`);
        
        // Можно отправить текущее состояние
        socket.emit('lobby:subscribed', { lobbyId });
    });

    // Отписка от лобби
    socket.on('lobby:unsubscribe', (lobbyId) => {
        socket.leave(`lobby:${lobbyId}`);
        console.log(`👋 Клиент ${socket.userId} отписался от лобби ${lobbyId}`);
    });

    // Отправка сообщения в чат лобби
    socket.on('lobby:chat:message', async (data) => {
        const { lobbyId, message } = data;
        
        // Отправляем всем в лобби
        io.to(`lobby:${lobbyId}`).emit('lobby:chat:message', {
            userId: socket.userId,
            userName: socket.userName,
            message,
            timestamp: new Date()
        });
    });
}