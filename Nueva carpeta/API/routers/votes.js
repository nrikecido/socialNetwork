// Este está completo y funcionando
const express = require('express');
const router = express.Router();
const DB = require('../config/db');
const authtoken = require('../config/authtoken');

router.get('/list', [authtoken], async (req, resp) => {
    try {
        const myID = req.user.ID;

        const result = await DB
            .select('evento.title as evento', 'users.nameSurname as usuario', 'votes.valoration')
            .from('votes')
            .innerJoin('evento', 'votes.eventID', '=', 'evento.ID')
            .innerJoin('users', 'votes.userID', '=', 'users.ID')
            .leftJoin('eventgo', 'eventgo.userID', '=', 'users.ID') 
            .where('eventgo.userID', myID)
            .distinct();

        if (result.length > 0) {
            return resp.status(200).json({ status: true, data: result });
        } else {
            return resp.status(404).json({ status: false, data: result });
        }
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ status: false, error: "Error interno del servidor." });
    }
});


// Obtener votos totales de un evento
router.get('/:id', [authtoken], async (req, resp) => {
	const eventId = req.params.id;
	const myID = req.user.ID;
	
	const result = await DB.select(DB.raw('AVG(valoration) as media'))
		.from('votes')
		.where('eventID', eventId)
		.andWhere('userID', myID)
  
	if (result.length === 0) {
		resp.json({ status: false, message: 'Evento no encontrado' });
		return;
	} 
		resp.json({ status: true, result });
});


//Votar un evento
router.post('/:id', [authtoken], async (req, resp) => {

	try {
		const result = await DB('votes').insert({
			eventID: req.params.id,
			userID:  req.user.ID,
            valoration: req.body.valoration
		})
		return resp.json({status: true, data: 'Evento votado correctamente'});
		} catch (error) {
		console.error('Error al votar el evento:', error);
	
		return resp.json({ status: false, error: 'Algo falló' });
		}
	});

module.exports = router;