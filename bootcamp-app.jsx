import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Target,
  Zap,
  BookOpen,
  Lightbulb,
  ClipboardList,
  ExternalLink,
  Moon,
  Sun,
  Menu,
  X,
  Tent,
  BarChart3,
  Clock,
  Trophy,
  TrendingUp,
  Calendar,
  Award,
  CheckCircle2,
  Play,
  Square,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import bootcampData from "./bootcampData.js";
import Sidebar from "./src/components/Sidebar";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const BootcampApp = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [expandedWeeks, setExpandedWeeks] = useState({ 1: true, 2: false });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lessonTimeSpent, setLessonTimeSpent] = useState({});
  const [lessonStatus, setLessonStatus] = useState({}); // 'not_started', 'in_progress', 'completed'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const curriculum = bootcampData.lessons;

  // Load progress and theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("bootcampProgress");
    if (saved) setCompletedLessons(JSON.parse(saved));

    const savedTime = localStorage.getItem("lessonTimeSpent");
    if (savedTime) setLessonTimeSpent(JSON.parse(savedTime));

    const savedStatus = localStorage.getItem("lessonStatus");
    if (savedStatus) setLessonStatus(JSON.parse(savedStatus));

    const savedTheme = localStorage.getItem("bootcampTheme");
    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme));
    } else {
      const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(systemDarkMode);
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (e) => {
      const savedTheme = localStorage.getItem("bootcampTheme");
      if (savedTheme === null) {
        setDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleThemeChange);
    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  // Save progress and theme to localStorage
  useEffect(() => {
    localStorage.setItem("bootcampProgress", JSON.stringify(completedLessons));
    localStorage.setItem("bootcampTheme", JSON.stringify(darkMode));
    localStorage.setItem("lessonTimeSpent", JSON.stringify(lessonTimeSpent));
    localStorage.setItem("lessonStatus", JSON.stringify(lessonStatus));
  }, [completedLessons, darkMode, lessonTimeSpent, lessonStatus]);

  // Handle starting a lesson
  const startLesson = useCallback((day) => {
    setLessonStatus(prev => ({
      ...prev,
      [day]: 'in_progress'
    }));
    setCurrentDay(day);
    setActiveTab("lessons");
  }, []);

  // Handle completing a lesson with time tracking
  const toggleCompletion = useCallback((day) => {
    const isCurrentlyCompleted = completedLessons.includes(day);
    
    if (!isCurrentlyCompleted) {
      // Mark as complete and record time
      const endTime = Date.now();
      const startTime = lessonStatus[day]?.startTime || endTime;
      const timeSpent = Math.round((endTime - startTime) / 1000);
      
      setLessonTimeSpent(prev => ({
        ...prev,
        [day]: (prev[day] || 0) + timeSpent
      }));
      
      setLessonStatus(prev => ({
        ...prev,
        [day]: 'completed'
      }));
      
      setCompletedLessons(prev => [...prev, day]);
    } else {
      // Mark as incomplete
      setCompletedLessons(prev => prev.filter(d => d !== day));
      setLessonStatus(prev => ({
        ...prev,
        [day]: 'not_started'
      }));
    }
  }, [completedLessons, lessonStatus]);

  const handleStartOrComplete = useCallback((day) => {
    const status = lessonStatus[day];
    if (!status || status === 'not_started') {
      startLesson(day);
    } else if (status === 'in_progress') {
      toggleCompletion(day);
    }
  }, [lessonStatus, startLesson, toggleCompletion]);

  // Analytics calculations
  const analytics = useMemo(() => {
    const timeData = Object.entries(lessonTimeSpent).map(([day, seconds]) => ({
      day: parseInt(day),
      timeSpent: seconds,
      title: curriculum.find(l => l.day === parseInt(day))?.title || `Day ${day}`
    }));

    const sortedByTime = [...timeData].sort((a, b) => b.timeSpent - a.timeSpent);
    const longestLesson = sortedByTime[0];
    const fastestLesson = sortedByTime.length > 1 ? sortedByTime[sortedByTime.length - 1] : null;

    const weeklyProgress = [1, 2].map(week => {
      const weekLessons = curriculum.filter(l => l.week === week);
      const completedWeekLessons = weekLessons.filter(l => completedLessons.includes(l.day));
      return {
        week: `Week ${week}`,
        completed: completedWeekLessons.length,
        total: weekLessons.length,
        percentage: Math.round((completedWeekLessons.length / weekLessons.length) * 100)
      };
    });

    const categoryData = (() => {
      const categories = {};
      curriculum.forEach(lesson => {
        const status = lesson.status || 'general';
        if (!categories[status]) {
          categories[status] = { name: status, completed: 0, total: 0 };
        }
        categories[status].total++;
        if (completedLessons.includes(lesson.day)) {
          categories[status].completed++;
        }
      });
      return Object.values(categories);
    })();

    return { timeData, longestLesson, fastestLesson, weeklyProgress, categoryData };
  }, [lessonTimeSpent, completedLessons, curriculum]);

  // Memoized handlers
  const toggleWeek = useCallback((week) => {
    setExpandedWeeks((prev) => ({ ...prev, [week]: !prev[week] }));
  }, []);

  const isCompleted = useCallback((day) => completedLessons.includes(day), [completedLessons]);

  const lesson = useMemo(() => curriculum.find((l) => l.day === currentDay), [curriculum, currentDay]);
  
  const progressPercent = useMemo(() => 
    Math.round((completedLessons.length / curriculum.length) * 100),
    [completedLessons.length, curriculum.length]
  );

  // Load progress and theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("bootcampProgress");
    if (saved) setCompletedLessons(JSON.parse(saved));

    const savedTime = localStorage.getItem("lessonTimeSpent");
    if (savedTime) setLessonTimeSpent(JSON.parse(savedTime));

    const savedTheme = localStorage.getItem("bootcampTheme");
    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme));
    } else {
      const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(systemDarkMode);
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (e) => {
      const savedTheme = localStorage.getItem("bootcampTheme");
      if (savedTheme === null) {
        setDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleThemeChange);
    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  // Save progress and theme to localStorage
  useEffect(() => {
    localStorage.setItem("bootcampProgress", JSON.stringify(completedLessons));
    localStorage.setItem("bootcampTheme", JSON.stringify(darkMode));
  }, [completedLessons, darkMode]);

  // Sidebar navigation handler
  const handleNavigate = useCallback((tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  }, []);

  // Handle day selection
  const handleSelectDay = useCallback((day) => {
    setCurrentDay(day);
    setActiveTab("lessons");
    setSidebarOpen(false);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Sidebar
        currentDay={currentDay}
        completedLessons={completedLessons}
        expandedWeeks={expandedWeeks}
        activeTab={activeTab}
        darkMode={darkMode}
        sidebarOpen={sidebarOpen}
        curriculum={curriculum}
        progressPercent={progressPercent}
        onToggleWeek={toggleWeek}
        onSelectDay={handleSelectDay}
        onNavigate={handleNavigate}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto w-full ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-12">
          {activeTab === "dashboard" && (
            <Dashboard
              analytics={analytics}
              completedLessons={completedLessons}
              curriculum={curriculum}
              progressPercent={progressPercent}
              lessonTimeSpent={lessonTimeSpent}
              darkMode={darkMode}
            />
          )}

          {activeTab === "lessons" && !lesson && (
            <EmptyState
              darkMode={darkMode}
              icon={BookOpen}
              title="Select a Lesson to Begin"
              description="Choose a lesson from the sidebar to start learning"
            />
          )}

          {activeTab === "lessons" && lesson && (
            <LessonView
              lesson={lesson}
              currentDay={currentDay}
              isCompleted={isCompleted}
              toggleCompletion={toggleCompletion}
              darkMode={darkMode}
            />
          )}

          {activeTab === "resources" && (
            <ResourcesView resources={bootcampData.resources} darkMode={darkMode} />
          )}

          {activeTab === "reference" && (
            <ReferenceView reference={bootcampData.quickReference} darkMode={darkMode} />
          )}

          {activeTab === "checklists" && (
            <ChecklistsView checklists={bootcampData.checklists} darkMode={darkMode} />
          )}

          {activeTab === "instructor" && (
            <InstructorView instructor={bootcampData.instructor} darkMode={darkMode} />
          )}
        </div>
      </main>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ analytics, completedLessons, curriculum, progressPercent, lessonTimeSpent, darkMode }) => (
  <>
    <div className="mb-8">
      <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
        Learning Dashboard
      </h1>
      <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        Track your progress to become a Technical Automation Architect
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      <StatCard
        icon={Trophy}
        label="Completed"
        value={`${completedLessons.length}/${curriculum.length}`}
        subtext="lessons done"
        colorClass={darkMode ? "bg-blue-900 bg-opacity-20 border-blue-700" : "bg-blue-50 border-blue-200"}
        iconColor="text-yellow-500"
        darkMode={darkMode}
      />
      <StatCard
        icon={TrendingUp}
        label="Progress"
        value={`${progressPercent}%`}
        subtext="overall completion"
        colorClass={darkMode ? "bg-green-900 bg-opacity-20 border-green-700" : "bg-green-50 border-green-200"}
        iconColor="text-green-500"
        darkMode={darkMode}
      />
      <StatCard
        icon={Clock}
        label="Time Spent"
        value={`${Math.round(Object.values(lessonTimeSpent).reduce((a, b) => a + b, 0) / 60)}m`}
        subtext="total learning time"
        colorClass={darkMode ? "bg-purple-900 bg-opacity-20 border-purple-700" : "bg-purple-50 border-purple-200"}
        iconColor="text-purple-500"
        darkMode={darkMode}
      />
      <StatCard
        icon={Award}
        label="Streak"
        value={completedLessons.length}
        subtext="days active"
        colorClass={darkMode ? "bg-orange-900 bg-opacity-20 border-orange-700" : "bg-orange-50 border-orange-200"}
        iconColor="text-orange-500"
        darkMode={darkMode}
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <ChartCard
        title="Time Spent Per Lesson"
        icon={Clock}
        iconColor="text-blue-500"
        darkMode={darkMode}
      >
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={analytics.timeData.length > 0 ? analytics.timeData : [{day: 0, timeSpent: 0, title: 'No data yet'}]}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
            <XAxis 
              dataKey="day" 
              tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 12 }}
              label={{ value: 'Day', position: 'insideBottom', offset: -5, fill: darkMode ? "#9ca3af" : "#6b7280" }}
            />
            <YAxis 
              tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 12 }}
              label={{ value: 'Seconds', angle: -90, position: 'insideLeft', fill: darkMode ? "#9ca3af" : "#6b7280" }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: darkMode ? "#1f2937" : "#fff", 
                border: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`,
                borderRadius: '8px'
              }}
              labelStyle={{ color: darkMode ? "#fff" : "#111" }}
              formatter={(value) => [`${Math.round(value)}s`, 'Time']}
            />
            <Bar dataKey="timeSpent" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Progress by Topic"
        icon={Target}
        iconColor="text-green-500"
        darkMode={darkMode}
      >
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={analytics.categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${Math.round(percent * 100)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="completed"
            >
              {analytics.categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % 5]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: darkMode ? "#1f2937" : "#fff", 
                border: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`,
                borderRadius: '8px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {analytics.longestLesson && (
        <RecordCard
          title="Most Challenging Lesson"
          icon={Clock}
          value={`Day ${analytics.longestLesson.day}: ${analytics.longestLesson.title}`}
          metric={`${Math.round(analytics.longestLesson.timeSpent / 60)} minutes`}
          message="This lesson took the longest time - consider reviewing the concepts again!"
          colorClass={darkMode ? "bg-red-900 bg-opacity-20 border-red-700" : "bg-red-50 border-red-200"}
          textColor={darkMode ? "text-red-300" : "text-red-700"}
          metricColor={darkMode ? "text-red-400" : "text-red-600"}
          darkMode={darkMode}
        />
      )}

      {analytics.fastestLesson && (
        <RecordCard
          title="Quickest Lesson"
          icon={Zap}
          value={`Day ${analytics.fastestLesson.day}: ${analytics.fastestLesson.title}`}
          metric={`${analytics.fastestLesson.timeSpent} seconds`}
          message="You mastered this one quickly! Great job understanding these concepts."
          colorClass={darkMode ? "bg-green-900 bg-opacity-20 border-green-700" : "bg-green-50 border-green-200"}
          textColor={darkMode ? "text-green-300" : "text-green-700"}
          metricColor={darkMode ? "text-green-400" : "text-green-600"}
          darkMode={darkMode}
        />
      )}
    </div>

    <div className={`p-6 rounded-xl border-2 mb-6 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
        <Calendar size={20} className="text-orange-500" />
        Weekly Progress
      </h2>
      <div className="space-y-4">
        {analytics.weeklyProgress.map((week) => (
          <div key={week.week}>
            <div className="flex justify-between mb-2">
              <span className={`font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{week.week}</span>
              <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                {week.completed}/{week.total} lessons ({week.percentage}%)
              </span>
            </div>
            <div className={`w-full h-4 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
              <div 
                className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                style={{ width: `${week.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className={`p-6 rounded-xl border-2 ${darkMode ? "bg-gradient-to-r from-blue-900 to-purple-900 border-blue-700" : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"}`}>
      <h2 className={`text-xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
        🎯 Your Path to Becoming Job-Ready
      </h2>
      <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        You're building skills in API integration, automation workflows, AI-powered systems, and business problem-solving. 
        Keep going - each lesson brings you closer to becoming a Technical Automation Architect ready for 2026!
      </p>
      <div className="flex flex-wrap gap-2">
        {['APIs & Webhooks', 'JSON Data', 'Automation Tools', 'AI Integration', 'Business Systems'].map((skill) => (
          <span key={skill} className={`px-3 py-1 rounded-full text-xs font-semibold ${darkMode ? "bg-blue-800 text-blue-200" : "bg-blue-200 text-blue-800"}`}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  </>
);

// Reusable Components
const StatCard = ({ icon: Icon, label, value, subtext, colorClass, iconColor, darkMode }) => (
  <div className={`p-6 rounded-xl border-2 ${colorClass}`}>
    <div className="flex items-center gap-3 mb-3">
      <Icon size={24} className={iconColor} />
      <span className={`text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{label}</span>
    </div>
    <div className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
      {value}
    </div>
    <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{subtext}</div>
  </div>
);

const ChartCard = ({ title, icon: Icon, iconColor, children, darkMode }) => (
  <div className={`p-6 rounded-xl border-2 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
    <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
      <Icon size={20} className={iconColor} />
      {title}
    </h2>
    {children}
  </div>
);

const RecordCard = ({ title, icon: Icon, value, metric, message, colorClass, textColor, metricColor, darkMode }) => (
  <div className={`p-6 rounded-xl border-2 ${colorClass}`}>
    <h2 className={`text-lg font-bold mb-3 flex items-center gap-2 ${textColor}`}>
      <Icon size={20} />
      {title}
    </h2>
    <div className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
      {value}
    </div>
    <div className={`text-3xl font-bold ${metricColor}`}>
      {metric}
    </div>
    <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
      {message}
    </p>
  </div>
);

const EmptyState = ({ darkMode, icon: Icon, title, description }) => (
  <div className={`p-8 rounded-xl border-2 text-center ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
    <Icon size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-600" : "text-gray-400"}`} />
    <h2 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
      {title}
    </h2>
    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
      {description}
    </p>
  </div>
);

// Lesson View Component
const LessonView = ({ lesson, currentDay, isCompleted, toggleCompletion, darkMode }) => (
  <>
    <div className="mb-8 md:mb-10">
      <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
        <span className={`inline-block px-3 py-1 text-xs md:text-sm font-semibold rounded ${darkMode ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700"}`}>
          Day {lesson.day}
        </span>
        {isCompleted(lesson.day) && (
          <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs md:text-sm font-semibold rounded ${darkMode ? "bg-green-900 text-green-300" : "bg-green-100 text-green-700"}`}>
            <CheckCircle2 size={16} />
            Completed
          </span>
        )}
      </div>
      <h1 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
        {lesson.title}
      </h1>
      <p className={`text-base md:text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        {lesson.focus}
      </p>
    </div>

    {lesson.concepts && (
      <section className="mb-8 md:mb-10">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <Target size={20} className="md:w-6 md:h-6 text-blue-600 flex-shrink-0" />
          <h2 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Core Concepts
          </h2>
        </div>
        <div className="space-y-4 md:space-y-6">
          {lesson.concepts.map((concept, idx) => (
            <div key={idx} className={`p-4 md:p-6 rounded-lg border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
              <h3 className={`text-base md:text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                {concept.name}
              </h3>
              <p className={`mb-3 text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                {concept.explanation}
              </p>
              {concept.analogy && (
                <div className={`p-3 rounded text-xs md:text-sm mb-3 italic ${darkMode ? "bg-blue-900 text-blue-200" : "bg-blue-50 text-gray-700"}`}>
                  💡 <strong>Analogy:</strong> {concept.analogy}
                </div>
              )}
              {concept.example && (
                <pre className={`p-3 rounded text-xs overflow-x-auto mb-3 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-800 text-gray-100"}`}>
                  {concept.example}
                </pre>
              )}
              {concept.methods && (
                <ul className="space-y-2">
                  {concept.methods.map((m, i) => (
                    <li key={i} className="text-xs md:text-sm">
                      <strong className="text-blue-600">{m.method}</strong>:{" "}
                      <span className={darkMode ? "text-gray-300" : ""}>{m.use}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    )}

    {lesson.objectives && (
      <section className="mb-8 md:mb-10">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <Zap size={20} className="md:w-6 md:h-6 text-orange-600 flex-shrink-0" />
          <h2 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Learning Objectives
          </h2>
        </div>
        <ul className="space-y-3">
          {lesson.objectives.map((obj, idx) => (
            <li key={idx} className="flex gap-3 md:gap-4">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs md:text-sm font-semibold min-w-[24px] ${darkMode ? "bg-orange-900 text-orange-300" : "bg-orange-100 text-orange-600"}`}>
                {idx + 1}
              </div>
              <p className={`leading-relaxed text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                {obj}
              </p>
            </li>
          ))}
        </ul>
      </section>
    )}

    {lesson.steps && (
      <section className="mb-8 md:mb-10">
        <h2 className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Step-by-Step Guide
        </h2>
        <div className="space-y-4 md:space-y-6">
          {lesson.steps.map((step, idx) => (
            <div key={idx} className={`border-l-4 border-blue-600 pl-4 md:pl-6 ${darkMode ? "border-blue-500" : ""}`}>
              <h3 className={`text-base md:text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Step {idx + 1}: {step.title}
              </h3>
              <p className={`mb-3 text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                {step.description}
              </p>
              {step.action && (
                <pre className="bg-gray-800 text-gray-100 p-3 rounded text-xs overflow-x-auto mb-3">
                  {step.action}
                </pre>
              )}
              {step.notes && (
                <p className="text-xs md:text-sm text-gray-600 italic">{step.notes}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    )}

    {lesson.exercises && lesson.exercises.length > 0 && (
      <section className="mb-8 md:mb-10">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <Zap size={20} className="md:w-6 md:h-6 text-purple-600 flex-shrink-0" />
          <h2 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Hands-On Exercises
          </h2>
        </div>
        <div className="space-y-4 md:space-y-6">
          {lesson.exercises.map((exercise, idx) => (
            <div key={idx} className={`border-l-4 border-purple-600 p-4 md:p-6 rounded-lg ${darkMode ? "bg-purple-900 bg-opacity-20" : "bg-purple-50"}`}>
              <h3 className={`text-base md:text-lg font-semibold mb-2 ${darkMode ? "text-purple-300" : "text-purple-900"}`}>
                {exercise.title}
              </h3>
              <p className={`mb-3 text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                {exercise.description}
              </p>
              {exercise.platform && (
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 text-xs md:text-sm font-semibold rounded ${darkMode ? "bg-purple-800 text-purple-200" : "bg-purple-200 text-purple-800"}`}>
                    Platform: {exercise.platform}
                  </span>
                </div>
              )}
              {exercise.steps && (
                <div className="mb-4">
                  <p className={`text-xs md:text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                    Steps:
                  </p>
                  <ol className="list-decimal list-inside space-y-2">
                    {exercise.steps.map((step, i) => (
                      <li key={i} className={`text-xs md:text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {exercise.expected && (
                <div className={`p-3 rounded text-xs md:text-sm ${darkMode ? "bg-purple-800 bg-opacity-50 text-purple-200" : "bg-purple-100 text-gray-700"}`}>
                  <strong>Expected Result:</strong> {exercise.expected}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    )}

    {lesson.activities && lesson.activities.length > 0 && (
      <section className="mb-8 md:mb-10">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <Target size={20} className="md:w-6 md:h-6 text-green-600 flex-shrink-0" />
          <h2 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Learning Activities
          </h2>
        </div>
        <div className="space-y-4 md:space-y-6">
          {lesson.activities.map((activity, idx) => (
            <div key={idx} className={`border-l-4 border-green-600 p-4 md:p-6 rounded-lg ${darkMode ? "bg-green-900 bg-opacity-20" : "bg-green-50"}`}>
              <h3 className={`text-base md:text-lg font-semibold mb-2 ${darkMode ? "text-green-300" : "text-green-900"}`}>
                {activity.title}
              </h3>
              <p className={`mb-3 text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                {activity.description}
              </p>
              {activity.duration && (
                <p className={`text-xs md:text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  ⏱️ Duration: {activity.duration}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    )}

    {lesson.resources && lesson.resources.length > 0 && (
      <section className="mb-8 md:mb-10">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <ExternalLink size={20} className="md:w-6 md:h-6 text-blue-600 flex-shrink-0" />
          <h2 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Additional Resources
          </h2>
        </div>
        <div className="space-y-2">
          {lesson.resources.map((resource, idx) => (
            <a
              key={idx}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-4 rounded-lg border transition ${darkMode ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : "bg-white border-gray-200 hover:bg-gray-50"}`}
            >
              <h3 className={`text-sm md:text-base font-semibold flex items-center gap-2 ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
                {resource.title}
                <ExternalLink size={14} />
              </h3>
              {resource.description && (
                <p className={`text-xs md:text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {resource.description}
                </p>
              )}
            </a>
          ))}
        </div>
      </section>
    )}

    <div className={`mt-10 p-6 rounded-xl border-2 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <button
        onClick={() => toggleCompletion(currentDay)}
        className={`w-full py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-3 ${
          isCompleted(currentDay)
            ? darkMode
              ? "bg-green-700 hover:bg-green-600 text-white"
              : "bg-green-600 hover:bg-green-500 text-white"
            : darkMode
            ? "bg-blue-700 hover:bg-blue-600 text-white"
            : "bg-blue-600 hover:bg-blue-500 text-white"
        }`}
      >
        {isCompleted(currentDay) ? (
          <>
            <CheckCircle2 size={24} /> Mark as Incomplete
          </>
        ) : (
          <>
            <CheckCircle2 size={24} /> Mark as Complete
          </>
        )}
      </button>
    </div>
  </>
);

// Placeholder view components
const ResourcesView = ({ resources, darkMode }) => (
  <div className={`p-8 rounded-xl border-2 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
    <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Resources</h2>
    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Resource content coming soon...</p>
  </div>
);

const ReferenceView = ({ reference, darkMode }) => (
  <div className={`p-8 rounded-xl border-2 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
    <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Quick Reference</h2>
    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Reference content coming soon...</p>
  </div>
);

const ChecklistsView = ({ checklists, darkMode }) => (
  <div className={`p-8 rounded-xl border-2 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
    <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Checklists</h2>
    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>Checklist content coming soon...</p>
  </div>
);

const InstructorView = ({ instructor, darkMode }) => (
  <>
    <section className="mb-10 md:mb-12">
      <h2 className={`text-2xl md:text-3xl font-bold mb-6 md:mb-8 ${darkMode ? "text-white" : "text-gray-900"}`}>
        Meet Your Instructor
      </h2>
      
      <div className={`p-6 md:p-8 rounded-xl border-2 mb-8 ${darkMode ? "bg-blue-900 bg-opacity-20 border-blue-700" : "bg-blue-50 border-blue-200"}`}>
        <h3 className={`text-xl md:text-2xl font-bold mb-4 ${darkMode ? "text-blue-300" : "text-blue-900"}`}>
          Ray - Technical Automation Architect
        </h3>
        <p className={`text-sm md:text-base leading-relaxed mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          I'm your guide through this intensive 14-day bootcamp. My mission is to transform you from a complete beginner into a job-ready Technical Automation Architect who can build sophisticated business systems using AI, APIs, and automation tools.
        </p>
        <p className={`text-sm md:text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          With expertise spanning content creation, SEO, video production, funnel building, and complex workflow automation, I'll teach you not just the technical skills, but the problem-solving mindset that makes you invaluable to clients and employers.
        </p>
      </div>
    </section>

    <section className="mb-10 md:mb-12">
      <h2 className={`text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
        <Target size={24} className="text-blue-600" />
        Areas of Expertise
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {instructor.expertise.map((exp, idx) => (
          <div
            key={idx}
            className={`p-5 md:p-6 rounded-lg border-l-4 border-blue-600 transition hover:shadow-lg ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"} ${darkMode ? "border-gray-700" : "border-gray-200"}`}
          >
            <h3 className={`text-lg md:text-xl font-semibold mb-3 ${darkMode ? "text-blue-300" : "text-blue-900"}`}>
              {exp.category}
            </h3>
            <p className={`text-sm md:text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>

    <section className="mb-10 md:mb-12">
      <h2 className={`text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
        <Zap size={24} className="text-orange-600" />
        Proficient Tools & Platforms
      </h2>
      <div className="flex flex-wrap gap-3">
        {instructor.tools.map((tool, idx) => (
          <span
            key={idx}
            className={`px-4 py-2 rounded-full font-semibold transition ${darkMode ? "bg-orange-900 bg-opacity-40 text-orange-200 hover:bg-opacity-60" : "bg-orange-100 text-orange-900 hover:bg-orange-200"}`}
          >
            {tool}
          </span>
        ))}
      </div>
    </section>

    <section className={`p-6 md:p-8 rounded-lg border-2 ${darkMode ? "bg-blue-900 bg-opacity-20 border-blue-700" : "bg-blue-50 border-blue-200"}`}>
      <h3 className={`text-lg md:text-xl font-bold mb-3 ${darkMode ? "text-blue-300" : "text-blue-900"}`}>
        🎯 What We Offer
      </h3>
      <p className={`text-sm md:text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        I bring expert-level knowledge across multiple disciplines: creating SEO-optimized content systems, producing compelling video and graphics, building high-converting sales funnels, conducting competitive research, and automating complex workflows. My toolkit includes the latest AI platforms (ChatGPT, Claude, Gemini), design tools (Canva, CapCut), no-code platforms (Zapier, Make, n8n), and analytics solutions to deliver measurable results.
      </p>
    </section>
  </>
);

export default BootcampApp;
