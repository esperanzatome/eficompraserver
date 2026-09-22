const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
    // Configuración de CORS
    const ioOptions = {
        cors: {
            origin: ['http://localhost:3000','https://eficompra.vercel.app/'], // Permitir el origen de tu cliente
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true // Permitir el uso de cookies o encabezados de autorización
        }
    };

    io = new Server(server, ioOptions); // Pasar las opciones de CORS al crear el servidor

    io.on('connection', (socket) => {
        console.log('Un usuario se ha conectado');

        socket.on('disconnect', () => {
            console.log('Un usuario se ha desconectado');
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

