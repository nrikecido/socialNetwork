// Este está completo y funcionando
const express = require('express');
const router = express.Router();
const DB = require('../config/db');
const authtoken = require('../config/authtoken');


// Obtener comentarios de una historia en concreto
router.get('/stories/:id', async (req, resp) => {

	const storyID = req.params.id;

    const result = await DB.select(['users.nameSurname as nameSurname',
		'storycomments.storyID',
		'storycomments.content',
		'storycomments.created'])
	.from('storycomments')
	.leftJoin('users',
		'storycomments.userID',
		'users.ID')
	.where('storycomments.storyID', storyID);

	if( result.length > 1 ){
		return resp.json({status: true, data: result});
	}else{
		return resp.json({status: false, error: "ID no válido"});
	}
});


// Obtener comentario en concreto
router.get('/:id', async (req, resp) => {

    const result = await DB
	.select(['users.nameSurname as nameSurname',
		'storycomments.content', 
		'storycomments.created'])
	.from('storycomments')
	.leftJoin('users', 
		'storycomments.userID', 
		'users.ID')
	.where('storycomments.ID', req.params.id);

	if( result.length === 1 ){
		return resp.json({status: true, data: result[0]});
	}else{
		return resp.json({status: false, error: "ID no válido"});
	}
});


// Publicar nuevo comentario
router.post('/:id', [authtoken], async (req, resp) => {

    try {
		const result = await DB('storycomments')
			.insert({
			userID: req.user.ID,
			storyID: req.params.id,
            content: req.body.content
		})
		;
        return resp.json({ status: true, message: 'Has comentado correctamente' });
    } catch (error) {
        console.error('Error al insertar en la base de datos:', error.message);
        return resp.json({ status: false, error: "Algo falló" });
    }
});


// Modificar comentario
router.put('/:id', [authtoken], async (req, resp) => {

	const ID = req.params.id;
	const myID = req.user.ID;

	const whitelist = ["content"];
	const toEdit = {};

	Object.keys(req.body).forEach(e => {
		if( whitelist.includes(e) ){
			toEdit[e] = req.body[e];
		}
	})

	const result = await DB('storycomments')
	.update(toEdit)
	.join('users', 'storycomments.userID', '=', 'users.ID')
	.where('storycomments.ID', ID)
	.andWhere('storycomments.userID', myID)

	if(result > 0){
		resp.json({status: true, message: 'Comentario modificado correctamente'})
	} else {
		resp.json({status: false, message: 'Ha habido un error'})
	}
});


// Eliminar comentario
router.delete('/:id', [authtoken], async (req, resp) => {

	const ID = req.params.id;
	const myID = req.user.ID;

	const result = await DB('storycomments')
	.delete()
	.join('users', 'storycomments.userID', '=', 'users.ID')
	.where('storycomments.ID', ID)
	.andWhere('storycomments.userID', myID)

	if(result > 0){
		resp.json({status: true, message: 'Comentario eliminado correctamente'})
	} else {
		resp.json({status: false, message: 'Ha habido un error'})
	}

});

module.exports = router;