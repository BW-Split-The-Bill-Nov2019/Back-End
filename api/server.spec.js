const server = require('./server')
const request = require('supertest')

describe('GET /', () => {
    it('should set db environment to testing', function() {
        expect(process.env.DB_ENV).toBe('test')
    })
})