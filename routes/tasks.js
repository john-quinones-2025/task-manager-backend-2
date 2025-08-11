// task-manager-api-2/routes/tasks.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth'); // Lo crearemos después

const router = express.Router();
const prisma = new PrismaClient();

// Obtener todas las tareas del usuario
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.userId },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas.' });
  }
});

// Crear una nueva tarea
router.post('/', authMiddleware, async (req, res) => {
  const { title } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        title,
        userId: req.userId,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tarea.' });
  }
});

// ... otras rutas (PUT para actualizar, DELETE para eliminar)
// Las crearemos más adelante.


// task-manager-api-2/routes/tasks.js
// ... (código que ya tienes)

// Actualizar una tarea (marcar como completada, por ejemplo)
router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    try {
        const task = await prisma.task.update({
            where: {
                id: parseInt(id),
                userId: req.userId,
            },
            data: { completed },
        });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la tarea.' });
    }
});

// Eliminar una tarea
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.task.delete({
            where: {
                id: parseInt(id),
                userId: req.userId,
            },
        });
        res.status(204).send(); // 204 No Content para eliminación exitosa
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea.' });
    }
});


module.exports = router;