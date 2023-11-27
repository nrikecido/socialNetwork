// Este está completo y funcionando
const express = require('express');
const router = express.Router();
const DB = require('../config/db');
const authtoken = require('../config/authtoken');

router.get('/list', [authtoken], async (req, resp) => {

	const myID = req.user.ID;
	try{
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
		.join('users', 'evento.userID', 'users.ID')
		.leftJoin('eventgo', function() {
			this.on('evento.ID', '=', 'eventgo.eventID')
				.andOn('eventgo.userID', '=', myID)
		})
		.groupBy('evento.ID');
		
		if (result.length > 0){
			resp.json({status: true, data: result})
		} else {
			resp.json({status: false, data: 'Hubo un error'})
		}

	} catch (error) {
        console.error(error);
        resp.status(500).json({ status: false, data: 'Error en el servidor' });
    }
});


// Apuntarse a un evento
router.post('/:id', [authtoken], async (req, resp) => {
	
	try {
		const result = await DB('eventgo').insert({
			eventID:  req.params.id,
			userID: req.user.ID
		});

		return resp.json({status: true, data: 'Te has apuntado al evento'});
	} catch (error) {
		return resp.json({status: false, error: "Algo falló"});
	}
});

// Borrarse de un evento
router.delete('/:id', [authtoken], async (req, resp) => {
    const myID = req.user.ID;

    try {
        const result = await DB('eventgo')
            .delete()
            .join('users', 'eventgo.userID', '=', 'users.ID')
            .where('eventgo.eventID', req.params.id)
            .andWhere('eventgo.userID', myID);
			
			resp.json({ status: true, message: 'Te has borrado del evento' });
    } catch (error) {
        console.error(error);
        resp.status(500).json({ status: false, message: 'Error en el servidor' });
    }
});


module.exports = router;