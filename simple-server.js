const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware - Fix CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost for development
    if (origin.includes('localhost')) return callback(null, true);
    
    // Allow Vercel domains
    if (origin.includes('vercel.app')) return callback(null, true);
    
    // Allow specific frontend URL
    if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
      return callback(null, true);
    }
    
    // Allow all origins for now (you can restrict this later)
    return callback(null, true);
  },
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
  try {
    console.log('Login request received:', req.body);
    console.log('Request headers:', req.headers);
    console.log('Request origin:', req.get('origin'));
    
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
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
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

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: err.message
  });
});

// Handle 404 errors
app.use((req, res) => {
  console.log('404 - Route not found:', req.method, req.path);
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Simple server is running on port ${PORT}`);
  console.log(`📡 API available at: http://localhost:${PORT}/api`);
  console.log(`🌐 CORS enabled for all origins`);
});

module.exports = app;
