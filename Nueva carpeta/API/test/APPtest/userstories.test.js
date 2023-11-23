const { describe } = require('node:test');
const assert = require('node:assert').strict;
const API = require('../config/api')

describe('Endpoints userstories', function(){

    const token = '7679397da69e21cd5463ff8e9b7511e37b17b2f9';

    describe('stories/list', function(){

        it('List ok', async function () {
            
            const test = await API.get('/stories/list', {}, token)

            assert.equal(test?.status, true)
        })

        it('List no ok', async function () {
            
            const test = await API.get('/stories/list', {}, token)

            assert.notEqual(test?.status, false)
        })
    })

    describe('stories/id', function(){

        const id = 11;

        it('Id ok', async function () {
            
            const test = await API.get('/stories/'+id, {}, token)

            assert.equal(test?.status, true)
        })

        it('Id no ok', async function () {
            
            const test = await API.get('/stories/'+id, {}, token)

            assert.notEqual(test?.status, false)
        })
    })

    describe('stories/friends/id', function(){

        const friend = 2;

        it('Friend ok', async function () {
            
            const test = await API.get('/stories/friends/'+friend, {}, token)

            assert.equal(test?.status, true)
        })

        it('Id no ok', async function () {
            
            const test = await API.get('/stories/friends/'+friend, {}, token)

            assert.notEqual(test?.status, false)
        })
    })

    describe('/post/stories', function(){


        it('post story ok', async function () {

            const obj = {
                'content': 'holaaa'
            }
            
            const test = await API.post('/stories/', obj, token)

            assert.equal(test?.status, true)
        })

        it('Post story no ok', async function () {

            const obj = {
                'content': 'holaaa'
            }
            
            const test = await API.post('/stories/', obj, token)
            
            assert.notEqual(test?.status, false)
        })
    })

    describe('/put/stories', function(){

        it('put story ok', async function () {

            const obj = {
                'content': 'holaaga'
            }
            const story = 30;
            
            const test = await API.put('/stories/'+story, obj, token)

            assert.equal(test?.status, true)
        })

        it('put story no ok', async function () {

            const obj = {
                'content': 'holaaga'
            }

            const story = 30;
            
            const test = await API.put('/stories/'+story, obj, token)
            
            assert.notEqual(test?.status, false)
        })
    })

    describe('/delete/stories', function(){

        it('delete story ok', async function () {

            const story = 14;
            
            const test = await API.delete('/stories/'+story, {}, token)

            assert.equal(test?.status, true)
        })

        it('delete story no ok', async function () {

            const story = 18;
            
            const test = await API.delete('/stories/'+story, {}, token)
            
            assert.notEqual(test?.status, false)
        })
    })
})