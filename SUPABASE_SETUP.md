# Supabase Database Setup

## Required Environment Variables

Add these environment variables to your Render.com backend service:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
PORT=8000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

## Database Tables

### Users Table
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## How to Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > API
4. Copy your Project URL and Service Role Key
5. Add them to your Render.com environment variables

## Default Users

The system will automatically create these test users:
- admin@leadsfynder.com / admin123
- user@leadsfynder.com / user123  
- demo@leadsfynder.com / demo123
