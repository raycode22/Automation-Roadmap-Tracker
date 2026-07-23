import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  ChevronDown,
  CheckCircle2,
  Circle,
  BookOpen,
  Target,
  Zap,
  FileText,
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
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import bootcampData from "./bootcampData.js";

const BootcampApp = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [expandedWeeks, setExpandedWeeks] = useState({ 1: true, 2: false });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lessonTimeSpent, setLessonTimeSpent] = useState({});
  const [currentLessonStartTime, setCurrentLessonStartTime] = useState(null);

  const curriculum = bootcampData.lessons;

  // Track time spent on lessons
  useEffect(() => {
    if (activeTab === "lessons" && currentDay) {
      setCurrentLessonStartTime(Date.now());
    } else if (currentLessonStartTime) {
      const timeSpent = Math.round((Date.now() - currentLessonStartTime) / 1000);
      setLessonTimeSpent(prev => ({
        ...prev,
        [currentDay]: (prev[currentDay] || 0) + timeSpent
      }));
      setCurrentLessonStartTime(null);
    }
  }, [activeTab, currentDay]);

  // Save lesson time to localStorage
  useEffect(() => {
    localStorage.setItem("lessonTimeSpent", JSON.stringify(lessonTimeSpent));
  }, [lessonTimeSpent]);

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

    const categoryData = useMemo(() => {
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
    }, [completedLessons, curriculum]);

    return { timeData, longestLesson, fastestLesson, weeklyProgress, categoryData };
  }, [lessonTimeSpent, completedLessons, curriculum]);

  // Memoized handlers with useCallback
  const toggleWeek = useCallback((week) => {
    setExpandedWeeks((prev) => ({ ...prev, [week]: !prev[week] }));
  }, []);

  const toggleCompletion = useCallback((day) => {
    setCompletedLessons((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  }, []);

  const isCompleted = useCallback((day) => completedLessons.includes(day), [completedLessons]);

  const lesson = useMemo(() => curriculum.find((l) => l.day === currentDay), [curriculum, currentDay]);
  
  const progressPercent = useMemo(() => 
    Math.round((completedLessons.length / curriculum.length) * 100),
    [completedLessons.length, curriculum.length]
  );

  // Load progress and theme from localStorage, or use system preference
  useEffect(() => {
    const saved = localStorage.getItem("bootcampProgress");
    if (saved) setCompletedLessons(JSON.parse(saved));

    const savedTime = localStorage.getItem("lessonTimeSpent");
    if (savedTime) setLessonTimeSpent(JSON.parse(savedTime));

    const savedTheme = localStorage.getItem("bootcampTheme");
    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme));
    } else {
      // Use system preference if no saved theme
      const systemDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setDarkMode(systemDarkMode);
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (e) => {
      const savedTheme = localStorage.getItem("bootcampTheme");
      // Only auto-update if user hasn't manually set a preference
      if (savedTheme === null) {
        setDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener("change", handleThemeChange);
    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  // Save progress and theme to localStorage (combined into single effect)
  useEffect(() => {
    localStorage.setItem("bootcampProgress", JSON.stringify(completedLessons));
    localStorage.setItem("bootcampTheme", JSON.stringify(darkMode));
  }, [completedLessons, darkMode]);

  // Circular progress component - memoized to prevent unnecessary re-renders
  const CircularProgress = React.memo(({ percent, size = 120, darkMode, curriculumLength }) => {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
      <div className="flex flex-col items-center gap-3">
        <div style={{ position: "relative", width: size, height: size }}>
          <svg
            width={size}
            height={size}
            style={{ transform: "rotate(-90deg)" }}
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={darkMode ? "#374151" : "#e5e7eb"}
              strokeWidth="4"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.3s ease" }}
            />
          </svg>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <div
              className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              {percent}%
            </div>
            <div
              className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Complete
            </div>
          </div>
        </div>
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          {completedLessons.length} of {curriculumLength} days
        </p>
      </div>
    );
  }, (prev, next) => {
    // Custom comparison to prevent re-renders when props haven't meaningfully changed
    return prev.percent === next.percent && prev.size === next.size && prev.darkMode === next.darkMode && prev.curriculumLength === next.curriculumLength;
  });

  // Memoized week lessons to prevent recalculating on every render
  const week1Lessons = useMemo(() => curriculum.filter((l) => l.week === 1), [curriculum]);
  const week2Lessons = useMemo(() => curriculum.filter((l) => l.week === 2), [curriculum]);

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Mobile Header */}
      <header
        className={`md:hidden sticky top-0 z-50 flex items-center justify-between p-4 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-b`}
      >
        <div className="flex items-center gap-2">
          <Tent size={20} className="text-blue-600" />
          <h1
            className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            Ray's Bootcamp
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition ${darkMode ? "bg-gray-700 text-yellow-400 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-lg transition ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 md:hidden bg-black bg-opacity-50 z-30 top-16"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-16 md:top-0 left-0 z-40 h-[calc(100vh-4rem)] md:h-screen w-64 transition-transform md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-r shadow-sm md:shadow-none`}
      >
        <div className="sticky top-0 bg-inherit">
          <div
            className={`p-4 md:p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-100"} hidden md:flex items-center justify-between`}
          >
            <div className="flex items-center gap-2">
              <BookOpen size={24} className="text-blue-600" />
              <h1
                className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                Bootcamp
              </h1>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition ${darkMode ? "bg-gray-700 text-yellow-400 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              title={darkMode ? "Light mode" : "Dark mode"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
          <p
            className={`px-4 md:px-6 pt-3 md:pt-0 text-xs md:text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Technical Automation Architect
          </p>

          {/* Circular Progress */}
          <div
            className={`px-4 md:px-6 py-4 md:py-6 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}
          >
            <CircularProgress percent={progressPercent} size={100} darkMode={darkMode} curriculumLength={curriculum.length} />
          </div>
        </div>

        {/* Navigation */}
        <nav
          className="overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 280px)" }}
        >
          {[week1Lessons, week2Lessons].map((weekLessons, idx) => {
            const week = idx + 1;
            return (
              <div
                key={week}
                className={`border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}
              >
                <button
                  onClick={() => toggleWeek(week)}
                  className={`w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between transition ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                >
                  <h2
                    className={`text-sm md:text-base font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Week {week}
                  </h2>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${expandedWeeks[week] ? "rotate-180" : ""} ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                  />
                </button>

                {expandedWeeks[week] && (
                  <div className={darkMode ? "bg-gray-700" : "bg-gray-50"}>
                    {weekLessons.map((item) => (
                      <button
                        key={item.day}
                        onClick={() => {
                          setCurrentDay(item.day);
                          setActiveTab("lessons");
                          setSidebarOpen(false);
                        }}
                        className={`w-full px-4 md:px-6 py-2 md:py-3 text-left flex items-center gap-3 transition text-sm md:text-base ${currentDay === item.day
                          ? darkMode
                            ? "bg-blue-900 border-l-4 border-blue-400"
                            : "bg-blue-50 border-l-4 border-blue-600"
                          : darkMode
                            ? "hover:bg-gray-600"
                            : "hover:bg-gray-100"
                          }`}
                      >
                        {isCompleted(item.day) ? (
                          <CheckCircle2
                            size={18}
                            className="text-green-500 flex-shrink-0"
                          />
                        ) : (
                          <Circle
                            size={18}
                            className={`flex-shrink-0 ${darkMode ? "text-gray-600" : "text-gray-400"}`}
                          />
                        )}
                        <span
                          className={`${currentDay === item.day
                            ? darkMode
                              ? "font-semibold text-white"
                              : "font-semibold text-gray-900"
                            : darkMode
                              ? "text-gray-300"
                              : "text-gray-700"
                            }`}
                        >
                          Day {item.day}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Tab Navigation */}
          <div
            className={`border-t ${darkMode ? "border-gray-700" : "border-gray-100"} p-3 md:p-4 mt-4 space-y-2`}
          >
            <button
              onClick={() => {
                setActiveTab("dashboard");
                setSidebarOpen(false);
              }}
              className={`w-full px-3 py-2 text-sm rounded flex items-center gap-2 transition min-h-[44px] ${activeTab === "dashboard"
                ? darkMode
                  ? "bg-blue-900 text-blue-300"
                  : "bg-blue-100 text-blue-700"
                : darkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <BarChart3 size={16} /> Dashboard
            </button>
            <button
              onClick={() => {
                setActiveTab("lessons");
                setSidebarOpen(false);
              }}
              className={`w-full px-3 py-2 text-sm rounded flex items-center gap-2 transition min-h-[44px] ${activeTab === "lessons"
                ? darkMode
                  ? "bg-blue-900 text-blue-300"
                  : "bg-blue-100 text-blue-700"
                : darkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <BookOpen size={16} /> Lessons
            </button>
            <button
              onClick={() => {
                setActiveTab("resources");
                setSidebarOpen(false);
              }}
              className={`w-full px-3 py-2 text-sm rounded flex items-center gap-2 transition min-h-[44px] ${activeTab === "resources"
                ? darkMode
                  ? "bg-blue-900 text-blue-300"
                  : "bg-blue-100 text-blue-700"
                : darkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <ExternalLink size={16} /> Resources
            </button>
            <button
              onClick={() => {
                setActiveTab("reference");
                setSidebarOpen(false);
              }}
              className={`w-full px-3 py-2 text-sm rounded flex items-center gap-2 transition min-h-[44px] ${activeTab === "reference"
                ? darkMode
                  ? "bg-blue-900 text-blue-300"
                  : "bg-blue-100 text-blue-700"
                : darkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <Lightbulb size={16} /> Quick Ref
            </button>
            <button
              onClick={() => {
                setActiveTab("checklists");
                setSidebarOpen(false);
              }}
              className={`w-full px-3 py-2 text-sm rounded flex items-center gap-2 transition min-h-[44px] ${activeTab === "checklists"
                ? darkMode
                  ? "bg-blue-900 text-blue-300"
                  : "bg-blue-100 text-blue-700"
                : darkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <ClipboardList size={16} /> Checklist
            </button>
            <button
              onClick={() => {
                setActiveTab("instructor");
                setSidebarOpen(false);
              }}
              className={`w-full px-3 py-2 text-sm rounded flex items-center gap-2 transition min-h-[44px] ${activeTab === "instructor"
                ? darkMode
                  ? "bg-blue-900 text-blue-300"
                  : "bg-blue-100 text-blue-700"
                : darkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <Tent size={16} /> Instructor
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto w-full ${darkMode ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-12">
          {activeTab === "dashboard" && (
            <>
              {/* Dashboard Header */}
              <div className="mb-8">
                <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Learning Dashboard
                </h1>
                <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Track your progress to become a Technical Automation Architect
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <div className={`p-6 rounded-xl border-2 ${darkMode ? "bg-blue-900 bg-opacity-20 border-blue-700" : "bg-blue-50 border-blue-200"}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <Trophy size={24} className="text-yellow-500" />
                    <span className={`text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Completed</span>
                  </div>
                  <div className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {completedLessons.length}/{curriculum.length}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>lessons done</div>
                </div>

                <div className={`p-6 rounded-xl border-2 ${darkMode ? "bg-green-900 bg-opacity-20 border-green-700" : "bg-green-50 border-green-200"}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp size={24} className="text-green-500" />
                    <span className={`text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Progress</span>
                  </div>
                  <div className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {progressPercent}%
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>overall completion</div>
                </div>

                <div className={`p-6 rounded-xl border-2 ${darkMode ? "bg-purple-900 bg-opacity-20 border-purple-700" : "bg-purple-50 border-purple-200"}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <Clock size={24} className="text-purple-500" />
                    <span className={`text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Time Spent</span>
                  </div>
                  <div className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {Math.round(Object.values(lessonTimeSpent).reduce((a, b) => a + b, 0) / 60)}m
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>total learning time</div>
                </div>

                <div className={`p-6 rounded-xl border-2 ${darkMode ? "bg-orange-900 bg-opacity-20 border-orange-700" : "bg-orange-50 border-orange-200"}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <Award size={24} className="text-orange-500" />
                    <span className={`text-sm font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Streak</span>
                  </div>
                  <div className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {completedLessons.length > 0 ? completedLessons.length : 0}
                  </div>
                  <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>days active</div>
                </div>
              </div>

              {/* Charts Row 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Time Spent Per Lesson */}
                <div className={`p-6 rounded-xl border-2 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                  <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    <Clock size={20} className="text-blue-500" />
                    Time Spent Per Lesson
                  </h2>
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
                </div>

                {/* Progress by Category */}
                <div className={`p-6 rounded-xl border-2 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                  <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    <Target size={20} className="text-green-500" />
                    Progress by Topic
                  </h2>
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
                          <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5]} />
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
                </div>
              </div>

              {/* Records Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Longest Lesson */}
                {analytics.longestLesson && (
                  <div className={`p-6 rounded-xl border-2 ${darkMode ? "bg-red-900 bg-opacity-20 border-red-700" : "bg-red-50 border-red-200"}`}>
                    <h2 className={`text-lg font-bold mb-3 flex items-center gap-2 ${darkMode ? "text-red-300" : "text-red-700"}`}>
                      <Clock size={20} />
                      Most Challenging Lesson
                    </h2>
                    <div className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Day {analytics.longestLesson.day}: {analytics.longestLesson.title}
                    </div>
                    <div className={`text-3xl font-bold ${darkMode ? "text-red-400" : "text-red-600"}`}>
                      {Math.round(analytics.longestLesson.timeSpent / 60)} minutes
                    </div>
                    <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      This lesson took the longest time - consider reviewing the concepts again!
                    </p>
                  </div>
                )}

                {/* Fastest Lesson */}
                {analytics.fastestLesson && (
                  <div className={`p-6 rounded-xl border-2 ${darkMode ? "bg-green-900 bg-opacity-20 border-green-700" : "bg-green-50 border-green-200"}`}>
                    <h2 className={`text-lg font-bold mb-3 flex items-center gap-2 ${darkMode ? "text-green-300" : "text-green-700"}`}>
                      <Zap size={20} />
                      Quickest Lesson
                    </h2>
                    <div className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Day {analytics.fastestLesson.day}: {analytics.fastestLesson.title}
                    </div>
                    <div className={`text-3xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>
                      {analytics.fastestLesson.timeSpent} seconds
                    </div>
                    <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      You mastered this one quickly! Great job understanding these concepts.
                    </p>
                  </div>
                )}
              </div>

              {/* Weekly Progress */}
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

              {/* Motivation Card */}
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
          )}

          {activeTab === "lessons" && lesson && (
            <>
              {/* Header */}
              <div className="mb-8 md:mb-10">
                <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs md:text-sm font-semibold rounded ${darkMode ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700"}`}
                  >
                    Day {lesson.day}
                  </span>
                  {isCompleted(lesson.day) && (
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 text-xs md:text-sm font-semibold rounded ${darkMode ? "bg-green-900 text-green-300" : "bg-green-100 text-green-700"}`}
                    >
                      <CheckCircle2 size={16} />
                      Completed
                    </span>
                  )}
                </div>
                <h1
                  className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  {lesson.title}
                </h1>
                <p
                  className={`text-base md:text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  {lesson.focus}
                </p>
              </div>

              {/* Concepts */}
              {lesson.concepts && (
                <section className="mb-8 md:mb-10">
                  <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                    <Target
                      size={20}
                      className="md:w-6 md:h-6 text-blue-600 flex-shrink-0"
                    />
                    <h2
                      className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Core Concepts
                    </h2>
                  </div>
                  <div className="space-y-4 md:space-y-6">
                    {lesson.concepts.map((concept, idx) => (
                      <div
                        key={idx}
                        className={`p-4 md:p-6 rounded-lg border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}
                      >
                        <h3
                          className={`text-base md:text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {concept.name}
                        </h3>
                        <p
                          className={`mb-3 text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          {concept.explanation}
                        </p>
                        {concept.analogy && (
                          <div
                            className={`p-3 rounded text-xs md:text-sm mb-3 italic ${darkMode ? "bg-blue-900 text-blue-200" : "bg-blue-50 text-gray-700"}`}
                          >
                            💡 <strong>Analogy:</strong> {concept.analogy}
                          </div>
                        )}
                        {concept.example && (
                          <pre
                            className={`p-3 rounded text-xs overflow-x-auto mb-3 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-800 text-gray-100"}`}
                          >
                            {concept.example}
                          </pre>
                        )}
                        {concept.methods && (
                          <ul className="space-y-2">
                            {concept.methods.map((m, i) => (
                              <li key={i} className="text-xs md:text-sm">
                                <strong className="text-blue-600">
                                  {m.method}
                                </strong>
                                :{" "}
                                <span
                                  className={darkMode ? "text-gray-300" : ""}
                                >
                                  {m.use}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Learning Objectives */}
              {lesson.objectives && (
                <section className="mb-8 md:mb-10">
                  <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                    <Zap
                      size={20}
                      className="md:w-6 md:h-6 text-orange-600 flex-shrink-0"
                    />
                    <h2
                      className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Learning Objectives
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {lesson.objectives.map((obj, idx) => (
                      <li key={idx} className="flex gap-3 md:gap-4">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs md:text-sm font-semibold min-w-[24px] ${darkMode ? "bg-orange-900 text-orange-300" : "bg-orange-100 text-orange-600"}`}
                        >
                          {idx + 1}
                        </div>
                        <p
                          className={`leading-relaxed text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          {obj}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Step-by-Step */}
              {lesson.steps && (
                <section className="mb-8 md:mb-10">
                  <h2
                    className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Step-by-Step Guide
                  </h2>
                  <div className="space-y-4 md:space-y-6">
                    {lesson.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className={`border-l-4 border-blue-600 pl-4 md:pl-6 ${darkMode ? "border-blue-500" : ""}`}
                      >
                        <h3
                          className={`text-base md:text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
                        >
                          Step {idx + 1}: {step.title}
                        </h3>
                        <p
                          className={`mb-3 text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          {step.description}
                        </p>
                        {step.action && (
                          <pre className="bg-gray-800 text-gray-100 p-3 rounded text-xs overflow-x-auto mb-3">
                            {step.action}
                          </pre>
                        )}
                        {step.notes && (
                          <p className="text-xs md:text-sm text-gray-600 italic">
                            {step.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Exercises */}
              {lesson.exercises && lesson.exercises.length > 0 && (
                <section className="mb-8 md:mb-10">
                  <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                    <Zap
                      size={20}
                      className="md:w-6 md:h-6 text-purple-600 flex-shrink-0"
                    />
                    <h2
                      className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Hands-On Exercises
                    </h2>
                  </div>
                  <div className="space-y-4 md:space-y-6">
                    {lesson.exercises.map((exercise, idx) => (
                      <div
                        key={idx}
                        className={`border-l-4 border-purple-600 p-4 md:p-6 rounded-lg ${darkMode ? "bg-purple-900 bg-opacity-20" : "bg-purple-50"}`}
                      >
                        <h3
                          className={`text-base md:text-lg font-semibold mb-2 ${darkMode ? "text-purple-300" : "text-purple-900"}`}
                        >
                          {exercise.title}
                        </h3>
                        <p
                          className={`mb-3 text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          {exercise.description}
                        </p>
                        {exercise.platform && (
                          <div className="mb-4">
                            <span
                              className={`inline-block px-3 py-1 text-xs md:text-sm font-semibold rounded ${darkMode ? "bg-purple-800 text-purple-200" : "bg-purple-200 text-purple-800"}`}
                            >
                              Platform: {exercise.platform}
                            </span>
                          </div>
                        )}
                        {exercise.steps && (
                          <div className="mb-4">
                            <p
                              className={`text-xs md:text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                            >
                              Steps:
                            </p>
                            <ol className="list-decimal list-inside space-y-2">
                              {exercise.steps.map((step, i) => (
                                <li
                                  key={i}
                                  className={`text-xs md:text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                                >
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                        {exercise.expected && (
                          <div
                            className={`p-3 rounded text-xs md:text-sm ${darkMode ? "bg-purple-800 bg-opacity-50 text-purple-200" : "bg-purple-100 text-gray-700"}`}
                          >
                            <strong>Expected Result:</strong>{" "}
                            {exercise.expected}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Activities */}
              {lesson.activities && lesson.activities.length > 0 && (
                <section className="mb-8 md:mb-10">
                  <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                    <Target
                      size={20}
                      className="md:w-6 md:h-6 text-green-600 flex-shrink-0"
                    />
                    <h2
                      className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Learning Activities
                    </h2>
                  </div>
                  <div className="space-y-4 md:space-y-6">
                    {lesson.activities.map((activity, idx) => (
                      <div
                        key={idx}
                        className={`border-l-4 border-green-600 p-4 md:p-6 rounded-lg ${darkMode ? "bg-green-900 bg-opacity-20" : "bg-green-50"}`}
                      >
                        <h3
                          className={`text-base md:text-lg font-semibold mb-2 ${darkMode ? "text-green-300" : "text-green-900"}`}
                        >
                          {activity.title}
                        </h3>
                        <p
                          className={`mb-3 text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          {activity.description}
                        </p>
                        {activity.task && (
                          <div className="mb-3">
                            <p
                              className={`text-xs md:text-sm font-semibold mb-1 ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                            >
                              Task:
                            </p>
                            <p
                              className={`text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                            >
                              {activity.task}
                            </p>
                          </div>
                        )}
                        {activity.tools && (
                          <div className="mb-3">
                            <p
                              className={`text-xs md:text-sm font-semibold mb-1 ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                            >
                              Tools:
                            </p>
                            <p
                              className={`text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                            >
                              {activity.tools}
                            </p>
                          </div>
                        )}
                        {activity.time && (
                          <div
                            className={`inline-block px-3 py-1 text-xs md:text-sm font-semibold rounded ${darkMode ? "bg-green-800 text-green-200" : "bg-green-200 text-green-800"}`}
                          >
                            Time: {activity.time}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Assignment */}
              {lesson.assignment && (
                <section className="mb-8 md:mb-10">
                  <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                    <FileText
                      size={20}
                      className="md:w-6 md:h-6 text-orange-600 flex-shrink-0"
                    />
                    <h2
                      className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Day Assignment
                    </h2>
                  </div>
                  <div
                    className={`border-l-4 border-orange-600 p-4 md:p-6 rounded-lg ${darkMode ? "bg-orange-900 bg-opacity-20" : "bg-orange-50"}`}
                  >
                    <h3
                      className={`text-base md:text-lg font-semibold mb-2 ${darkMode ? "text-orange-300" : "text-orange-900"}`}
                    >
                      {lesson.assignment.title}
                    </h3>
                    <p
                      className={`mb-4 text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {lesson.assignment.description}
                    </p>

                    {lesson.assignment.tasks && (
                      <div className="mb-6">
                        <p
                          className={`text-xs md:text-sm font-semibold mb-3 ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                        >
                          Tasks:
                        </p>
                        <div className="space-y-3">
                          {lesson.assignment.tasks.map((task, idx) => (
                            <div
                              key={idx}
                              className={`p-3 md:p-4 rounded border ${darkMode ? "bg-orange-800 bg-opacity-30 border-orange-700 text-orange-200" : "bg-white border-orange-200"}`}
                            >
                              <div
                                className={`font-semibold mb-1 text-sm md:text-base ${darkMode ? "text-orange-300" : "text-orange-700"}`}
                              >
                                Step {task.step}: {task.title}
                              </div>
                              <p
                                className={`text-xs md:text-sm mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                              >
                                {task.description || task.deliverable}
                              </p>
                              {task.deliverable && (
                                <div
                                  className={`text-xs p-2 rounded ${darkMode ? "bg-orange-800 text-orange-200" : "text-orange-700 bg-orange-100"}`}
                                >
                                  <strong>Deliverable:</strong>{" "}
                                  {task.deliverable}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {lesson.assignment.grading && (
                      <div
                        className={`p-3 md:p-4 rounded border ${darkMode ? "bg-orange-800 bg-opacity-20 border-orange-700" : "bg-white border-orange-200"}`}
                      >
                        <p
                          className={`text-xs md:text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                        >
                          Grading Rubric:
                        </p>
                        <div className="space-y-2">
                          {Object.entries(lesson.assignment.grading).map(
                            ([criteria, points], idx) => (
                              <div
                                key={idx}
                                className="flex justify-between text-xs md:text-sm"
                              >
                                <span
                                  className={
                                    darkMode ? "text-gray-300" : "text-gray-700"
                                  }
                                >
                                  {criteria}
                                </span>
                                <span
                                  className={`font-semibold ${darkMode ? "text-orange-300" : "text-orange-700"}`}
                                >
                                  {points} pts
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    {lesson.assignment.submissionFormat && (
                      <div
                        className={`mt-4 p-3 rounded text-xs md:text-sm ${darkMode ? "bg-orange-800 bg-opacity-30 text-orange-200" : "bg-orange-100 text-orange-900"}`}
                      >
                        <strong>Submission Format:</strong>{" "}
                        {lesson.assignment.submissionFormat}
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Completion Button */}
              <div
                className={`mt-12 md:mt-16 pt-6 md:pt-8 border-t flex justify-center ${darkMode ? "border-gray-700" : "border-gray-200"}`}
              >
                <button
                  onClick={() => toggleCompletion(lesson.day)}
                  className={`px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold transition flex items-center gap-2 min-h-[44px] ${isCompleted(lesson.day)
                    ? darkMode
                      ? "bg-green-900 text-green-300 hover:bg-green-800"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                    : darkMode
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >
                  {isCompleted(lesson.day) ? (
                    <>
                      <CheckCircle2 size={20} />
                      Lesson Completed
                    </>
                  ) : (
                    <>
                      <Circle size={20} />
                      Mark Complete
                    </>
                  )}
                </button>
              </div>
            </>
          )}

          {activeTab === "resources" && (
            <>
              <h1
                className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                Learning Resources
              </h1>
              <div className="space-y-6 md:space-y-8">
                {Object.entries(bootcampData.resources).map(
                  ([category, resources]) => (
                    <section key={category}>
                      <h2
                        className={`text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 capitalize ${darkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {category.replace(/([A-Z])/g, " $1").trim()}
                      </h2>
                      <div className="space-y-2 md:space-y-3">
                        {resources.map((resource, idx) => (
                          <a
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block p-3 md:p-4 rounded-lg transition border min-h-[44px] ${darkMode ? "bg-blue-900 bg-opacity-20 hover:bg-blue-900 hover:bg-opacity-30 border-blue-700" : "bg-blue-50 hover:bg-blue-100 border-blue-200"}`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0 flex-1">
                                <h3
                                  className={`font-semibold mb-1 text-sm md:text-base truncate ${darkMode ? "text-blue-300" : "text-blue-900"}`}
                                >
                                  {resource.title}
                                </h3>
                                <p
                                  className={`text-xs md:text-sm break-all ${darkMode ? "text-blue-200" : "text-blue-700"}`}
                                >
                                  {resource.url}
                                </p>
                              </div>
                              <ExternalLink
                                size={18}
                                className={`flex-shrink-0 mt-1 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                              />
                            </div>
                          </a>
                        ))}
                      </div>
                    </section>
                  ),
                )}
              </div>
            </>
          )}

          {activeTab === "reference" && (
            <>
              <h1
                className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                Quick Reference Guide
              </h1>

              {/* HTTP Methods */}
              <section className="mb-8 md:mb-10">
                <h2
                  className={`text-lg md:text-xl lg:text-2xl font-bold mb-4 md:mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  HTTP Methods
                </h2>
                <div className="space-y-2 md:space-y-3">
                  {bootcampData.quickReference.httpMethods.map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-3 md:p-4 rounded border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}
                    >
                      <div
                        className={`font-semibold mb-1 text-sm md:text-base ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                      >
                        {m.method}
                      </div>
                      <div
                        className={`text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        {m.use}
                      </div>
                      <div
                        className={`text-xs md:text-sm mt-2 font-mono ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        {m.example}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* JSON Structure */}
              <section className="mb-8 md:mb-10">
                <h2
                  className={`text-lg md:text-xl lg:text-2xl font-bold mb-4 md:mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  JSON Structure
                </h2>
                <div
                  className={`p-4 md:p-6 rounded border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}
                >
                  <p
                    className={`mb-4 text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    {bootcampData.quickReference.jsonStructure.description}
                  </p>
                  <pre className="bg-gray-800 text-gray-100 p-3 md:p-4 rounded overflow-x-auto text-xs md:text-sm">
                    {bootcampData.quickReference.jsonStructure.example}
                  </pre>
                </div>
              </section>

              {/* Common Errors */}
              <section>
                <h2
                  className={`text-lg md:text-xl lg:text-2xl font-bold mb-4 md:mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  Common Errors & Fixes
                </h2>
                <div className="space-y-3 md:space-y-4">
                  {bootcampData.quickReference.commonErrors.map((err, idx) => (
                    <div
                      key={idx}
                      className={`border-l-4 border-red-500 p-3 md:p-4 rounded ${darkMode ? "bg-red-900 bg-opacity-20" : "bg-red-50"}`}
                    >
                      <h3
                        className={`font-semibold mb-2 text-sm md:text-base ${darkMode ? "text-red-300" : "text-red-900"}`}
                      >
                        ❌ {err.error}
                      </h3>
                      <p
                        className={`text-xs md:text-sm mb-2 ${darkMode ? "text-red-200" : "text-red-800"}`}
                      >
                        <strong>Cause:</strong> {err.cause}
                      </p>
                      <p
                        className={`text-xs md:text-sm ${darkMode ? "text-red-200" : "text-red-800"}`}
                      >
                        <strong>Fix:</strong> {err.fix}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activeTab === "checklists" && (
            <>
              <h1
                className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                Daily Checklists
              </h1>
              <div className="space-y-4 md:space-y-8">
                {bootcampData.checklists.map((dayCheck, idx) => (
                  <div
                    key={idx}
                    className={`p-4 md:p-6 rounded-lg border-2 ${darkMode ? "bg-blue-900 bg-opacity-20 border-blue-700" : "bg-blue-50 border-blue-200"}`}
                  >
                    <h2
                      className={`text-lg md:text-xl font-bold mb-3 md:mb-4 ${darkMode ? "text-blue-300" : "text-blue-900"}`}
                    >
                      Day {dayCheck.day} Checklist
                    </h2>
                    <div className="space-y-2 md:space-y-3">
                      {dayCheck.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 min-h-[44px] px-2"
                        >
                          <input
                            type="checkbox"
                            className={`w-5 h-5 rounded flex-shrink-0 cursor-pointer ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                            defaultChecked={false}
                          />
                          <span
                            className={`flex-1 text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-800"}`}
                          >
                            {item.task}
                          </span>
                          <span
                            className={`text-xs md:text-sm px-2 py-1 rounded flex-shrink-0 ${darkMode ? "bg-gray-700 text-gray-300" : "bg-white text-gray-600"}`}
                          >
                            {item.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "instructor" && (
            <>
              <h1
                className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                Instructor
              </h1>

              {/* Expertise Sections */}
              <section className="mb-10 md:mb-12">
                <h2
                  className={`text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  <Target size={24} className="text-blue-600" />
                  Areas of Expertise
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {bootcampData.instructor.expertise.map((exp, idx) => (
                    <div
                      key={idx}
                      className={`p-5 md:p-6 rounded-lg border-l-4 border-blue-600 transition hover:shadow-lg ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"} ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                    >
                      <h3
                        className={`text-lg md:text-xl font-semibold mb-3 ${darkMode ? "text-blue-300" : "text-blue-900"}`}
                      >
                        {exp.category}
                      </h3>
                      <p
                        className={`text-sm md:text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tools & Technologies */}
              <section className="mb-10 md:mb-12">
                <h2
                  className={`text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  <Zap size={24} className="text-orange-600" />
                  Proficient Tools & Platforms
                </h2>
                <div className="flex flex-wrap gap-3">
                  {bootcampData.instructor.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className={`px-4 py-2 rounded-full font-semibold transition ${darkMode ? "bg-orange-900 bg-opacity-40 text-orange-200 hover:bg-opacity-60" : "bg-orange-100 text-orange-900 hover:bg-orange-200"}`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </section>

              {/* Summary */}
              <section className={`p-6 md:p-8 rounded-lg border-2 ${darkMode ? "bg-blue-900 bg-opacity-20 border-blue-700" : "bg-blue-50 border-blue-200"}`}>
                <h3
                  className={`text-lg md:text-xl font-bold mb-3 ${darkMode ? "text-blue-300" : "text-blue-900"}`}
                >
                  🎯 What We Offer
                </h3>
                <p
                  className={`text-sm md:text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  I bring expert-level knowledge across multiple disciplines: creating SEO-optimized content systems, producing compelling video and graphics, building high-converting sales funnels, conducting competitive research, and automating complex workflows. My toolkit includes the latest AI platforms (ChatGPT, Claude, Gemini), design tools (Canva, CapCut), no-code platforms (Zapier, Make, n8n), and analytics solutions to deliver measurable results.
                </p>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default BootcampApp;
