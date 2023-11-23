const { describe } = require('node:test');
const assert = require('node:assert').strict;
const API = require('../config/api')


describe('Endpoints /votes', function () {

    const token = '7679397da69e21cd5463ff8e9b7511e37b17b2f9';

    describe('/votes/list', function () {

        it('check votes list', async function () {
            
            const test = await API.get('/votes/list', {}, token);
            
            assert.equal(test?.status, true)
        })

        it('unchek votes list', async function () {

            const test = await API.get('/votes/list', {}, token);

            assert.notEqual(test?.status, false)
        })
    })

    describe('/votes/:id', function () {

        const id = 10;

        it('check votes id', async function () {
            
            const test = await API.get('/votes/'+id, {}, token);
            assert.equal(test?.status, true)
        })

        it('unchek votes id', async function () {
            
            const test = await API.get('/votes/'+id, {}, token);
            assert.notEqual(test?.status, false)

        })
    })

    describe('/votes post', function () {

        it('check votes post', async function () {
            const id = 18;
            const obj = {'valoration': 2}
            
            const test = await API.post('/votes/'+id, obj, token);
            assert.equal(test?.status, true)
        })

        it('unchek votes post', async function () {
            const id = 19;
            const obj = {'valoration': 2}
            
            const test = await API.post('/votes/'+id, obj, token);
            assert.notEqual(test?.status, false)
        })

    })
})