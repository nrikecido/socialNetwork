const { describe } = require('node:test');
const assert = require('node:assert').strict;
const API = require('../config/api')


describe('Endopoints /users', function () {

    let token = undefined

    describe('/users/login', function () {

        it('Login ok', async function () {
            const obj = {'email': 'useffff@gmail.com', 'password': 'user'}
            
            const test = await API.post('/users/login', obj)
            token = test.data;
            assert.equal(test?.status, true)
        })

        it('Login error', async function () {
            const obj = {'email': 'useffff@gmail.com', 'password': 'users'}

            const test = await API.post('/users/login', obj)
            
            assert.notEqual(test?.status, false)
        })
    })

    describe('/users/self', function () {

        it('check self ok', async function () {
            
            const test = await API.get('/users/self', {}, token);
            assert.equal(test?.status, true)
        })

        it('uncheck self no ok', async function () {
            
            const test = await API.get('/users/self', {}, token);
            assert.notEqual(test?.status, false)
        })
    })

    describe('/users/get/list', function () {

        it('check list', async function () {
            
            const test = await API.get('/users/list', {}, token);
            assert.equal(test?.status, true)
        })

        it('unchek list', async function () {
            
            const test = await API.get('/users/list', {}, token);
            assert.notEqual(test?.status, false)
        })
    })

    describe('/users/get/:id', function () {

        it('check id', async function () {
            
            const test = await API.get('/users/1', {}, token);
            assert.equal(test?.status, true)
        })

        it('unchek id', async function () {
            
            const test = await API.get('/users/1', {}, token);
            assert.notEqual(test?.status, false)
        })
    })

    describe('/users/post/', function () {

        it('check post', async function () {

            const obj = {
            "email": "useffff@gmail.com",
            "password": "user",
            "token": "",
            "description": "Hola, soy user",
            "nameSurname": "User",
            "birthDate": "12/05/1966",
            "city": "",
            "proInfo": "",
            "proContact": "",
            "proSchedule": "",
            "proPrices": "",
            "proOther": ""
            }
            
            const test = await API.post('/users/', obj);
            assert.equal(test?.status, true)
        })

        it('unchek post', async function () {

            const obj = {
                "emal": "useffff@gmail.com",
                "password": "user",
                "token": "",
                "description": "Hola, soy user",
                "nameSurname": "User",
                "birthDate": "12/05/1966",
                "city": "",
                "proInfo": "",
                "proContact": "",
                "proSchedule": "",
                "proPrices": "",
                "proOther": ""
            }

            const test = await API.post('/users/', obj);
            assert.notEqual(test?.status, false)
        })
    })
    
    describe('/users/put', function () {

        it('check put', async function () {

            const obj = {
                "email": "userg@gmail.com",
                "password": "user",
                "description": "Hola, soy user",
                "nameSurname": "User",
                "birthDate": "12/05/1966",
                "city": "",
                "proInfo": "",
                "proContact": "",
                "proSchedule": "",
                "proPrices": "",
                "proOther": ""
            }
            
            const test = await API.put('/users/', obj, token);
            assert.equal(test?.status, true)
        })

        it('unchek put', async function () {

            const obj = {
                "email": "user6@gmail.com",
                "password": "manol",
                "description": "Hola, soy Manolo",
                "nameSurname": "Manolo Ortiz Muñoz",
                "birthDate": "12/05/1965",
                "city": "Madrid",
                "proInfo": "Camionero",
                "proContact": "654654654",
                "proSchedule": "De 5 a 6",
                "proPrices": "1000",
                "proOther": "nada"
            }
            
            const test = await API.put('/users/', obj, token);
            assert.notEqual(test?.status, false)
        })
    })

    describe('/users/delte', function () {

        it('unchek delete', async function () {
            
            const test = await API.delete('/users/', {}, token);
            assert.notEqual(test?.status, false)
        })

        it('check delete', async function () {
            
            const test = await API.delete('/users/', {}, token);
            assert.equal(test?.status, true)
        })

    })
})