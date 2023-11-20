// Este está completo y funcionando
const express = require('express');
const router = express.Router();
const DB = require('../config/db');
const authtoken = require('../config/authtoken');

router.get('/list', [authtoken], async (req, resp) => {
		const result = await DB
		.select(['evento.userID',
		'evento.ID',
		'evento.title',
		'evento.date',
		'evento.GPS',
		'evento.description',
		'evento.created',
		'users.nameSurname as nameSurname'])
	.from('evento')
	.leftJoin('users', 'evento.userID', 'users.ID')
	.innerJoin('friends', function() {
		this.on('evento.userID', '=', 'friends.sendFriend')
			.orOn('evento.userID', '=', 'friends.acceptfriend')
	})
	.leftJoin('eventgo', function() {
		this.on('evento.ID', '=', 'eventgo.eventID')
			.andOn('eventgo.userID', '=', req.user.ID)
	})
	.where('friends.accepted', 1)
	.where(function() {
		this.where('evento.userID', '=', req.user.ID)
			.orWhere('eventgo.userID', '=', req.user.ID)
	})
	.groupBy('evento.ID');
		resp.json({ status: true, data: result });
});



// Apuntarse a un evento
router.post('/:id', [authtoken], async (req, resp) => {
	
	try {
		const result = await DB('eventgo').insert({
			eventID:  req.params.id,
			userID: req.user.ID
		});

	} catch (error) {
		return resp.json({status: false, error: "Algo falló"});
	}
	return resp.json({status: true, data: 'Te has apuntado al evento'});
});

// Borrarse de un evento
router.delete('/:id', [authtoken], async (req, resp) => {
	
	const myID = req.user.ID;

	const result = await DB('eventgo')
	.delete()
	.join('users', 'eventgo.userID', '=', 'users.ID')
	.where('eventgo.eventID', req.params.id)
	.andWhere('eventgo.userID', myID);

	if(result > 0){
		resp.json({ status: true, message: 'Te has borrado del evento'});
	} else {
		resp.json({ status: false, message: 'El evento no existe o ya te habías borrado' })
	}
});

module.exports = router;