# Bandmate: Rehearsal Coordination Platform

A comprehensive web application for bands and musical ensembles to efficiently coordinate rehearsals, track attendance, send reminders, and optimize rehearsal times.

## Features

- 📅 **Calendar Management** - Interactive calendar with conflict detection and integration with popular calendar services
- 👥 **Availability Tracking** - One-click responses and visualization of member availability
- 🤖 **Automated Scheduling** - AI-powered suggestions for optimal rehearsal times
- 📱 **Notification System** - Customizable email and SMS reminders with escalation paths
- ✅ **Attendance Tracking** - Digital check-in and historical reporting
- 🎵 **Setlist Management** - Song database with rehearsal priorities and duration calculator
- 📲 **Mobile Responsive** - Full functionality on all devices with offline capabilities

## Technology Stack

### Frontend
- React.js with Next.js
- Redux Toolkit for state management
- Material-UI for components
- Chart.js for data visualization
- FullCalendar.js for calendar integration

### Backend
- Node.js with Express
- RESTful API with GraphQL endpoints
- PostgreSQL database with Redis caching
- JWT authentication with OAuth 2.0
- SendGrid for email and Twilio for SMS

### DevOps
- Docker with Kubernetes orchestration
- AWS or Google Cloud Platform hosting
- GitHub Actions for CI/CD
- ELK Stack for logging

## Setup Instructions

### Prerequisites
- Node.js (v18.x or higher)
- npm (v9.x or higher)
- PostgreSQL (v14.x or higher)
- Redis (v6.x or higher)
- Docker and Docker Compose (optional for containerized setup)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/dxaginfo/bandmate-rehearsal-coordination-platform.git
   cd bandmate-rehearsal-coordination-platform
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install
   
   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the example environment files
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   
   # Edit the .env files with your configuration settings
   ```

4. **Database Setup**
   ```bash
   # Create database
   createdb bandmate_dev
   
   # Run migrations
   cd server
   npm run migrate
   
   # Seed database with sample data (optional)
   npm run seed
   ```

5. **Start the development servers**
   ```bash
   # Start backend server
   cd server
   npm run dev
   
   # In a separate terminal, start frontend
   cd client
   npm run dev
   ```

6. **Access the application**
   - Backend API: http://localhost:5000
   - Frontend application: http://localhost:3000

### Docker Setup

1. **Build and start containers**
   ```bash
   docker-compose up -d
   ```

2. **Access the containerized application**
   - Application: http://localhost:3000
   - API: http://localhost:5000

## Deployment

### Production Build

```bash
# Build frontend
cd client
npm run build

# Start production server
npm start
```

### Kubernetes Deployment

1. Apply Kubernetes configurations:
   ```bash
   kubectl apply -f k8s/
   ```

2. Set up ingress for the application.

## API Documentation

API documentation is available at `/api/docs` when the server is running.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [FullCalendar.js](https://fullcalendar.io/) for the calendar implementation
- [Material-UI](https://material-ui.com/) for the UI components
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management