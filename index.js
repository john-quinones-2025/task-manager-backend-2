// task-manager-api-2/index.js

const express = require('express');
const cors = require('cors'); // Asegúrate de que cors está importado
require('dotenv').config();

// Importar los archivos de rutas de autenticación y tareas
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 4000;

// Configuración de CORS
// El origen es la URL de tu frontend en Vercel.
const corsOptions = {
    origin: 'https://task-manager-frontend-2.vercel.app',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Usar la nueva configuración de CORS
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API del gestor de tareas funcionando');
});

// Usar las rutas de autenticación y tareas
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});