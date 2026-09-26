const express = require("express");
const cors= require("cors");
const path = require("path");
const http = require("http");
const PORT = process.env.PORT || 10000;
const app = express();
const { initSocket } = require('./socket'); 

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const server = http.createServer(app);
initSocket(server); 

app.use(require('./routes/palabrasLista'));
app.use(require('./routes/productosDeSupermercados'));
app.use(require('./routes/hacerCompra'));
app.use(require('./routes/miListaCompra'));
app.use(require('./routes/registro'));
app.use(require('./routes/login'));
app.use(require('./routes/misListasDeLaCompra'));
app.use(require('./routes/misListasDeLaCompraNuevas'));
app.use(require('./routes/listasCompraUser'));
app.use(require('./routes/miListaCompraProducts'));
app.use(require('./routes/miListaCompraProductsNews'));
app.use(require('./routes/misListasCompraGuardadas'));
app.use(require('./routes/recuperarListaCompra'));
app.use(require('./routes/recuperarIdRegistro'));
app.use(require('./routes/recuperarAlias'));
app.use(require('./routes/compartirLista'));
app.use(require('./routes/borrarListaCompra'));
app.use(require('./routes/listasCompartidas'));
app.use(require('./routes/recuperarListaCompartida'));
app.use(require('./routes/comprobarListaCompartida'));
app.use(require('./routes/usuario'));
app.use(require('./routes/notificaciones'));
app.use(require('./routes/recuperarNotificaciones'));
app.use(require('./routes/crearUsuario'));
app.use(require('./routes/otorgarPrivilegios'));
app.use(require('./routes/recuperarUser'));
app.use(require('./routes/revocarPrivilegios'));


app.use(express.static(path.join(__dirname, 'build')));


app.get("/api", (req, res) => {
  res.json({ message: "Hola desde el servidor!" });
});


server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


process.on('uncaughtException', (err) => {
    console.error('❌ Ocurrió un error no capturado (Mantenemos servidor vivo):', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promesa no capturada (Mantenemos servidor vivo):', reason);
});

module.exports = app;

