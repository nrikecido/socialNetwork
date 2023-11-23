const { describe } = require('node:test');
const assert = require('node:assert').strict;
const API = require('../config/api')

describe('Endpoints comments', function(){

    const token = '7679397da69e21cd5463ff8e9b7511e37b17b2f9';

    describe('comments/id', function(){
        const id = 19;

        it('check comments id ok', async function () {
            
            const test = await API.get('/comments/stories/'+id, {}, token)

            assert.equal(test?.status, true)
        })

        it('check comments id no ok', async function () {
            
            const test = await API.get('/comments/stories/'+id, {}, token)

            assert.notEqual(test?.status, false)
        })
    })

    describe('/post/comments', function(){

        it('Check post comments ok', async function () {
            const id = 19;

            const obj = {
                'content': 'hola'
            }
            
            const test = await API.post('/comments/'+id, obj, token)

            assert.equal(test?.status, true)
        })

        it('Check post comments no ok', async function () {
            const id = 19;

            const obj = {
                'content': 'hola'
            }
            
            const test = await API.post('/comments/'+id, obj, token)
            
            assert.notEqual(test?.status, false)
        })
    })

    describe('/put/comments', function(){

        it('Check put comments ok', async function () {

            const obj = {
                'content': 'hogggla'
            }

            const comment = 4;
            
            const test = await API.put('/comments/'+comment, obj, token)

            assert.equal(test?.status, true)
        })

        it('Check put comments no ok', async function () {

            const obj = {
                'content': 'hoggla'
            }

            const comment = 5;
            
            const test = await API.put('/comments/'+comment, obj, token)
            
            assert.notEqual(test?.status, false)
        })
    })

    describe('/delete/comments', function(){

        it('Check delete comments ok', async function () {

            const comment = 2;
            
            const test = await API.delete('/comments/'+comment, {}, token)

            assert.equal(test?.status, true)
        })

        it('Check delete comments no ok', async function () {

            const comment = 3;
            
            const test = await API.delete('/comments/'+comment, {}, token)
            
            assert.notEqual(test?.status, false)
        })
    })
})