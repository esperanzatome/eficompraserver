const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
    const ioOptions = {
      
        transports: ['websocket'], 
        
        cors: {
            origin: function (origin, callback) {
                const allowedOrigins = [
                    'http://localhost:3000',
                    'https://eficompra.vercel.app'
                ];

                if (!origin || allowedOrigins.indexOf(origin) !== -1 || origin.includes('eficompra.vercel.app')) {
                    callback(null, true);
                } else {
                    callback(new Error('Bloqueado por la política de CORS de Socket.io'));
                }
            },
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true 
        }
    };

    io = new Server(server, ioOptions); 

    io.on('connection', (socket) => {
        console.log(`Un usuario se ha conectado. ID: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`Un usuario se ha desconectado. ID: ${socket.id}`);
        });
    });
};

const getSocket = () => {
    if (!io) {
        throw new Error("Socket not initialized");
    }
    return io;
};

module.exports = { initSocket, getSocket };
