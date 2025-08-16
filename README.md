# API de Login

API Rest para registro e login de usuários, com autenticação via Bearer Token (JWT). Utiliza banco de dados em memória (variáveis) e é ideal para aprendizado de testes e automação de APIs.

## Funcionalidades
- Registro de usuário (não permite duplicidade)
- Login de usuário (retorna JWT)
- Rota protegida de perfil
- Documentação Swagger disponível

## Instalação

1. Clone o repositório ou copie os arquivos para sua máquina.
2. Instale as dependências:
   ```
npm install express jsonwebtoken swagger-ui-express
   ```

## Como rodar

- Para iniciar o servidor:
  ```
  node server.js
  ```
- A API estará disponível em `http://localhost:3000`
- Acesse a documentação Swagger em `http://localhost:3000/api-docs`

## Endpoints

- `POST /register` — Registro de usuário
- `POST /login` — Login de usuário
- `GET /profile` — Rota protegida (requer Bearer Token)

## Exemplo de uso

### Registro
```json
POST /register
{
  "username": "usuario1",
  "password": "senha123"
}
```

### Login
```json
POST /login
{
  "username": "usuario1",
  "password": "senha123"
}
// Resposta: { "token": "..." }
```

### Acesso protegido
Enviar o token no header:
```
Authorization: Bearer <token>
```

## Testes

Para testar com Supertest, importe o `app.js` diretamente.

## Observações
- Todos os dados são voláteis (em memória).
- Não use em produção.
