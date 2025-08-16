const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { registerUser, loginUser, getProfile } = require('./controller/authController');

const { authenticateToken } = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());

// Swagger endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Auth routes
app.post('/register', registerUser);
app.post('/login', loginUser);

// Protected profile route
app.get('/profile', authenticateToken, getProfile);

module.exports = app;
