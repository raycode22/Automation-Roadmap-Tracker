# Technical Automation Architect Bootcamp

A React web application delivering a 14-day intensive bootcamp curriculum for Technical Automation Architects. Built with React, Vite, Tailwind CSS, and Recharts.

## Features

- **Responsive Sidebar Navigation** - Collapsible navigation for all 14 days organized by week
- **Progress Tracking** - Mark lessons complete with localStorage persistence
- **Visual Progress Dashboard** - Analytics showing completion rates, time spent, and activity heatmaps
- **Dark/Light Theme** - Toggle between themes with system preference detection
- **Keyboard Shortcuts** - Navigate lessons and control the interface via keyboard
- **Checklist Validation** - Complete daily checklists before marking lessons done
- **Time Tracking** - Automatic timer tracks time spent on each lesson
- **Search and Filter** - Find lessons by title, phase, or topic
- **Export Functionality** - Export progress data for reporting
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices

## Curriculum Overview

### Week 1: Foundations
- Day 1: Advanced Prompt Engineering & AI Workflows
- Day 2: CRM Architecture & The Lead Engine
- Day 3: Integration Architecture & n8n Fundamentals
- Day 4: Voice AI Deployment
- Day 5: Vibe Coding & Frontend Prototyping
- Day 6: Advanced API Routing & Affiliate Systems
- Day 7: No-Code SaaS Building & Multi-User Logic

### Week 2: Advanced Systems
- Day 8: Systemic Precision & Debugging Protocol
- Day 9: Capstone Architecture (Backend & Integration)
- Day 10: Proof of Competence (Frontend & Portfolio)
- Day 11: Advanced Integrations & Webhooks
- Day 12: Database Architecture & Data Modeling
- Day 13: Authentication & Security Patterns
- Day 14: Final Capstone & Portfolio Review

## Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser to http://localhost:5173

### Production Build

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
├── main.jsx              # Application entry point
├── bootcamp-app.jsx      # Main application component
├── components/           # UI components
│   ├── Dashboard/        # Dashboard and analytics views
│   ├── Lessons/          # Lesson content and exercises
│   ├── Resources/        # Reference materials and checklists
│   └── common/           # Shared UI components
├── hooks/                # Custom React hooks
└── data/                 # Curriculum data and resources
```

## Configuration

Key configuration files:

- `vite.config.js` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS theme customization
- `package.json` - Project dependencies and scripts

## Data Persistence

The application uses browser localStorage to persist:

- Lesson completion status
- Time tracking data
- Theme preferences
- User settings

Data persists across browser sessions and is scoped to the domain.

## Deployment

### Docker

```bash
docker-compose up
```

The application will be available at http://localhost:3000

### Manual Deployment

Build the production assets and serve the `dist` directory using any static file server or hosting platform such as Vercel, Netlify, or GitHub Pages.

## Dependencies

- React 18
- Vite
- Tailwind CSS
- Recharts
- Lucide React

## License

This project is open source and available for educational use.

## Support

For issues or questions, please open an issue in the repository.
