# Automation Roadmap Tracker

A comprehensive web application for tracking progress through a 6-week automation roadmap training program. Built with React, Node.js, PostgreSQL, and Docker.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure signup/login with JWT tokens
- **Progress Tracking**: Mark activities as Not Started/In Progress/Done
- **Interactive Dashboard**: Visual progress charts and statistics
- **Artifact Management**: Upload and organize project deliverables
- **Weekly Breakdown**: Structured 6-week program tracking
- **Export/Import**: JSON/CSV data export and import capabilities

### Technical Features
- **Docker Deployment**: One-command setup with docker-compose
- **RESTful API**: Complete CRUD operations with OpenAPI documentation
- **Real-time Updates**: Live progress tracking and dashboard updates
- **Responsive Design**: Mobile and tablet-friendly interface
- **File Upload**: Secure file handling with size limits
- **Comprehensive Testing**: Jest integration tests + Cypress E2E tests

## 🛠️ Tech Stack

### Backend
- **Node.js** + **TypeScript** + **Express**
- **PostgreSQL** + **Prisma ORM**
- **JWT Authentication** + **bcrypt password hashing**
- **Multer** for file uploads
- **Zod** for input validation

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** for styling
- **Chart.js** for data visualization
- **React Router** for navigation
- **React Hook Form** + **Zod** for form management

### Infrastructure
- **Docker** + **docker-compose**
- **PostgreSQL** database
- **Nginx** for frontend serving
- **Comprehensive CI/CD** with GitHub Actions

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Git

## 🚀 Quick Start

### 1. Clone and Setup
```bash
git clone <repository-url>
cd automation-roadmap-tracker
```

### 2. Start with Docker (Recommended)
```bash
# Start all services
docker-compose up --build

# Or start in background
docker-compose up --build -d
```

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Database**: localhost:5432

### 4. Default Credentials
- Create a new account through the signup form
- No default admin user is created for security

## 🏗️ Architecture

### Project Structure
```
automation-roadmap-tracker/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/     # Auth, error handling
│   │   └── server.ts       # Main application
│   ├── prisma/             # Database schema
│   └── tests/              # Integration tests
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   └── lib/            # Utilities and API
│   └── cypress/            # E2E tests
├── seed/                   # Database seed data
└── docker-compose.yml      # Service orchestration
```

### Database Schema
- **Users**: Authentication and profile data
- **RoadmapWeeks**: 6-week program structure
- **RoadmapDays**: Daily breakdown per week
- **Activities**: Individual tasks and activities
- **UserProgress**: User completion tracking
- **Artifacts**: Project deliverables and files
- **Metrics**: Aggregated statistics

## 📊 API Documentation

### Authentication Endpoints
```
POST /api/auth/signup      # Register new user
POST /api/auth/login       # User login
GET  /api/auth/me          # Get current user
POST /api/auth/logout      # User logout
```

### Roadmap Endpoints
```
GET  /api/roadmap/weeks    # Get all weeks with activities
GET  /api/roadmap/weeks/:id # Get specific week
GET  /api/roadmap/days/:id  # Get specific day
```

### Progress Endpoints
```
POST /api/progress         # Create/update progress
GET  /api/progress         # Get user progress
GET  /api/progress/export  # Export progress data
POST /api/progress/import  # Import progress data
```

### Dashboard Endpoints
```
GET  /api/dashboard        # Get dashboard statistics
GET  /api/dashboard/streak # Get streak information
```

### Artifact Endpoints
```
POST   /api/artifacts          # Create artifact
GET    /api/artifacts          # Get user artifacts
GET    /api/artifacts/:id      # Get specific artifact
PUT    /api/artifacts/:id      # Update artifact
DELETE /api/artifacts/:id      # Delete artifact
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

### Frontend Tests
```bash
cd frontend
npm test                # Unit tests with Vitest
npm run test:ui         # UI test runner
npx cypress open       # Interactive E2E tests
npx cypress run        # Headless E2E tests
```

### Test Coverage
- **Integration Tests**: API endpoint testing with seed data
- **E2E Tests**: Complete user journey testing
- **Unit Tests**: Component and utility testing

## 📈 Dashboard Features

### Visual Analytics
- **Overall Progress Ring**: Completion percentage visualization
- **Weekly Progress Bars**: Week-by-week completion tracking
- **Daily Completion Timeline**: 30-day activity trend
- **Tool Usage Breakdown**: Skills and technology tracking
- **Current Streak Counter**: Consecutive days tracking

### Interactive Charts
- **Hover Details**: Tooltip information on hover
- **Week Filtering**: Focus on specific time periods
- **Real-time Updates**: Live data refresh
- **Export Capabilities**: Chart data export

## 🔧 Development

### Local Development Setup
```bash
# Backend setup
cd backend
npm install
npm run dev             # Development server

# Frontend setup (in another terminal)
cd frontend
npm install
npm run dev             # Development server
```

### Database Operations
```bash
cd backend
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:seed      # Seed database
npm run prisma:studio    # Database GUI
```

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/automation_roadmap
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=4000
NODE_ENV=development
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:4000
VITE_NODE_ENV=development
```

## 🚢 Deployment

### Docker Production
```bash
# Build and start production services
docker-compose -f docker-compose.prod.yml up --build

# Scale services
docker-compose up --scale backend=3 --scale frontend=2
```

### Environment Setup
1. Change default JWT secret in production
2. Configure proper database credentials
3. Set up SSL certificates
4. Configure CORS for production domains
5. Set up monitoring and logging

## 📚 6-Week Roadmap Structure

### Week 1: Foundation & API Mastery
- **Days**: 7 days of API testing fundamentals
- **Tools**: Postman, JSON handling, basic automation
- **Focus**: API testing, authentication, documentation

### Week 2: Workflow Automation with n8n
- **Days**: 7 days of visual workflow building
- **Tools**: n8n, API integrations, email automation
- **Focus**: Workflow automation, data processing

### Week 3: Google Apps Script Mastery
- **Days**: 7 days of Google Workspace automation
- **Tools**: Apps Script, Sheets, Gmail, Drive
- **Focus**: Workspace integration, document automation

### Week 4: Modern Workflow Builder - Activepieces
- **Days**: 7 days of advanced workflow management
- **Tools**: Activepieces, database integration, UI building
- **Focus**: Scalable automation, user interfaces

### Week 5: AI-Powered Automation
- **Days**: 7 days of AI integration
- **Tools**: AI APIs, content generation, intelligent automation
- **Focus**: AI integration, predictive analytics

### Week 6: Portfolio & Career Development
- **Days**: 7 days of professional development
- **Tools**: React, portfolio website, job search
- **Focus**: Career preparation, portfolio building

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Zod schema validation
- **File Upload Security**: Size limits and type checking
- **CORS Protection**: Configured for production
- **Rate Limiting**: API request throttling
- **SQL Injection Protection**: Prisma ORM safeguards

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Update documentation
- Follow commit message conventions
- Ensure Docker setup works

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

**Database Connection Error**
```bash
# Reset database
docker-compose down
docker-compose up --build
```

**Port Already in Use**
```bash
# Kill processes on ports
lsof -ti:3000 | xargs kill
lsof -ti:4000 | xargs kill
lsof -ti:5432 | xargs kill
```

**Module Not Found**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Getting Help
- Check the [Issues](https://github.com/your-repo/issues) page
- Review the [Wiki](https://github.com/your-repo/wiki) documentation
- Join our [Discord community](https://discord.gg/your-server)

## 🎯 Future Enhancements

### Planned Features
- [ ] Real-time collaboration features
- [ ] Mobile app development
- [ ] Advanced analytics and reporting
- [ ] Integration with external learning platforms
- [ ] AI-powered progress recommendations
- [ ] Gamification elements and achievements
- [ ] Multi-language support
- [ ] Advanced role-based permissions

### Technical Improvements
- [ ] GraphQL API implementation
- [ ] Microservices architecture
- [ ] Advanced caching strategies
- [ ] Performance optimization
- [ ] Enhanced security measures
- [ ] Automated deployment pipelines

---

Built with ❤️ by MiniMax Agent for automation engineers and developers.