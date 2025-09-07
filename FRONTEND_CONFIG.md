# Frontend Configuration for Vercel Deployment

## Environment Variables for Frontend (Vercel)

Set these environment variables in your Vercel dashboard:

### Required Variables:
```
NEXT_PUBLIC_API_URL=https://your-backend-app.onrender.com/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### How to Get Supabase Credentials:
1. Go to your Supabase project dashboard
2. Go to Settings > API
3. Copy the Project URL (NEXT_PUBLIC_SUPABASE_URL)
4. Copy the anon/public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

## Frontend API Configuration

In your frontend code, configure the API client:

```typescript
// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const apiClient = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Example API call
export const fetchLeads = async () => {
  const response = await fetch(`${API_BASE_URL}/leads`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.json();
};
```

## Supabase Client Configuration

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## Deployment Steps

### 1. Deploy Frontend to Vercel:
1. Connect your frontend repository to Vercel
2. Set the environment variables listed above
3. Deploy!

### 2. Update Backend CORS:
After deploying your frontend, update the `FRONTEND_URL` environment variable in Render.com with your actual Vercel URL.

## Architecture Flow

```
Frontend (Vercel) → Backend (Render) → Database (Supabase)
     ↓                    ↓                    ↓
- React/Next.js      - NestJS API         - PostgreSQL
- User Interface     - Business Logic     - Real-time features
- Client-side auth   - Server-side auth   - Data storage
```

## Testing the Connection

1. Deploy both frontend and backend
2. Test API calls from frontend to backend
3. Verify database operations work correctly
4. Test authentication flow

## Troubleshooting

### CORS Issues:
- Ensure `FRONTEND_URL` in Render.com matches your Vercel URL
- Check that CORS origins include `*.vercel.app`

### API Connection Issues:
- Verify `NEXT_PUBLIC_API_URL` points to your Render.com backend
- Check that backend is running and accessible

### Database Issues:
- Verify Supabase credentials are correct
- Check that database tables exist
- Ensure RLS policies are configured properly
