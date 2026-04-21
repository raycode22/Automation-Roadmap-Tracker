# Technical Automation Architect Bootcamp

A fully functional, interactive React web application that houses a 2-week intensive bootcamp curriculum. Built with React, Tailwind CSS, and Lucide Icons.

## 🎯 Features

✅ **Responsive Sidebar Navigation** - Collapsible accordions for Week 1 and Week 2 with Day 1-10 lessons

✅ **Clean Content Area** - Typography-optimized reading pane with markdown-style formatting

✅ **Progress Tracking** - Mark lessons complete with persistent localStorage storage

✅ **Visual Progress Bar** - Real-time progress visualization across 10 lessons

✅ **Interactive Checkmarks** - Visual feedback for completed lessons in the sidebar

✅ **Minimalist Design** - Clean white/gray aesthetic inspired by The Odin Project and FreeCodeCamp

✅ **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices

✅ **Complete Curriculum** - 10 days of technical automation content with learning objectives and hands-on projects

## 📚 Curriculum Overview

### Week 1: Core Logic, AI Integration & CRM Architecture
- **Day 1**: Advanced Prompt Engineering & AI Workflows
- **Day 2**: CRM Architecture & The Lead Engine
- **Day 3**: Integration Architecture & n8n Fundamentals
- **Day 4**: Voice AI Deployment
- **Day 5**: Vibe Coding & Frontend Prototyping

### Week 2: SaaS Ecosystems, Scalability & Proof of Competence
- **Day 6**: Advanced API Routing & Affiliate Systems
- **Day 7**: No-Code SaaS Building & Multi-User Logic
- **Day 8**: Systemic Precision & Debugging Protocol
- **Day 9**: Capstone Architecture (Backend & Integration)
- **Day 10**: Proof of Competence (Frontend & Portfolio)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
automation_project/
├── src/
│   ├── main.jsx           # React entry point
│   └── index.css          # Tailwind CSS
├── bootcamp-app.jsx       # Main app component
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
└── README.md              # This file
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563EB)
- **Success**: Green (#16A34A)
- **Background**: White & Gray-50
- **Text**: Gray-900 & Gray-700

### Typography
- **Headings**: Bold, clear hierarchy
- **Body**: 16px with 1.6 line-height for readability
- **Accent**: Rounded badges and buttons

## 💾 Data Persistence

The app uses browser localStorage to persist progress:
- Completed lessons are automatically saved
- Progress bar updates in real-time
- Data persists across browser sessions

## 🔧 Customization

### Adding New Lessons

Edit `bootcamp-app.jsx` and extend the `curriculum` object:

```javascript
const curriculum = {
  1: [
    // Existing days...
    {
      day: 11,
      title: 'Your New Day',
      focus: 'Focus statement',
      objectives: ['Objective 1', 'Objective 2'],
      project: 'Project description'
    }
  ]
}
```

### Styling

All styling uses Tailwind CSS utility classes. Modify `tailwind.config.js` to customize the theme.

## 🚢 Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop the dist folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Push dist folder to gh-pages branch
```

## 📦 Dependencies

- **React 18.2**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

## 📝 License

This project is open source and available for educational use.

## 🤝 Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ for aspiring Technical Automation Architects
