// Este está completo y funcionando
const express = require('express');
const router = express.Router();
const DB = require('../config/db');
const authtoken = require('../config/authtoken');

// Lista de clases
router.get('/list', [authtoken], async (req, resp) => {
    try{
        const result = await DB.select(['title', 'description'])
        .from('class')
        
        if( result.length > 0 ){
            return resp.json({status: true, data: result});
        }else{
            return resp.json({status: false, data: result});
        }
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ status: false, error: "Error interno del servidor." });
    }
	
});

// Clase concreta
router.get('/:id', [authtoken], async (req, resp) => {

    const classID = req.params.id;
    try{
        const result = await DB.select(['title', 'description', 'price', 'schedule'])
        .from('class')
        .where('ID', classID)

        if( result.length > 0 ){
            return resp.json({status: true, data: result});
        }else{
            return resp.json({status: false, data: result});
        }
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ status: false, error: "Error interno del servidor." });
    }
})

// Añadir clase
router.post('/', [authtoken], async (req, resp) => {

    try{
        const result = await DB('class').insert({
            userID: req.user.ID,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            schedule: req.body.schedule
        });

        return resp.json({status: true, data: result})
    } catch (error){
        console.error('Error al insertar la nueva clase', error.message)
        return resp.json({status: false, message: 'Algo falló'})
    }
})

// MOdificar clases
router.put('/:id', [authtoken], async (req, resp) => {

    const classID = req.params.id;
    const myID = req.user.ID;

    const whitelist = ["title", "class.description", "price", "schedule"];
    const toEdit = {};

    Object.keys(req.body).forEach(e => {
		if( whitelist.includes(e) ){
			toEdit[e] = req.body[e];
		}
	})
    
    try{
        const result = await DB('class')
        .update(toEdit)
        .where('class.userID', myID)
        .join('users', 'users.ID', '=', 'class.userID')
        .andWhere('class.ID', classID);

        if(result === 1){
            resp.json({status:true, data: 'Publicación modificada'});
        } else {
            resp.json({status: false, message: 'No tienes permisos o no existe la publicación'})
        }
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ status: false, error: "Error interno del servidor." });
    }
});

// Eliminar una clase
router.delete('/:id', [authtoken], async (req, resp) => {

    const classID = req.params.id;
    const myID = req.user.ID;

    const result = await DB('class')
        .delete()
        .where('class.ID', classID)
        .join('users', 'class.userID', '=', 'users.ID')
        .andWhere('class.userID', myID)

        if(result === 1){
            resp.json({status:true, data: 'Clase eliminada'});
        } else {
            resp.json({status: false, message: 'No tienes permisos o no existe la clase'})
        }
})


module.exports = router;