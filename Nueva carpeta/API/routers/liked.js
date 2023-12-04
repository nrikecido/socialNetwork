// Este está completo y funcionando
const express = require('express');
const router = express.Router();
const DB = require('../config/db');
const authtoken = require('../config/authtoken');

// Obtener lista de likes
router.get('/list', [authtoken], async (req, resp) => {

	try{
		const result = await DB
		.select([DB.raw('COUNT(userID) as likes')])
		.from('liked')
		
		if (result.length > 0){
			resp.json({status: true, data: result})
		} else {
			resp.json({status: false, data: 'Esta publicación no tiene likes'})
		}

	} catch (error) {
        console.error(error);
        resp.status(500).json({ status: false, data: 'Error en el servidor' });
    }
});

// Obtener likes de una publicación
router.get('/:id', [authtoken], async (req, resp) => {
	const postID = req.params.id;

	try{
		const result = await DB
		.select([DB.raw('COUNT(userID) as likes')])
		.from('liked')
		.where('userstoriesID', postID)
		
		if (result.length > 0){
			resp.json({status: true, data: result})
		} else {
			resp.json({status: false, data: 'Esta publicación no tiene likes'})
		}

	} catch (error) {
        console.error(error);
        resp.status(500).json({ status: false, data: 'Error en el servidor' });
    }
});


// Dar like
router.post('/:id', [authtoken], async (req, resp) => {
	
	try {
		const result = await DB('liked').insert({
			userstoriesID: req.params.id,
			userID: req.user.ID
		});

		return resp.json({status: true, data: 'Le has dado like'});
	} catch (error) {
		console.error(error);
        resp.status(500).json({ status: false, data: 'Error en el servidor' });
	}
});

// Borrarse de un evento
router.delete('/:id', [authtoken], async (req, resp) => {
    const myID = req.user.ID;

    try {
        const result = await DB('liked')
            .delete()
            .join('users', 'liked.userID', '=', 'users.ID')
            .where('liked.userstoriesID', req.params.id)
            .andWhere('liked.userID', myID);
			
			resp.json({ status: true, message: 'Le has quitado el like' });
    } catch (error) {
        console.error(error);
        resp.status(500).json({ status: false, message: 'Error en el servidor' });
    }
});


module.exports = router;