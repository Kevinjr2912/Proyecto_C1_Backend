const http = require('http');
const app = require('./src/app');
const { connection } = require('./src/models');

const PORT = 3000;
connection.sync() // Sincroniza los modelos con las bases de datos
    .then( () => {
        console.log('Conexión con la base de datos exitosa y modelos sincronizados.')
        const server = http.createServer(app);
        server.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch( (error) => {
        console.error('Error al sincronizar con la base de datos: ' + error);
    })