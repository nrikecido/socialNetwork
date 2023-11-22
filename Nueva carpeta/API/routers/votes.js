// Este está completo y funcionando
const express = require('express');
const router = express.Router();
const DB = require('../config/db');
const authtoken = require('../config/authtoken');

router.get('/list', [authtoken], async (req, resp) => {
	myID = req.user.ID;
	const result = await DB
		.select('evento.title as evento', 
		'users.nameSurname as usuario', 
		'votes.valoration')
    .from('votes')
    .innerJoin('evento', 'votes.eventID', 'evento.ID')
    .innerJoin('users', 'votes.userID', 'users.ID')
    .innerJoin('eventgo', 'eventgo.userID', '=', 'users.ID') // Unimos la tabla "eventgo" con la tabla "users"
    .where('eventgo.userID', myID) // Filtramos por la columna "userID" de la tabla "eventgo"
	.distinct();

  resp.json({status: true, data: result});
});

// Obtener votos totales de un evento
router.get('/:id', async (req, resp) => {
	const eventId = req.params.id;
	const result = await DB.select(DB.raw('AVG(valoration) as media'))
		.from('votes')
		.where('eventID', eventId)
  
	if (result.length === 0) {
		resp.json({ status: false, message: 'Evento no encontrado' });
		return;
	} 
		resp.json({ status: true, result });
});


//Votar un evento
router.post('/:id', async (req, resp) => {
	try {
		const result = await DB('votes').insert({
			eventID: req.body.eventID,
			userID:  req.body.userID,
            valoration: req.body.valoration
		})
	} catch (error) {
		return resp.json({status: false, error: "Algo falló"});
	}
		return resp.json({status: true});
});




module.exports = router;