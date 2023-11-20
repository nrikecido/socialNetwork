// Este está completo y funcionando
const express = require('express');
const router = express.Router();
const DB = require('../config/db');
const authtoken = require('../config/authtoken');


// Obtener lista de mensajes
router.get('/list', [authtoken], async (req, resp) => {
    const result = await DB.select([
            DB.raw("CASE WHEN sender.ID = :userId THEN receiver.nameSurname ELSE sender.nameSurname END AS OtherPartyName", { userId: req.user.ID }),
            DB.raw("CASE WHEN sender.ID = :userId THEN receiver.ID ELSE sender.ID END AS OtherPartyID", { userId: req.user.ID }),
            'messages.content',
            'messages.created'
        ])
        .from('messages')
        .join('users AS sender', 'sender.ID', '=', 'messages.senderID')
        .join('users AS receiver', 'receiver.ID', '=', 'messages.receiverID')
        .join('friends', function(){
            this.on('sender.ID', 'friends.acceptFriend')
            this.orOn('sender.ID', 'friends.sendFriend')
            })
        .where('senderID', req.user.ID)
        .orWhere('receiverID', req.user.ID)
        .andWhere('friends.accepted', true)
        .groupBy('OtherPartyName', 'OtherPartyID')
        .orderBy('messages.created', 'desc');

    if (result.length > 0) {
        resp.json({ status: true, result });
    } else {
        resp.json({ status: false, message: 'Ha habido algún error' });
    }
});




// Obtener conversación en concreto
router.get('/:id', [authtoken], async (req, resp) => {
    const myID = req.user.ID;
    const friendID = req.params.id;
    
    const result = await DB.select(['sender.nameSurname AS Sender', 'receiver.nameSurname AS Receiver', 'messages.content', 'messages.senderID','messages.receiverID', 'messages.created'])
        .from('messages')
        .join('users AS sender', 'sender.ID', '=', 'messages.senderID')
        .join('users AS receiver', 'receiver.ID', '=', 'messages.receiverID')
        .where(function() {
            this.where('senderID', myID).andWhere('receiverID', friendID)
            .orWhere('senderID', friendID).andWhere('receiverID', myID);
        });

        if(result.length > 0){
            resp.json({ status: true, result});
        } else {
            resp.json({ status: false, message: 'Ha habido algún error' })
        }
});


// Enviar nuevo mensaje
router.post('/:id', [authtoken], async (req, resp) => {

    const myID = req.user.ID;
    const friendID = req.params.id

    try {
        const result = await DB('messages')
            .insert({
            senderID: myID,
            receiverID: friendID,
            content: req.body.content
        });
        if (result.length > 0) {
            return resp.json({ status: true, message: 'Mensaje enviado con éxito' });
        } else {
            return resp.json({ status: false, message: 'No se pudo enviar el mensaje' });
        }
    } catch (error) {
        console.error(error);
        return resp.json({ status: false, message: 'Algo falló' });
    }
});


//Modificar mensajes
router.put('/:id', [authtoken], async (req, resp) => {

    const myID = req.user.ID;
    const messageID = req.params.id;

    const whitelist = ["content"];
	const toEdit = {};

	Object.keys(req.body).forEach(e => {
		if( whitelist.includes(e) ){
			toEdit[e] = req.body[e];
		}
	})
	const result = await DB('messages')
    .update(toEdit)
    .where('senderID', myID)
    .andWhere('messageID', messageID);

	if(result > 0){
            resp.json({ status: true, message: 'Mensaje modificado correctamente'});
        } else {
            resp.json({ status: false, message: 'Ha habido algún error' })
        }
});


// Eliminar mensajes
router.delete('/:id', [authtoken], async (req, resp) => {

    const myID = req.user.ID;
    const friendID = req.params.id;

    const result = await DB('messages')
    .delete()
    .where(function() {
        this.where('senderID', myID).andWhere('receiverID', friendID)
        .orWhere('senderID', friendID).andWhere('receiverID', myID);
    })

    if (result > 0) {
        return resp.json({ status: true, message: 'Mensaje eliminado' });
    } else {
        return resp.json({ status: false, message: 'No se pudo eliminar el mensaje' });
    }
});

module.exports = router;