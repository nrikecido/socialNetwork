const { describe } = require('node:test');
const assert = require('node:assert').strict;
const API = require('../config/api')


describe('Endopoints /eventgo', function () {

    const token = 'e3579daf4b278213e42680559f5e59ebbadf7a2c';

    describe('/eventgo/post/14', function () {

        it('check post', async function () {
            
            const test = await API.post('/eventgo/10', {}, token);
            assert.equal(test?.status, true)
        })

        it('unchek post', async function () {
            const test = await API.post('/eventgo/10', {}, token);
            assert.notEqual(test?.status, false)
        })
    })

    describe('/eventgo/list', function () {

        it('check list', async function () {
            
            const test = await API.get('/eventgo/list', {}, token);
            assert.equal(test?.status, true)
        })

        it('unchek list', async function () {
            
            const test = await API.get('/eventgo/list', {}, token);
            assert.notEqual(test?.status, false)

        })
    })

    describe('/eventgo/delte', function () {

        /*it('check delete', async function () {
            
            const test = await API.delete('/eventgo/10', {}, token);
            assert.equal(test?.status, true)
        })*/

        it('unchek delete', async function () {
            
            const test = await API.delete('/eventgo/10', {}, token);
            assert.notEqual(test?.status, false)
        })

    })
})