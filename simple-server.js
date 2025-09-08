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

// Login endpoint with proper validation
app.post('/api/auth/login', (req, res) => {
  try {
    console.log('Login request received:', req.body);
    console.log('Request headers:', req.headers);
    console.log('Request origin:', req.get('origin'));
    
    const { email, password } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
        errors: {
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
        errors: {
          email: 'Please enter a valid email address'
        }
      });
    }
    
    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
        errors: {
          password: 'Password must be at least 6 characters'
        }
      });
    }
    
    // Simulate user authentication (in real app, check against database)
    const validUsers = [
      { email: 'admin@leadsfynder.com', password: 'admin123', name: 'Admin User', id: '1' },
      { email: 'user@leadsfynder.com', password: 'user123', name: 'Test User', id: '2' },
      { email: 'demo@leadsfynder.com', password: 'demo123', name: 'Demo User', id: '3' }
    ];
    
    const user = validUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        errors: {
          general: 'Please check your credentials and try again'
        }
      });
    }
    
    // Generate a simple token (in real app, use JWT)
    const token = `jwt_${user.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    res.json({
      success: true,
      message: 'Login successful!',
      timestamp: new Date().toISOString(),
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: 'user'
        },
        token: token,
        expiresIn: '24h'
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

// Register endpoint with proper validation
app.post('/api/auth/register', (req, res) => {
  try {
    console.log('Register request received:', req.body);
    
    const { email, password, firstName, lastName } = req.body;
    
    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
        errors: {
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null,
          firstName: !firstName ? 'First name is required' : null,
          lastName: !lastName ? 'Last name is required' : null
        }
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
        errors: {
          email: 'Please enter a valid email address'
        }
      });
    }
    
    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
        errors: {
          password: 'Password must be at least 6 characters'
        }
      });
    }
    
    // Validate name fields
    if (firstName.length < 2 || lastName.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'First and last names must be at least 2 characters long',
        errors: {
          firstName: firstName.length < 2 ? 'First name must be at least 2 characters' : null,
          lastName: lastName.length < 2 ? 'Last name must be at least 2 characters' : null
        }
      });
    }
    
    // Simulate checking if user already exists (in real app, check database)
    const existingUsers = [
      'admin@leadsfynder.com',
      'user@leadsfynder.com',
      'demo@leadsfynder.com'
    ];
    
    if (existingUsers.includes(email)) {
      return res.status(409).json({
        success: false,
        message: 'User already exists',
        errors: {
          email: 'An account with this email already exists'
        }
      });
    }
    
    // Generate new user ID (in real app, save to database)
    const newUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const token = `jwt_${newUserId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      timestamp: new Date().toISOString(),
      data: {
        user: {
          id: newUserId,
          email: email,
          firstName: firstName,
          lastName: lastName,
          name: `${firstName} ${lastName}`,
          role: 'user',
          createdAt: new Date().toISOString()
        },
        token: token,
        expiresIn: '24h'
      }
    });
    
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Alternative endpoints without /api prefix (for debugging)
app.post('/auth/login', (req, res) => {
  console.log('Direct auth/login request received:', req.body);
  
  const { email, password } = req.body;
  
  // Simple validation for direct endpoint
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }
  
  // Use same validation as main endpoint
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }
  
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters long'
    });
  }
  
  res.json({
    success: true,
    message: 'Direct login endpoint working!',
    timestamp: new Date().toISOString(),
    data: {
      user: {
        id: '999',
        email: email,
        name: 'Direct User',
        role: 'user'
      },
      token: 'direct-jwt-token-99999',
      expiresIn: '24h'
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
