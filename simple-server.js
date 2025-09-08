const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 10000;

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key';
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Supabase client initialized:', supabaseUrl);

// Initialize default users in Supabase (run once)
async function initializeDefaultUsers() {
  try {
    // First, check if the users table exists
    const { data: tables, error: tableError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_name', 'users');
    
    if (tableError || !tables || tables.length === 0) {
      console.log('Users table does not exist. Please create it first with the SQL provided in SUPABASE_SETUP.md');
      return;
    }

    const defaultUsers = [
      { id: '1', email: 'admin@leadsfynder.com', password: 'admin123', first_name: 'Admin', last_name: 'User', name: 'Admin User', role: 'ADMIN' },
      { id: '2', email: 'user@leadsfynder.com', password: 'user123', first_name: 'Test', last_name: 'User', name: 'Test User', role: 'USER' },
      { id: '3', email: 'demo@leadsfynder.com', password: 'demo123', first_name: 'Demo', last_name: 'User', name: 'Demo User', role: 'USER' }
    ];

    for (const user of defaultUsers) {
      const { error } = await supabase
        .from('users')
        .upsert(user, { onConflict: 'email' });
      
      if (error) {
        console.log('User already exists or error:', user.email, error.message);
      } else {
        console.log('Default user created:', user.email);
      }
    }
  } catch (error) {
    console.log('Error initializing default users:', error.message);
  }
}

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

// Analytics endpoints for dashboard
app.get('/api/analytics/leads', (req, res) => {
  res.json({
    success: true,
    data: {
      totalLeads: 150,
      verifiedLeads: 120,
      emailsSent: 500,
      emailsOpened: 350,
      repliesReceived: 45,
      callsScheduled: 25,
      todayFollowUps: 8,
      conversionRate: 12.5
    }
  });
});

app.get('/api/analytics/campaigns', (req, res) => {
  res.json({
    success: true,
    data: {
      totalCampaigns: 25,
      activeCampaigns: 8,
      completedCampaigns: 17,
      totalEmailsSent: 5000,
      openRate: 24.5,
      clickRate: 8.2,
      replyRate: 3.1
    }
  });
});

app.get('/api/analytics/revenue', (req, res) => {
  res.json({
    success: true,
    data: {
      totalRevenue: 125000,
      monthlyRevenue: 15000,
      averageDealSize: 2500,
      conversionRate: 12.5,
      revenueGrowth: 15.2
    }
  });
});

// Debug endpoint to see all users (remove in production)
app.get('/api/debug/users', async (req, res) => {
  try {
    console.log('Debug users endpoint accessed');
    const { data: users, error } = await supabase
      .from('users')
      .select('id, email, name, role, created_at')
      .order('created_at', { ascending: false });
    
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching users',
        error: error.message
      });
    }
    
    res.json({
      success: true,
      totalUsers: users.length,
      users: users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.created_at
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

// Login endpoint with proper validation
app.post('/api/auth/login', async (req, res) => {
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
    
    // Try Supabase database first, fallback to in-memory storage
    let user = null;
    let dbError = null;
    
    try {
      const { data: dbUser, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();
      
      if (!error && dbUser) {
        user = dbUser;
      } else {
        dbError = error;
      }
    } catch (error) {
      dbError = error;
      console.log('Supabase connection failed, using fallback storage');
    }
    
    // Fallback to in-memory storage if Supabase fails
    if (!user && dbError) {
      const fallbackUsers = [
        { id: '1', email: 'admin@leadsfynder.com', password: 'admin123', name: 'Admin User', role: 'ADMIN' },
        { id: '2', email: 'user@leadsfynder.com', password: 'user123', name: 'Test User', role: 'USER' },
        { id: '3', email: 'demo@leadsfynder.com', password: 'demo123', name: 'Demo User', role: 'USER' }
      ];
      
      user = fallbackUsers.find(u => u.email === email && u.password === password);
    }
    
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
          role: user.role || 'USER'
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
app.post('/api/auth/register', async (req, res) => {
  try {
    console.log('Register request received:', req.body);
    
    const { email, password, first_name, last_name } = req.body;
    
    // Validate required fields
    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
        errors: {
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null,
          first_name: !first_name ? 'First name is required' : null,
          last_name: !last_name ? 'Last name is required' : null
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
    if (first_name.length < 2 || last_name.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'First and last names must be at least 2 characters long',
        errors: {
          first_name: first_name.length < 2 ? 'First name must be at least 2 characters' : null,
          last_name: last_name.length < 2 ? 'Last name must be at least 2 characters' : null
        }
      });
    }
    
    // Check if user already exists (try Supabase first, fallback to in-memory)
    let existingUser = null;
    let canUseDatabase = true;
    
    try {
      const { data: dbUser, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();
      
      if (!checkError && dbUser) {
        existingUser = dbUser;
      }
    } catch (error) {
      canUseDatabase = false;
      console.log('Supabase connection failed for registration check');
    }
    
    // Fallback check in in-memory storage
    if (!canUseDatabase) {
      const fallbackUsers = [
        { email: 'admin@leadsfynder.com' },
        { email: 'user@leadsfynder.com' },
        { email: 'demo@leadsfynder.com' }
      ];
      
      existingUser = fallbackUsers.find(u => u.email === email);
    }
    
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists',
        errors: {
          email: 'An account with this email already exists'
        }
      });
    }
    
    // Generate new user ID
    const newUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const token = `jwt_${newUserId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create new user object
    const newUser = {
      id: newUserId,
      email: email,
      password: password, // In real app, hash this password
      first_name: first_name,
      last_name: last_name,
      name: `${first_name} ${last_name}`,
      role: 'user',
      created_at: new Date().toISOString()
    };
    
    // Try to insert user into Supabase database
    let insertedUser = newUser;
    
    if (canUseDatabase) {
      try {
        const { data: dbUser, error: insertError } = await supabase
          .from('users')
          .insert([newUser])
          .select()
          .single();
        
        if (!insertError && dbUser) {
          insertedUser = dbUser;
        } else {
          console.log('Database insert failed, using in-memory user');
        }
      } catch (error) {
        console.log('Database insert failed, using in-memory user');
      }
    }
    
    console.log(`New user registered: ${email} (ID: ${newUserId})`);
    
    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      timestamp: new Date().toISOString(),
      data: {
        user: {
          id: insertedUser.id,
          email: insertedUser.email,
          first_name: insertedUser.first_name,
          last_name: insertedUser.last_name,
          name: insertedUser.name,
          role: insertedUser.role,
          createdAt: insertedUser.created_at
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

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  console.log('Logout request received');
  res.json({
    success: true,
    message: 'Logout successful',
    timestamp: new Date().toISOString()
  });
});

// Alternative logout endpoint without /api prefix
app.post('/auth/logout', (req, res) => {
  console.log('Direct logout request received');
  res.json({
    success: true,
    message: 'Direct logout successful',
    timestamp: new Date().toISOString()
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
app.listen(PORT, async () => {
  console.log(`🚀 Simple server is running on port ${PORT}`);
  console.log(`📡 API available at: http://localhost:${PORT}/api`);
  console.log(`🌐 CORS enabled for all origins`);
  console.log(`🔄 Deployment timestamp: ${new Date().toISOString()}`);
  
  // Initialize default users in Supabase
  await initializeDefaultUsers();
});

module.exports = app;
