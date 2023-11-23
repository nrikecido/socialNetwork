const { describe } = require('node:test');
const assert = require('node:assert').strict;
const API = require('../config/api')

describe('Endpoints friends', function(){

    const token = '7679397da69e21cd5463ff8e9b7511e37b17b2f9';

    describe('friends/list', function(){

        it('List ok', async function () {
            
            const test = await API.get('/friends/list', {}, token)

            assert.equal(test?.status, true)
        })

        it('List no ok', async function () {
            
            const test = await API.get('/friends/list', {}, token)

            assert.notEqual(test?.status, false)
        })
    })

    describe('friends/id', function(){

        const id = 2;

        it('Id ok', async function () {
            
            const test = await API.get('/friends/'+id, {}, token)

            assert.equal(test?.status, true)
        })

        it('Id no ok', async function () {
            
            const test = await API.get('/friends/'+id, {}, token)

            assert.notEqual(test?.status, false)
        })
    })

    describe('/post/friends', function(){


        it('post friendship ok', async function () {

            const obj = {
                'sendFriend': 1,
                'acceptFriend': 3,
                'accepted': false
            }
            
            const test = await API.post('/friends/', obj, token)

            assert.equal(test?.status, true)
        })

        it('Post friendship no ok', async function () {

            const obj = {
                'sendFriend': 1,
                'acceptFriend': 4,
                'accepted': false
            }
            
            const test = await API.post('/friends/', obj, token)
            
            assert.notEqual(test?.status, false)
        })
    })

    describe('/put/friends', function(){

        it('put story ok', async function () {

            const obj = {
                'accepted': true
            }

            const friend = 3;
            
            const test = await API.put('/friends/'+friend, obj, token)

            assert.equal(test?.status, true)
        })

        it('put story no ok', async function () {

            const obj = {
                'accepted': true
            }

            const friend = 4;
            
            const test = await API.put('/friends/'+friend, obj, token)
            
            assert.notEqual(test?.status, false)
        })
    })

    describe('/delete/friends', function(){

        it('delete friends ok', async function () {

            const friend = 3;
            
            const test = await API.delete('/friends/'+friend, {}, token)

            assert.equal(test?.status, true)
        })

        it('delete friends no ok', async function () {

            const friend = 4;
            
            const test = await API.delete('/friends/'+friend, {}, token)
            
            assert.notEqual(test?.status, false)
        })
    })
})