# Smart Factory Scheduler

A multi-tenant SaaS platform for intelligent machine task scheduling powered by Genetic Algorithm optimization. Built for manufacturing industries to optimize production schedules, manage resources, and improve operational efficiency.

## Overview

Smart Factory Scheduler is an enterprise-grade scheduling solution that helps manufacturing facilities:
- Optimize machine utilization through AI-powered scheduling
- Manage complex multi-step manufacturing workflows
- Handle priority-based orders with dynamic rescheduling
- Track workforce, materials, and production in real-time
- Support multiple industries with complete data isolation

## Key Features

### Genetic Algorithm Optimization
- Intelligent scheduling engine that finds optimal production sequences
- Automatic schedule regeneration based on priority changes
- Resource optimization with constraint handling
- Real-time adaptation to maintenance and disruptions

### Multi-Tenant Architecture
- Complete data isolation between industries
- Subscription-based feature access
- Scalable infrastructure supporting unlimited tenants
- Centralized platform management

### Comprehensive Management
- **Machine Management**: Track machine status, maintenance, and utilization
- **Component Management**: Multi-step manufacturing workflows with internal/external operations
- **Raw Material Tracking**: Inventory management with automatic reorder suggestions
- **Order Management**: Priority-based scheduling with deadline tracking
- **Workforce Scheduling**: Team assignments and shift management

### Internationalization
- Multi-language support (English, Gujarati, Hindi)
- RTL text support
- Localized date/time formats

## Tech Stack

### Backend
- **Framework**: Elysia (TypeScript/Bun runtime)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based with role-based access control
- **Real-time**: WebSocket for live updates

### Frontend
- **Framework**: Next.js 14 with TypeScript
- **UI Components**: Tailwind CSS + shadcn/ui
- **State Management**: React Context/Zustand
- **Internationalization**: next-i18n

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions
- **Cloud**: AWS/Azure/GCP compatible

## Prerequisites

- Node.js 18+ or Bun 1.0+
- PostgreSQL 14+
- Docker (optional, for containerized deployment)

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Pushparaj13811/smart-factory-scheduler.git
cd smart-factory-scheduler
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
bun install

# Setup environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
bunx prisma migrate dev

# Seed the database (optional)
bunx prisma db seed

# Start the backend server
bun run dev
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with API endpoints

# Start the development server
npm run dev
```

### 4. Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Documentation: http://localhost:3001/swagger

## User Roles

### System Level
- **System Administrator**: Platform management, multi-industry oversight, subscription management

### Industry Level (Per Tenant)
- **Industry Owner**: Full industry access, subscription management, industry configuration
- **Administrator**: Machine/component/material management, order creation, reporting
- **Supervisor**: Team management, task oversight, performance monitoring
- **Worker/Operator**: Personal task viewing, completion updates, machine operation

## Project Structure

```
smart-factory-scheduler/
├── backend/
│   ├── src/
│   │   ├── controllers/     # API route handlers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Data models
│   │   ├── middlewares/     # Auth, validation, etc.
│   │   ├── utils/           # Utility functions
│   │   └── algorithms/      # Genetic algorithm implementation
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── migrations/      # Database migrations
│   └── tests/               # Backend tests
│
├── frontend/
│   ├── src/
│   │   ├── app/            # Next.js app router pages
│   │   ├── components/     # React components
│   │   ├── lib/           # Utility libraries
│   │   ├── hooks/         # Custom React hooks
│   │   ├── styles/        # Global styles
│   │   └── types/         # TypeScript types
│   └── public/            # Static assets
│
├── docker/               # Docker configurations
├── k8s/                 # Kubernetes manifests
└── docs/               # Documentation

```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token

### Machines
- `GET /api/machines` - List all machines
- `POST /api/machines` - Create new machine
- `PUT /api/machines/:id` - Update machine
- `DELETE /api/machines/:id` - Delete machine
- `POST /api/machines/:id/maintenance` - Toggle maintenance status

### Components
- `GET /api/components` - List all components
- `POST /api/components` - Create new component
- `PUT /api/components/:id` - Update component
- `DELETE /api/components/:id` - Delete component

### Orders
- `GET /api/orders` - List all orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id/priority` - Update order priority
- `DELETE /api/orders/:id` - Cancel order

### Scheduling
- `GET /api/schedules/current` - Get current schedule
- `POST /api/schedules/optimize` - Trigger schedule optimization
- `GET /api/schedules/machine/:id` - Get machine schedule
- `GET /api/schedules/worker/:id` - Get worker schedule

## Testing

### Backend Tests
```bash
cd backend
bun test
```

### Frontend Tests
```bash
cd frontend
npm run test
npm run test:e2e  # End-to-end tests
```

## Database Schema

The system uses a multi-tenant PostgreSQL database with the following core entities:

- **Industries**: Tenant organizations
- **Users**: System users with role-based access
- **Machines**: Manufacturing equipment
- **Components**: Products with multi-step operations
- **RawMaterials**: Input materials for production
- **Orders**: Customer orders with priorities
- **Schedules**: Optimized production schedules
- **Operations**: Manufacturing steps for components

## Security

- JWT-based authentication with refresh tokens
- Role-based access control (RBAC)
- Data encryption at rest and in transit
- Multi-tenant data isolation
- API rate limiting
- Input validation and sanitization
- Regular security audits

## Deployment

### Docker Deployment
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d
```

### Kubernetes Deployment
```bash
# Apply configurations
kubectl apply -f k8s/

# Check deployment status
kubectl get pods -n smart-factory
```

## Performance

- Response time: < 2 seconds for standard operations
- Supports 1000+ concurrent users per tenant
- Real-time updates with < 1 second latency
- Horizontal scaling with load balancing
- Redis caching for improved performance

## License

This is a proprietary software project. All rights reserved.

## Support

- **Documentation**: [docs.smartfactoryscheduler.com](https://docs.smartfactoryscheduler.com)
- **Contact**: For support and inquiries, please contact the development team
- **Email**: support@smartfactoryscheduler.com

## Roadmap

### Current Features
- Multi-tenant architecture
- Genetic algorithm scheduling
- Real-time updates
- Role-based access control
- Multi-language support

### Upcoming Features
- [ ] RAG Chatbot integration for intelligent assistance
- [ ] IoT device integration for real-time machine data
- [ ] Predictive maintenance using machine learning
- [ ] Advanced analytics dashboard
- [ ] Mobile applications (iOS/Android)
- [ ] Third-party API integrations
- [ ] Custom report builder

## Acknowledgments

- Special thanks to the open-source community for the amazing tools and libraries that power this platform

---

**Smart Factory Scheduler** - Optimizing Manufacturing, One Schedule at a Time