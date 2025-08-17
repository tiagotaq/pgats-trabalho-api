const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../app');

const authService = require('../../service/authService');
const authMiddleware = require('../../middleware/authMiddleware')

describe('Auth Controller', () => {
    let authServiceMock, authMiddlewareMock
    afterEach(() => {
        sinon.restore();
    })
    context('registerUser', () => {
        beforeEach(() => {
            authServiceMock = sinon.stub(authService, 'register');
        })
        it('Quando não informo o usuário e a senha, recebo um 400 e exibo a mensagem de erro', async () => {
            const objetoDeErro = { error: 'Username and password are required.' }
            authServiceMock.returns(objetoDeErro);

            const resposta = await request(app)
                .post('/register')
                .send({
                    username: '',
                    password: '',
                });
            expect(resposta.status).to.equal(400)
            expect(resposta.body).to.deep.equal(objetoDeErro)
        })
        it('Quando informo um usuário e senha, recebo um 201 e exibo a mensagem de sucesso', async () => {
            const objetoDeSucesso = { message: 'User registered successfully.' }
            authServiceMock.returns(objetoDeSucesso);

            const resposta = await request(app)
                .post('/register')
                .send({
                    username: 'tiago',
                    password: '123456',
                });
            expect(resposta.status).to.equal(201)
            expect(resposta.body).to.deep.equal(objetoDeSucesso)
        })
    })
    context('loginUser', () => {
        beforeEach(() => {
            authServiceMock = sinon.stub(authService, 'login');
        })
        it('Quando informo um usuário e senha inválidos, recebo um 400 e exibo a mensagem de erro', async () => {
            const objetoDeErro = { error: 'Invalid username or password.' };
            authServiceMock.returns(objetoDeErro);

            const resposta = await request(app)
                .post('/login')
                .send({
                    username: 'tiago',
                    password: '654321',
                });
            expect(resposta.status).to.equal(400)
            expect(resposta.body).to.deep.equal(objetoDeErro)
        })
        it('Quando informo um usuário e senha válidos, recebo o token', async () => {
            const objetoDeSucesso = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRpYWdvIiwiaWF0IjoxNzU1MTA4Nzc2LCJleHAiOjE3NTUxMTIzNzZ9.03OAagyvhXtv11Fzut_wumLR6oBf300ZROW-EfRUbK4' }
            authServiceMock.returns(objetoDeSucesso);

            const resposta = await request(app)
                .post('/login')
                .send({
                    username: 'tiago',
                    password: '123456',
                });
            expect(resposta.body).to.deep.equal(objetoDeSucesso)
        })
    })
    context('getProfile', () => {
        beforeEach(() => {
            authServiceMock = sinon.stub(authService, 'getUserProfile');
            authMiddlewareMock = sinon.stub(authMiddleware, 'authenticateToken')
        })
        it('Quando informo um usuário e senha válidos, demonstro a mensagem de boas-vindas', async () => {
            const user = 'tiago'
            authMiddlewareMock.callsFake((req, res, next) => {
                req.user = { username: user };
                next();
            });

            delete require.cache[require.resolve('../../app')];
            const app = require('../../app');

            authServiceMock.returns({ username: user });

            const resposta = await request(app)
                .get('/profile')
            expect(resposta.body).to.deep.equal({ message: `Welcome, ${user}!` })
        })
    })
})