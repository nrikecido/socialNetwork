// Este está completo y funcionando
const express = require('express');
const router = express.Router();
const DB = require('../config/db');
const authtoken = require('../config/authtoken');


router.get('/list', [authtoken], async (req, resp) => {
    try {
        const myID = req.user.ID;

        const result = await DB
            .select([
                'userstories.ID',
                'userstories.userID',
                'userstories.content',
                'userstories.created',
                'users.nameSurname as nameSurname',
                'storycomments.ID as comentID',
                'storycomments.content as comment',
                'storycomments.userID as commentUserID', 
                'usersComment.nameSurname as commentName'
            ])
            .from('userstories')
            .leftJoin('users', function () {
                this.on('users.ID', '=', 'userstories.userID');
            })
            .join('friends', function () {
                this.on('userstories.userID', '=', 'friends.sendFriend')
                    .orOn('userstories.userID', '=', 'friends.acceptFriend');
            })
            .leftJoin('storycomments', function () {
                this.on('storycomments.userID', '=', 'users.ID');
            })
            .leftJoin('users as usersComment', 'usersComment.ID', '=', 'storycomments.userID') // Alias para el usuario que dejó el comentario
            .where('friends.accepted', true)
            .andWhere(function () {
                this.where('friends.acceptFriend', myID)
                    .orWhere('friends.sendFriend', myID);
            })
            .groupBy('userstories.ID');

        resp.json({ status: true, data: result });
    } catch (error) {
        console.error(error);
        resp.status(500).json({ status: false, message: 'Error en el servidor.' });
    }
});



// Ver historias de un amigo en concreto (hay que repasar este)
router.get('/friends/:id', [authtoken], async (req, resp) => {

	const myID = req.user.ID;
	const friendID = req.params.id;

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
		console.log(result)
		
	if(result.length > 0) {
		resp.json({status: true, data: result});
	} else {
		resp.json({status: false, message: 'No puedes ver la historia'})
	}
});


// Ver historia concreta
router.get('/:id', [authtoken], async (req, resp) =>  {

    const result = await DB
		.select(['userstories.content',
			'userstories.created'])
			.from('userstories')
		.join('friends', function(){
			this.on('userstories.userID', '=', 'friends.acceptFriend')
			this.orOn('userstories.userID', '=', 'friends.sendFriend')
		})
		.where('userstories.ID', req.params.id)
		.andWhere('friends.accepted', 1);
	
	if(result.length > 0) {
		resp.json({status: true, data: result});
	} else {
		resp.json({status: false, message: 'No puedes ver la historia'})
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