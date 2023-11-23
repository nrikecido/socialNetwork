const { describe } = require('node:test');
const assert = require('node:assert').strict;
const API = require('../config/api')

describe('Endpoints events', function(){

    const token = '7679397da69e21cd5463ff8e9b7511e37b17b2f9';

    describe('events/list', function(){

        it('List ok', async function () {
            
            const test = await API.get('/events/list', {}, token)

            assert.equal(test?.status, true)
        })

        it('List no ok', async function () {
            
            const test = await API.get('/events/list', {}, token)

            assert.notEqual(test?.status, false)
        })
    })

    describe('events/id', function(){

        const id = 2;

        it('Id ok', async function () {
            
            const test = await API.get('/events/'+id, {}, token)

            assert.equal(test?.status, true)
        })

        it('Id no ok', async function () {
            
            const test = await API.get('/events/'+id, {}, token)

            assert.notEqual(test?.status, false)
        })
    })

    describe('/post/events', function(){

        it('post event ok', async function () {

            const obj = {
                "title": "chachacha",
                "description": "chachacha",
                "date": "2025-11-20",
                "duration": "2",
                "needed": "chachacha",
                "capacity": "30",
                "GPS": "chachacha",
                "valoration": "0"
            }
            
            const test = await API.post('/events/', obj, token)

            assert.equal(test?.status, true)
        })

        it('Post event no ok', async function () {

            const obj = {
                "title": "chachacha",
                "description": "chachacha",
                "date": "2025-11-20",
                "duration": "2",
                "needed": "chachacha",
                "capacity": "30",
                "GPS": "chachacha",
                "valoration": "0"
            }
            
            const test = await API.post('/events/', obj, token)
            
            assert.notEqual(test?.status, false)
        })
    })

    describe('/put/events', function(){

        it('put story ok', async function () {

            const obj = {
                "title": "chachsacha",
                "description": "chachsacha",
                "date": "2025-11-20",
                "duration": "2",
                "needed": "chachacha",
                "capacity": "30",
                "GPS": "chachacha",
                "valoration": "0"
            }

            const event = 16;
            
            const test = await API.put('/events/'+event, obj, token)

            assert.equal(test?.status, true)
        })

        it('put event no ok', async function () {

            const obj = {
                "title": "chachsacha",
                "description": "chacshacha",
                "date": "2025-11-20",
                "duration": "2",
                "needed": "chachacha",
                "capacity": "30",
                "GPS": "chachacha",
                "valoration": "0"
            }

            const event = 17;
            
            const test = await API.put('/events/'+event, obj, token)
            
            assert.notEqual(test?.status, false)
        })
    })

    describe('/delete/events', function(){

        it('delete events ok', async function () {

            const event = 16;
            
            const test = await API.delete('/events/'+event, {}, token)

            assert.equal(test?.status, true)
        })

        it('delete events no ok', async function () {

            const event = 17;
            
            const test = await API.delete('/events/'+event, {}, token)
            
            assert.notEqual(test?.status, false)
        })
    })
})