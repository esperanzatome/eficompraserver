const { Server } = require("socket.io");

let io;
/*
const initSocket = (server) => {
    // Configuración de CORS
    const ioOptions = {
        cors: {
            origin: ['http://localhost:3000','https://eficompra.vercel.app'], // Permitir el origen de tu cliente
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
*/




const initSocket = (server) => {

    const ioOptions = {
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

        // Aquí puedes agregar tus emisores globales o lógica personalizada si la necesitas

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

