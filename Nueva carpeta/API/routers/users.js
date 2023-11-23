// Faltan las 3 que dijo Luis
const express = require('express');
const router = express.Router();
const DB = require('../config/db');
const utils = require('../config/utils');
const authtoken = require('../config/authtoken');
const hash = require('../config/password');


// Rutas de la API de usuarios
router.get('/list', [authtoken], async (req, resp) => {

	const result = await DB.select(['nameSurname', 'description'])
	.from('users')
	
	if( result.length > 0 ){
		return resp.json({status: true, data: result});
	}else{
		return resp.json({status: false, error: "Ups, algo falló"});
	}
});


// Obtener el propio perfil
router.get('/self', [authtoken], async (req, resp) => {

	const result = await DB
	.select(['ID', 
		'email', 
		'presentation', 
		'description', 
		'nameSurname',
		'birthDate', 
		'city', 
		'proTitle', 
		'proDescription',
		'proInfo', 
		'proContact', 
		'proSchedule', 
		'proPrices', 
		'proOther'])
	.from('users')
	.where('ID', req.user.ID);

	if( result.length === 1 ){
		return resp.json({status: true, data: result[0]});
	}else{
		return resp.json({status: false, error: "Ups, algo falló"});
	}
});


// Obtener perfil concreto (no amigo)
router.get('/:id', [authtoken], async (req, resp) => {

	const result = await DB
		.select(['email', 
			'presentation', 
			'description', 
			'nameSurname',
			'birthDate', 
			'city', 
			'proTitle', 
			'proDescription',
			'proInfo', 
			'proContact', 
			'proSchedule', 
			'proPrices', 
			'proOther'])
		.from('users')
		.where('ID', req.params.id);

	if( result.length === 1 ){
		return resp.json({status: true, data: result[0]});
	}else{
		return resp.json({status: false, error: "ID no válido"});
	}
});


router.post('/', async (req, resp) => {
	try {
	  if (!utils.validarCorreo(req.body.email)) {
		return resp.json({ status: false, error: 'Correo electrónico no válido' });
	  }
	  const result = await DB('users').insert({
		email: req.body.email,
		password: req.body.password,
		token: hash(req.body.email + req.body.password),
		description: req.body.description,
		nameSurname: req.body.nameSurname,
		birthDate: req.body.birthDate,
		city: req.body.city,
		proInfo: req.body.proInfo,
		proContact: req.body.proContact,
		proSchedule: req.body.proSchedule,
		proPrices: req.body.proPrices,
		proOther: req.body.proOther
	  });
  
	  return resp.json({ status: true, data: "Perfil creado correctamente." });
	} catch (error) {
	  console.error('Error al crear un nuevo usuario:', error);
  
	  return resp.json({ status: false, error: 'Algo falló' });
	}
  });


// Modificar dato de usuario
router.put('/', [authtoken], async (req, resp) => {

	const whitelist = ["email", "password", "description", "nameSurname", "birthDate", "city", "proInfo", "proContact", "proSchedule", "proPrices", "proOther"];
	const toEdit = {};

	if (req.body.mail && !utils.validarCorreo(req.body.email)) {
		return resp.json({ status: false, error: 'Correo electrónico no válido' });
	}

	Object.keys(req.body).forEach(e => {
		if( whitelist.includes(e) ){
			toEdit[e] = req.body[e];
		}
	})

	const result = await DB('users')
	.update(toEdit)
	.where('ID', req.user.ID);

	if (result > 0) {
		resp.json({ status: true, message: 'Perfil actualizado correctamente', data: toEdit });
			} else {
		resp.json({ status: false, message: 'Perfil no actualizado', data: toEdit });
	};
});


// Borrar usuario
router.delete('/', [authtoken], async (req, resp) => {

	const result = await DB('users')
	.delete()
	.where('ID', req.user.ID);

	if(result > 0){
		resp.json({ status: true, message: 'Perfil eliminado correctamente', deletedProfile: req.user});
	} else {
		resp.json({ status: false, message: 'Ha habido algún error' })
	}
});

// Estas 3 hacerlas para el final

router.post('/login', async (req, resp) => {

	const userData = await DB('users')
      .select(['ID', 'token'])
      .where('email', req.body.email)
	  .where('password', req.body.password)
      .first();

	if (userData !== undefined ) {
		const newToken = hash(userData.token);
		await DB('users')
		.where('ID', userData.ID)
		.update('token', newToken)
	  	return resp.json({ status: true, data: newToken });
	} else {
	  // Las credenciales son incorrectas, devolvemos un error
	  resp.status(401).json({ error: 'Credenciales inválidas' });
	}
});

// Pedir para resetear la contraseña
router.post('/reset', async (req, resp) => {

	const result = await DB.select(['nameSurname', 'email'])
		.from('users')
		.where('nameSurname', req.body.nameSurname)
		.andWhere('email', req.body.email)

		if (result.length > 0){
			return resp.json({status: true, data: result[0]})
		} else {
			return resp.json({status:false, data: 'El usuario no existe'})
		}
	}
);

// Introducir nueva contraseña
router.put('/users/reset/:pass', (req, resp) => {
	
}
);

module.exports = router;
