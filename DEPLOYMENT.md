# LeadsFynder Backend Deployment Guide

## Architecture Overview
- **Frontend**: Deployed on Vercel.com
- **Backend**: Deployed on Render.com
- **Database**: Supabase.com (shared between frontend and backend)

## Environment Variables for Render.com

Set these environment variables in your Render.com dashboard:

### Required Variables:
```
NODE_ENV=production
PORT=10000
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-frontend-app.vercel.app
```

### How to Get Supabase Credentials:
1. Go to your Supabase project dashboard
2. Go to Settings > API
3. Copy the Project URL (SUPABASE_URL)
4. Copy the service_role key (SUPABASE_SERVICE_ROLE_KEY)

## Deployment Steps

### 1. Deploy Backend to Render.com:
1. Connect your GitHub repository to Render.com
2. Create a new Web Service
3. Use the `render.yaml` configuration file
4. Set all required environment variables
5. Deploy!

### 2. Deploy Frontend to Vercel:
1. Connect your frontend repository to Vercel
2. Configure the frontend to use your Render.com backend URL
3. Deploy!

## API Endpoints

Your backend will be available at:
- `https://your-app.onrender.com/api/`
- `https://your-app.onrender.com/api/health`
- `https://your-app.onrender.com/api/auth`
- `https://your-app.onrender.com/api/leads`
- `https://your-app.onrender.com/api/campaigns`

## CORS Configuration

The backend is configured to accept requests from:
- Local development (localhost:3000, localhost:5173)
- Vercel frontend domains (*.vercel.app)
- Your production frontend URL

## Testing

Test your deployment:
```bash
curl https://your-app.onrender.com/api/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "message": "Backend is running correctly!"
}
```
