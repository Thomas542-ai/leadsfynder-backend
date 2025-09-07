# LeadsFynder Backend

NestJS backend API for the LeadsFynder application.

## Features

- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Lead Management**: CRUD operations for leads with Supabase integration
- **Email Campaigns**: Campaign management and analytics
- **Analytics**: Dashboard analytics and reporting
- **Health Monitoring**: API health checks and monitoring

## Tech Stack

- **Framework**: NestJS (Node.js)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT + bcryptjs
- **Language**: TypeScript

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Leads
- `GET /api/leads` - Get all leads
- `GET /api/leads/:id` - Get lead by ID
- `POST /api/leads` - Create new lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead

### Analytics
- `GET /api/analytics/leads` - Lead analytics
- `GET /api/analytics/campaigns` - Campaign analytics
- `GET /api/analytics/revenue` - Revenue analytics

### Health
- `GET /api/health` - API health check
- `GET /api/health/db` - Database health check

## Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Supabase Configuration
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Development

```bash
# Run in development mode with hot reload
npm run dev

# Run tests
npm run test

# Run linting
npm run lint
```

## Deployment

This backend is designed to be deployed on platforms like:
- Railway
- Heroku
- DigitalOcean App Platform
- AWS Elastic Beanstalk

Make sure to set all environment variables in your deployment platform.
