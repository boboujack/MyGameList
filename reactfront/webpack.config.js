const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    mode: 'development',
    watch: true, // Habilitar el modo de observación
    watchOptions: {
        aggregateTimeout: 200, // Tiempo en milisegundos antes de que webpack inicie la compilación después de que los archivos hayan cambiado
        ignored: /node_modules/, // Patrón de archivos que webpack debe ignorar al observar cambios
    },
};
