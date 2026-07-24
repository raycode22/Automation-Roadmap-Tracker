import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BookOpen } from "lucide-react";
import bootcampData from "./bootcampData.js";
import Sidebar from "./components/Sidebar";
import ErrorBoundary from "./components/errors/ErrorBoundary";
import Dashboard from "./components/dashboard/Dashboard";
import LessonView from "./components/lessons/LessonView";
import ResourcesView from "./components/resources/ResourcesView";
import ReferenceView from "./components/resources/ReferenceView";
import ChecklistsView from "./components/resources/ChecklistsView";
import InstructorView from "./components/resources/InstructorView";
import EmptyState from "./components/common/EmptyState";

const BootcampApp = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [expandedWeeks, setExpandedWeeks] = useState({ 1: true, 2: false });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lessonTimeSpent, setLessonTimeSpent] = useState({});
  const [lessonStatus, setLessonStatus] = useState({});
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [checklistState, setChecklistState] = useState({});

  const curriculum = bootcampData.lessons;

  // Load progress and theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("bootcampProgress");
    if (saved) setCompletedLessons(JSON.parse(saved));

    const savedTime = localStorage.getItem("lessonTimeSpent");
    if (savedTime) setLessonTimeSpent(JSON.parse(savedTime));

    const savedStatus = localStorage.getItem("lessonStatus");
    if (savedStatus) setLessonStatus(JSON.parse(savedStatus));

    const savedChecklists = localStorage.getItem("checklistState");
    if (savedChecklists) setChecklistState(JSON.parse(savedChecklists));

    const savedTheme = localStorage.getItem("bootcampTheme");
    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme));
    } else {
      const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(systemDarkMode);
    }

    const savedSidebarCollapsed = localStorage.getItem("sidebarCollapsed");
    if (savedSidebarCollapsed !== null) {
      setSidebarCollapsed(JSON.parse(savedSidebarCollapsed));
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
    localStorage.setItem("checklistState", JSON.stringify(checklistState));
    localStorage.setItem("sidebarCollapsed", JSON.stringify(sidebarCollapsed));
  }, [completedLessons, darkMode, lessonTimeSpent, lessonStatus, checklistState, sidebarCollapsed]);

  // Handle starting a lesson
  const startLesson = useCallback((day) => {
    const startTime = Date.now();
    setLessonStatus(prev => ({
      ...prev,
      [day]: { status: 'in_progress', startTime }
    }));
    setCurrentDay(day);
    setActiveTab("lessons");
  }, []);

  // Handle completing a lesson with time tracking and checklist validation
  const toggleCompletion = useCallback((day) => {
    const isCurrentlyCompleted = completedLessons.includes(day);

    const dayChecklist = bootcampData.checklists.find(c => c.day === day);
    const checklistItems = dayChecklist?.items || [];
    const dayChecklistState = checklistState[day] || {};
    const allChecklistsComplete = checklistItems.length === 0 ||
      checklistItems.every((_, idx) => dayChecklistState[idx]);

    if (!isCurrentlyCompleted) {
      if (!allChecklistsComplete) {
        alert('Please complete all checklist items before marking the lesson as complete.');
        return;
      }

      const endTime = Date.now();
      const startTime = lessonStatus[day]?.startTime || endTime;
      const timeSpent = Math.round((endTime - startTime) / 1000);

      setLessonTimeSpent(prev => ({
        ...prev,
        [day]: (prev[day] || 0) + timeSpent
      }));

      setLessonStatus(prev => ({
        ...prev,
        [day]: { status: 'completed' }
      }));

      setCompletedLessons(prev => [...prev, day]);
    } else {
      setCompletedLessons(prev => prev.filter(d => d !== day));
      setLessonStatus(prev => ({
        ...prev,
        [day]: { status: 'not_started' }
      }));
    }
  }, [completedLessons, lessonStatus, checklistState]);

  const toggleChecklistItem = useCallback((day, itemIndex) => {
    setChecklistState(prev => {
      const dayState = prev[day] || {};
      return {
        ...prev,
        [day]: {
          ...dayState,
          [itemIndex]: !dayState[itemIndex]
        }
      };
    });
  }, []);

  const areAllChecklistsComplete = useCallback((day) => {
    const dayChecklist = bootcampData.checklists.find(c => c.day === day);
    if (!dayChecklist || !dayChecklist.items || dayChecklist.items.length === 0) return true;

    const dayChecklistState = checklistState[day] || {};
    return dayChecklist.items.every((_, idx) => dayChecklistState[idx]);
  }, [checklistState]);

  const handleStartOrComplete = useCallback((day) => {
    const statusData = lessonStatus[day];
    const status = statusData?.status;
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

  const toggleWeek = useCallback((week) => {
    setExpandedWeeks((prev) => ({ ...prev, [week]: !prev[week] }));
  }, []);

  const isCompleted = useCallback((day) => completedLessons.includes(day), [completedLessons]);

  const lesson = useMemo(() => curriculum.find((l) => l.day === currentDay), [curriculum, currentDay]);

  const progressPercent = useMemo(() =>
    Math.round((completedLessons.length / curriculum.length) * 100),
    [completedLessons.length, curriculum.length]
  );

  const handleNavigate = useCallback((tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  }, []);

  const handleSelectDay = useCallback((day) => {
    setCurrentDay(day);
    setActiveTab("lessons");
    setSidebarOpen(false);
  }, []);

  const handleReset = useCallback(() => {
    if (window.confirm("Are you sure you want to reset all progress? This will clear all completed lessons, time tracking, and lesson status.")) {
      setCompletedLessons([]);
      setLessonTimeSpent({});
      setLessonStatus({});
      setCurrentDay(1);
      setActiveTab("dashboard");
      setExpandedWeeks({ 1: true, 2: false });
    }
  }, []);

  return (
    <ErrorBoundary darkMode={darkMode}>
      <div className={`min-h-screen flex flex-col md:flex-row ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <Sidebar
          currentDay={currentDay}
          completedLessons={completedLessons}
          expandedWeeks={expandedWeeks}
          activeTab={activeTab}
          darkMode={darkMode}
          sidebarOpen={sidebarOpen}
          sidebarCollapsed={sidebarCollapsed}
          curriculum={curriculum}
          progressPercent={progressPercent}
          lessonStatus={lessonStatus}
          onToggleWeek={toggleWeek}
          onSelectDay={handleSelectDay}
          onNavigate={handleNavigate}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onReset={handleReset}
          onStartLesson={startLesson}
          onCompleteLesson={toggleCompletion}
          goToDashboard={() => setActiveTab("dashboard")}
        />

        <main className={`flex-1 overflow-y-auto w-full ${darkMode ? "bg-gray-900" : "bg-white"}`} role="main">
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
                checklistState={checklistState}
                toggleChecklistItem={toggleChecklistItem}
                areAllChecklistsComplete={areAllChecklistsComplete}
                lessonStatus={lessonStatus}
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
    </ErrorBoundary>
  );
};

export default BootcampApp;
