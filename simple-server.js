const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://*.vercel.app',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
  ],
}));

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'LeadsFynder Backend API - Simple Server Working!',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      login: '/api/auth/login'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Backend is running correctly!'
  });
});

// Simple login endpoint
app.post('/api/auth/login', (req, res) => {
  console.log('Login request received:', req.body);
  
  res.json({
    success: true,
    message: 'Login successful!',
    timestamp: new Date().toISOString(),
    data: {
      user: {
        id: '123',
        email: req.body.email || 'test@test.com',
        name: 'Test User'
      },
      token: 'fake-jwt-token-12345'
    }
  });
});

// Simple register endpoint
app.post('/api/auth/register', (req, res) => {
  console.log('Register request received:', req.body);
  
  res.json({
    success: true,
    message: 'Registration successful!',
    timestamp: new Date().toISOString(),
    data: {
      user: {
        id: '456',
        email: req.body.email || 'new@test.com',
        name: req.body.firstName || 'New User'
      },
      token: 'fake-jwt-token-67890'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Simple server is running on port ${PORT}`);
  console.log(`📡 API available at: http://localhost:${PORT}/api`);
});

module.exports = app;
