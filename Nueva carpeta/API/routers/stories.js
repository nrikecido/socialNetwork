// Este está completo y funcionando
const express = require('express');
const router = express.Router();
const DB = require('../config/db');
const authtoken = require('../config/authtoken');


// Lista de stories y sus comentarios
router.get('/list', [authtoken], async (req, resp) => {

	const myID = req.user.ID;
    try {
        const result = await DB
            .select([
                'userstories.ID',
                'userstories.userID',
                'userstories.content',
                'userstories.created',
                'users.nameSurname as nameSurname'
            ])
            .from('userstories')
            .leftJoin('users', 'users.ID', '=', 'userstories.userID')
        
        if (result.length > 0){
			resp.status(200).json({ status: true, data: result });
		}else{
			resp.status(404).json({status: false, data: result})
		}
    } catch (error) {
        console.error(error);
        resp.status(500).json({ status: false, message: 'Error en el servidor.' });
    }
});


// Ver historias de un amigo en concreto (hay que repasar este)
router.get('/friends/:id', [authtoken], async (req, resp) => {

	const myID = req.user.ID;
	const friendID = req.params.id;

    try{
		const result = await DB
		.select(['userstories.ID as storyID',
			'userstories.userID', 
			'userstories.content', 
			'userstories.created',
			'storycomments.ID as comentID',
			'storycomments.content as comentario'])
		.from('userstories')
		.join('friends', function(){
			this.on('userstories.userID', '=', 'friends.acceptFriend')
			this.orOn('userstories.userID', '=', 'friends.sendFriend')
		})
		.leftJoin('storycomments', 'userstories.ID', '=', 'storycomments.userID')
		.where('userstories.userID', friendID)
		.andWhere('friends.accepted', 1)
		.andWhereNot('userstories.userID', myID)
		
		if(result.length > 0) {
			resp.status(200).json({status: true, data: result});
		} else {
			resp.status(404).json({status: false, data: result})
		}
	} catch (error){
		console.error(error);
        return resp.status(500).json({ status: false, error: "Error interno del servidor." });
	}
});


// Ver historia concreta
router.get('/:id', [authtoken], async (req, resp) =>  {
	const storyID = req.params.id;
    try{
		const result = await DB
		.select(['userstories.content',
			'userstories.created'])
			.from('userstories')
		.join('friends', function(){
			this.on('userstories.userID', '=', 'friends.acceptFriend')
			this.orOn('userstories.userID', '=', 'friends.sendFriend')
		})
		.where('userstories.ID', storyID)
		.andWhere('friends.accepted', 1);
	
		if(result.length > 0) {
			resp.json({status: true, data: result});
		} else {
			resp.json({status: false,  data: result})
		}
	} catch (error) {
        console.error(error);
        return resp.status(500).json({ status: false, error: "Error interno del servidor." });
    }
});


// Publicar nueva historia
router.post('/', [authtoken], async (req, resp) => {
    try {
        const result = await DB('userstories')
            .insert({
                userID: req.user.ID,
                content: req.body.content
            });
        ;
        return resp.json({ status: true, data: req.body.content });
    } catch (error) {
        console.error('Error al insertar en la base de datos:', error.message);
        return resp.json({ status: false, error: "Algo falló" });
    }
});


// Modificar una publicación
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

	const result = await DB('userstories')
		.update(toEdit)
		.where('userstories.ID', ID) 
		.join('users', 'userstories.userID', '=', 'users.ID')
		.andWhere('userstories.userID', myID);

	if(result === 1){
		resp.json({status:true, data: 'Publicación modificada'});
	} else {
		resp.json({status: false, message: 'No tienes permisos o no existe la publicación'})
	}

});

// Borrar una publicación
router.delete('/:id', [authtoken], async (req, resp) => {

	const ID = req.params.id;
	const myID = req.user.ID;

	const result = await DB('userstories')
		.delete()
		.where('userstories.ID', ID) 
		.join('users', 'userstories.userID', '=', 'users.ID')
		.andWhere('userstories.userID', myID);

	if(result === 1){
		resp.json({status:true, data: 'Publicación eliminada'});
	} else {
		resp.json({status: false, message: 'No tienes permisos o no existe la publicación'})
	}
	
});

module.exports = router;