// Este está completo y funcionando
const express = require('express');
const router = express.Router();
const DB = require('../config/db');
const authtoken = require('../config/authtoken');

// Obtener lista de eventos
router.get('/list', [authtoken], async (req, resp) => {
    const myID = req.user.ID;

    try {
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
            .leftOuterJoin('friends', function() {
                this.on('evento.userID', '=', 'friends.sendFriend')
                    .orOn('evento.userID', '=', 'friends.acceptfriend')
            })
            .groupBy('evento.ID');

        if (result.length > 0) {
            resp.json({ status: true, data: result });
        } else {
            resp.json({ status: false, data: result });
        }
    } catch (error) {
        console.error(error);
        resp.status(500).json({ status: false, data: 'Error en el servidor' });
    }
});

// Obtener creados por el usuario
router.get('/self', [authtoken], async (req, resp) => {
    const result = await DB.select(['evento.title', 'evento.date', 'evento.GPS', 'evento.description', 'users.nameSurname as nameSurname'])
        .from('evento')
		.where('userID', req.user.ID)
        .leftJoin('users', 'evento.userID', 'users.ID');
    resp.json({ status: true, data: result });
});


// Obtener un evento en concreto
router.get('/:id', async (req, resp) => {

	const result = await DB.select(['userID', 'title', 'description', 'date', 'duration', 'needed', 'created', 'capacity', 'GPS'])
	.from('evento')
	.where('id', req.params.id);

	resp.json({status: true, data: result});

});


// Crear nuevo evento
router.post('/', [authtoken], async (req, resp) => {
	try {
		const result = await DB('evento')
			.insert({
			userID:  req.user.ID,
			title: req.body.title,
			description:  req.body.description,
			date:  req.body.date,
			duration: req.body.duration,
			needed: req.body.needed,
            capacity: req.body.capacity,
            GPS: req.body.GPS,
            valoration: 0 // ¿valor por defecto?
        });
		
	} catch (error) {
		console.error(error)
		return resp.json({status: false, error: "Algo falló"});
	}
	return resp.json({status: true});
});


// Modificar un evento
router.put('/:id', [authtoken],async (req, resp) => {

	const ID = req.params.id;
	const myID = req.user.ID;

	const whitelist = ["title", "description", "date", "duration", "needed", "capacity", "GPS", "valoration"];
	const toEdit = {};

	Object.keys(req.body).forEach(e => {
		if( whitelist.includes(e) ){
			toEdit[e] = req.body[e];
		}
	})

	const result = await DB('evento')
  .update({
    'evento.title': toEdit.title,
    'evento.description': toEdit.description,
    'evento.date': toEdit.date,
    'evento.duration': toEdit.duration,
    'evento.needed': toEdit.needed,
    'evento.capacity': toEdit.capacity,
    'evento.GPS': toEdit.GPS,
    'evento.valoration': toEdit.valoration
  })
  .join('users', 'evento.userID', '=', 'users.ID')
  .where('evento.ID', ID)
  .andWhere('users.ID', myID);

if (result === 1) {
  resp.json({ status: true, data: 'Publicación modificada' });
} else {
  resp.json({ status: false, message: 'No tienes permisos o no existe la publicación' });
}

});


// Eliminar un evento
router.delete('/:id', [authtoken], async (req, resp) => {

	const ID = req.params.id;
	const myID = req.user.ID;

	const result = await DB('evento')
	.delete()
	.join('users', 'evento.userID', '=', 'users.ID')
	.where('evento.ID', ID)
	.andWhere('users.ID', myID)

	if(result === 1){
		resp.json({status:true, data: 'Publicación eliminada'});
	} else {
		resp.json({status: false, message: 'No tienes permisos o no existe la publicación'})
	}
});

module.exports = router;
