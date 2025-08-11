// task-manager-api-2/index.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 1. Importar los archivos de rutas de autenticación y tareas
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API del gestor de tareas funcionando');
});

// 2. Usar las rutas de autenticación y tareas
// El prefijo '/api/auth' se usa para las rutas de auth.js
app.use('/api/auth', authRoutes);
// El prefijo '/api/tasks' se usa para las rutas de tasks.js
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});