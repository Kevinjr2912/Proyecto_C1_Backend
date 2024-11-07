const { Recipe, Person, Comment } = require('../models');

// Controlador para crear un comentario
const createComment = async (req, res) => {
    const { id_recipe, id_person } = req.params;
    const { response } = req.body;

    console.log(response)

    try {
        await Comment.create({
            id_recipe: id_recipe,
            id_person: id_person,
            response: response
        });

        res.status(201).json({
            "status": 200,
            "message": "Commentario creado"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

// Controlador para obtener todos los comentarios de una publicación
const getAllComments = async (req, res) => {
    const { id_recipe } = req.params;

    try {
        const comments = await Comment.findAll({
            attributes: ['response'],
            where: {
                id_recipe: id_recipe
            },
            include: [
                {
                    model: Person,
                    attributes: ['first_name_person', 'middle_name_person', 'first_surname_person', 'middle_surname_person']
                }
            ]
        });

        res.status(200).json(comments);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }


}

module.exports = {
    createComment,
    getAllComments
}