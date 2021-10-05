const express = require('express');
const routerProducts = require('./routers/products');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/static', express.static('public'));

server.use('/api/productos', routerProducts);

const port = 8080;

server.get('/', (req, res) => {
    res.json({ mensaje: 'Web Funcionando' });
});

const app = server.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});

app.on('error', (error) => {
    console.log(`Error: ${error}`);
});