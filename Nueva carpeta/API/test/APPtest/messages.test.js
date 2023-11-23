const { describe } = require('node:test');
const assert = require('node:assert').strict;
const API = require('../config/api')

describe('Endpoints messages', function(){

    const token = '7679397da69e21cd5463ff8e9b7511e37b17b2f9';

    describe('messages/list', function(){

        it('List messages ok', async function () {
            
            const test = await API.get('/messages/list', {}, token)

            assert.equal(test?.status, true)
        })

        it('List messages no ok', async function () {
            
            const test = await API.get('/messages/list', {}, token)

            assert.notEqual(test?.status, false)
        })
    })

    describe('messages/id', function(){

        const id = 2;

        it('Id messages ok', async function () {
            
            const test = await API.get('/messages/'+id, {}, token)

            assert.equal(test?.status, true)
        })

        it('Id messages no ok', async function () {
            
            const test = await API.get('/messages/'+id, {}, token)

            assert.notEqual(test?.status, false)
        })
    })

    describe('/post/messages', function(){


        it('post messages ok', async function () {
            const id = 2;

            const obj = {
                'content': 'hola'
            }
            
            const test = await API.post('/messages/'+id, obj, token)

            assert.equal(test?.status, true)
        })

        it('Post messages no ok', async function () {
            const id = 3;

            const obj = {
                'content': 'hola'
            }
            
            const test = await API.post('/messages/'+id, obj, token)
            
            assert.notEqual(test?.status, false)
        })
    })

    describe('/put/messages', function(){

        it('put story ok', async function () {

            const obj = {
                'content': 'hogggla'
            }

            const message = 8;
            
            const test = await API.put('/messages/'+message, obj, token)

            assert.equal(test?.status, true)
        })

        it('put event no ok', async function () {

            const obj = {
                'content': 'hoggla'
            }

            const message = 9;
            
            const test = await API.put('/messages/'+message, obj, token)
            
            assert.notEqual(test?.status, false)
        })
    })

    describe('/delete/messages', function(){

        it('delete messages ok', async function () {

            const message = 2;
            
            const test = await API.delete('/messages/'+message, {}, token)

            assert.equal(test?.status, true)
        })

        it('delete messages no ok', async function () {

            const message = 3;
            
            const test = await API.delete('/messages/'+message, {}, token)
            
            assert.notEqual(test?.status, false)
        })
    })
})