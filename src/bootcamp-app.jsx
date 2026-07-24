import React, { useState, useEffect, useCallback, useMemo } from "react";
import { BookOpen, Keyboard } from "lucide-react";
import bootcampData from "./data";
import Sidebar from "./components/Sidebar";
import ErrorBoundary from "./components/errors/ErrorBoundary";
import Dashboard from "./components/dashboard/Dashboard";
import LessonView from "./components/lessons/LessonView";
import ResourcesView from "./components/resources/ResourcesView";
import ReferenceView from "./components/resources/ReferenceView";
import ChecklistsView from "./components/resources/ChecklistsView";
import InstructorView from "./components/resources/InstructorView";
import EmptyState from "./components/common/EmptyState";
import ToastContainer from "./components/common/ToastContainer";
import ShortcutModal from "./components/common/ShortcutModal";
import SearchFilterBar from "./components/SearchFilterBar";

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
  const [toasts, setToasts] = useState([]);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [autoStartedLesson, setAutoStartedLesson] = useState(false);
  
  // Phase 2: Search, Filter, Sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortOption, setSortOption] = useState('default');

  const curriculum = bootcampData.lessons;

  const addToast = useCallback((toast) => {
    const id = Date.now();
    const newToast = {
      id,
      type: toast.type || 'info',
      title: toast.title,
      message: toast.message,
      duration: toast.duration || 5000,
      action: toast.action,
    };
    setToasts(prev => [...prev, newToast]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const startLesson = useCallback((day) => {
    const startTime = Date.now();
    setLessonStatus(prev => ({
      ...prev,
      [day]: { status: 'in_progress', startTime }
    }));
    setCurrentDay(day);
    setActiveTab("lessons");
  }, []);

  const toggleCompletion = useCallback((day) => {
    const isCurrentlyCompleted = completedLessons.includes(day);

    const dayChecklist = bootcampData.checklists.find(c => c.day === day);
    const checklistItems = dayChecklist?.items || [];
    const dayChecklistState = checklistState[day] || {};
    const allChecklistsComplete = checklistItems.length === 0 ||
      checklistItems.every((_, idx) => dayChecklistState[idx]);

    if (!isCurrentlyCompleted) {
      if (!allChecklistsComplete) {
        addToast({
          type: 'warning',
          title: 'Checklist Incomplete',
          message: 'Please complete all checklist items before marking the lesson as complete.',
          duration: 4000,
        });
        return;
      }

      let timeSpent = 0;
      try {
        const timerData = localStorage.getItem(`timer_${day}`);
        if (timerData) {
          const { time } = JSON.parse(timerData);
          timeSpent = time;
          localStorage.removeItem(`timer_${day}`);
        }
      } catch (error) {
        console.error('Error reading timer data:', error);
        const endTime = Date.now();
        const startTime = lessonStatus[day]?.startTime || endTime;
        timeSpent = Math.round((endTime - startTime) / 1000);
      }

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
      try {
        localStorage.removeItem(`timer_${day}`);
      } catch (error) {
        console.error('Error removing timer data:', error);
      }
    }
  }, [completedLessons, lessonStatus, checklistState, addToast]);

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

  const lesson = useMemo(() => curriculum.find((l) => l.day === currentDay), [curriculum, currentDay]);

  // Load preferences from localStorage
  useEffect(() => {
    const savedSearch = localStorage.getItem('bootcampSearch');
    if (savedSearch) setSearchTerm(savedSearch);
    
    const savedFilter = localStorage.getItem('bootcampFilter');
    if (savedFilter) setFilterStatus(savedFilter);
    
    const savedSort = localStorage.getItem('bootcampSort');
    if (savedSort) setSortOption(savedSort);
    
    // Smart default: auto-expand current week based on progress
    const savedProgress = localStorage.getItem('bootcampProgress');
    if (savedProgress) {
      const completed = JSON.parse(savedProgress);
      const currentWeek = completed.length > 0 ? 
        Math.ceil(completed[completed.length - 1] / 5) : 1;
      setExpandedWeeks(prev => ({ ...prev, [currentWeek]: true }));
    }
  }, []);
  
  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('bootcampSearch', searchTerm);
    localStorage.setItem('bootcampFilter', filterStatus);
    localStorage.setItem('bootcampSort', sortOption);
  }, [searchTerm, filterStatus, sortOption]);

  // Keyboard shortcuts handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing in input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // Show/hide shortcuts modal with ?
      if (e.key === '?' && !e.shiftKey) {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
        return;
      }

      // Close shortcuts modal with Escape
      if (e.key === 'Escape' && showShortcuts) {
        setShowShortcuts(false);
        return;
      }

      // Navigation shortcuts (1-6)
      const navKeys = ['1', '2', '3', '4', '5', '6'];
      const tabMap = {
        '1': 'dashboard',
        '2': 'lessons',
        '3': 'resources',
        '4': 'reference',
        '5': 'checklists',
        '6': 'instructor',
      };
      
      if (navKeys.includes(e.key) && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const targetTab = tabMap[e.key];
        if (targetTab) {
          setActiveTab(targetTab);
          addToast({
            type: 'info',
            title: 'Navigation',
            message: `Switched to ${targetTab.charAt(0).toUpperCase() + targetTab.slice(1)}`,
            duration: 2000,
          });
        }
        return;
      }

      // Toggle dark mode with 'd'
      if (e.key === 'd' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setDarkMode(prev => !prev);
        addToast({
          type: 'info',
          title: 'Theme',
          message: darkMode ? 'Switched to light mode' : 'Switched to dark mode',
          duration: 2000,
        });
        return;
      }

      // Toggle sidebar collapse with 's'
      if (e.key === 's' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setSidebarCollapsed(prev => !prev);
        return;
      }

      // Mark lesson complete with Ctrl/Cmd + Enter (only in lesson view)
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && activeTab === 'lessons' && lesson) {
        e.preventDefault();
        const statusData = lessonStatus?.[currentDay];
        const status = statusData?.status;
        if (!status || status === 'not_started') {
          startLesson(currentDay);
        } else if (status === 'in_progress') {
          toggleCompletion(currentDay);
        }
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, lesson, currentDay, lessonStatus, startLesson, toggleCompletion, darkMode, addToast, showShortcuts]);

  // Auto-start timer when entering a lesson for the first time
  useEffect(() => {
    if (activeTab === 'lessons' && lesson && !autoStartedLesson) {
      const statusData = lessonStatus?.[lesson.day];
      const status = statusData?.status;
      
      if (!status || status === 'not_started') {
        // Auto-start the lesson
        startLesson(lesson.day);
        setAutoStartedLesson(true);
        addToast({
          type: 'info',
          title: 'Timer Started',
          message: `Learning session started for Day ${lesson.day}`,
          duration: 3000,
        });
      }
    }
    
    // Reset auto-start flag when changing lessons
    if (activeTab !== 'lessons' || !lesson) {
      setAutoStartedLesson(false);
    }
  }, [activeTab, lesson?.day, autoStartedLesson, lessonStatus, startLesson, addToast]);

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

  const progressPercent = useMemo(() =>
    Math.round((completedLessons.length / curriculum.length) * 100),
    [completedLessons.length, curriculum.length]
  );

  // Phase 2: Filtered and sorted curriculum
  const filteredCurriculum = useMemo(() => {
    let filtered = [...curriculum];
    
    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(lesson => 
        lesson.title.toLowerCase().includes(searchLower) ||
        lesson.description?.toLowerCase().includes(searchLower) ||
        `day ${lesson.day}`.toLowerCase().includes(searchLower) ||
        lesson.topics?.some(topic => topic.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(lesson => {
        const isCompleted = completedLessons.includes(lesson.day);
        const statusData = lessonStatus[lesson.day];
        const status = statusData?.status || 'not_started';
        
        switch (filterStatus) {
          case 'completed':
            return isCompleted;
          case 'in-progress':
            return status === 'in_progress';
          case 'not-started':
            return !isCompleted && status === 'not_started';
          case 'bookmarked':
            return lesson.bookmarked || false;
          default:
            return true;
        }
      });
    }
    
    // Apply sorting
    if (sortOption !== 'default') {
      filtered.sort((a, b) => {
        switch (sortOption) {
          case 'time-spent':
            return (lessonTimeSpent[b.day] || 0) - (lessonTimeSpent[a.day] || 0);
          case 'time-spent-asc':
            return (lessonTimeSpent[a.day] || 0) - (lessonTimeSpent[b.day] || 0);
          case 'difficulty':
            const diffMap = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
            return (diffMap[a.difficulty] || 2) - (diffMap[b.difficulty] || 2);
          case 'last-accessed':
            // Would need lastAccessed tracking - fallback to day order
            return a.day - b.day;
          case 'name':
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
    }
    
    return filtered;
  }, [curriculum, searchTerm, filterStatus, sortOption, completedLessons, lessonStatus, lessonTimeSpent]);

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
              <>
                {/* Phase 2: Search and Filter Bar */}
                <SearchFilterBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  filterStatus={filterStatus}
                  setFilterStatus={setFilterStatus}
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                  totalResults={filteredCurriculum.length}
                  totalCount={curriculum.length}
                />
                
                {/* Display filtered lessons when no specific lesson is selected */}
                <div className="grid gap-4">
                  {filteredCurriculum.length === 0 ? (
                    <EmptyState
                      darkMode={darkMode}
                      icon={BookOpen}
                      title="No lessons found"
                      description={searchTerm ? `No lessons match "${searchTerm}"` : "Try adjusting your filters"}
                    />
                  ) : (
                    filteredCurriculum.map(lesson => (
                      <div
                        key={lesson.day}
                        onClick={() => handleSelectDay(lesson.day)}
                        className={`p-4 rounded-lg cursor-pointer transition-all ${
                          darkMode 
                            ? 'bg-gray-800 hover:bg-gray-700' 
                            : 'bg-white hover:bg-gray-50 shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{lesson.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Day {lesson.day} • {lesson.duration || 'Self-paced'}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {completedLessons.includes(lesson.day) && (
                              <span className="text-green-500 text-sm">✓ Complete</span>
                            )}
                            <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                              View →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
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
        
        {/* Toast Notifications */}
        <ToastContainer 
          toasts={toasts} 
          onDismiss={dismissToast} 
          darkMode={darkMode} 
        />
        
        {/* Keyboard Shortcuts Modal */}
        <ShortcutModal 
          isOpen={showShortcuts} 
          onClose={() => setShowShortcuts(false)} 
          darkMode={darkMode} 
        />
      </div>
    </ErrorBoundary>
  );
};

export default BootcampApp;
