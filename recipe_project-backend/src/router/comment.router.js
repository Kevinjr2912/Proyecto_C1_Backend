const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

// Ruta para crear un comentario
router.post('/createComment/:id_recipe/:id_person', commentController.createComment);

// Ruta para obtener todos los comentrios de una publicación
router.post('/getAllComments/:id_recipe', commentController.getAllComments);

module.exports = router;