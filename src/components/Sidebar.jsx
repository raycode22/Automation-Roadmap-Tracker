import React from "react";
import {
  ChevronDown,
  CheckCircle2,
  Circle,
  BookOpen,
  ExternalLink,
  Lightbulb,
  ClipboardList,
  Tent,
  BarChart3,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "lessons", label: "Lessons", icon: BookOpen },
  { id: "resources", label: "Resources", icon: ExternalLink },
  { id: "reference", label: "Quick Ref", icon: Lightbulb },
  { id: "checklists", label: "Checklist", icon: ClipboardList },
  { id: "instructor", label: "Instructor", icon: Tent },
];

const Sidebar = ({
  currentDay,
  completedLessons,
  expandedWeeks,
  activeTab,
  darkMode,
  sidebarOpen,
  curriculum,
  progressPercent,
  onToggleWeek,
  onSelectDay,
  onNavigate,
  onToggleSidebar,
  onToggleDarkMode,
}) => {
  const isCompleted = (day) => completedLessons.includes(day);

  const weekLessons = (week) => curriculum.filter((l) => l.week === week);

  return (
    <>
      {/* Mobile Header */}
      <header
        className={`md:hidden sticky top-0 z-50 flex items-center justify-between p-4 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border-b`}
      >
        <div className="flex items-center gap-2">
          <Tent size={20} className="text-blue-600" />
          <h1
            className={`text-lg font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Ray's Bootcamp
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-lg transition ${
              darkMode
                ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={onToggleSidebar}
            className={`p-2 rounded-lg transition ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 md:hidden bg-black bg-opacity-50 z-30 top-16"
          onClick={onToggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-16 md:top-0 left-0 z-40 h-[calc(100vh-4rem)] md:h-screen w-64 transition-transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border-r shadow-sm md:shadow-none`}
      >
        <div className="sticky top-0 bg-inherit">
          <div
            className={`p-4 md:p-6 border-b ${
              darkMode ? "border-gray-700" : "border-gray-100"
            } hidden md:flex items-center justify-between`}
          >
            <div className="flex items-center gap-2">
              <BookOpen size={24} className="text-blue-600" />
              <h1
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Bootcamp
              </h1>
            </div>
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-lg transition ${
                darkMode
                  ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              title={darkMode ? "Light mode" : "Dark mode"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
          <p
            className={`px-4 md:px-6 pt-3 md:pt-0 text-xs md:text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Technical Automation Architect
          </p>

          {/* Circular Progress */}
          <div
            className={`px-4 md:px-6 py-4 md:py-6 border-b ${
              darkMode ? "border-gray-700" : "border-gray-100"
            }`}
          >
            <CircularProgress
              percent={progressPercent}
              size={100}
              darkMode={darkMode}
              curriculumLength={curriculum.length}
              completedCount={completedLessons.length}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav
          className="overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 280px)" }}
        >
          {[1, 2].map((week) => (
            <WeekSection
              key={week}
              week={week}
              lessons={weekLessons(week)}
              currentDay={currentDay}
              completedLessons={completedLessons}
              expandedWeeks={expandedWeeks}
              darkMode={darkMode}
              onToggleWeek={onToggleWeek}
              onSelectDay={onSelectDay}
              isCompleted={isCompleted}
            />
          ))}

          {/* Tab Navigation */}
          <div
            className={`border-t ${
              darkMode ? "border-gray-700" : "border-gray-100"
            } p-3 md:p-4 mt-4 space-y-2`}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full px-3 py-2 text-sm rounded flex items-center gap-2 transition min-h-[44px] ${
                  activeTab === item.id
                    ? darkMode
                      ? "bg-blue-900 text-blue-300"
                      : "bg-blue-100 text-blue-700"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon size={16} /> {item.label}
              </button>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};

const WeekSection = ({
  week,
  lessons,
  currentDay,
  completedLessons,
  expandedWeeks,
  darkMode,
  onToggleWeek,
  onSelectDay,
  isCompleted,
}) => {
  return (
    <div
      className={`border-b ${
        darkMode ? "border-gray-700" : "border-gray-100"
      }`}
    >
      <button
        onClick={() => onToggleWeek(week)}
        className={`w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between transition ${
          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
        }`}
      >
        <h2
          className={`text-sm md:text-base font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Week {week}
        </h2>
        <ChevronDown
          size={18}
          className={`transition-transform ${
            expandedWeeks[week] ? "rotate-180" : ""
          } ${darkMode ? "text-gray-400" : "text-gray-600"}`}
        />
      </button>

      {expandedWeeks[week] && (
        <div className={darkMode ? "bg-gray-700" : "bg-gray-50"}>
          {lessons.map((item) => (
            <button
              key={item.day}
              onClick={() => onSelectDay(item.day)}
              className={`w-full px-4 md:px-6 py-2 md:py-3 text-left flex items-center gap-3 transition text-sm md:text-base ${
                currentDay === item.day
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
                  className={`flex-shrink-0 ${
                    darkMode ? "text-gray-600" : "text-gray-400"
                  }`}
                />
              )}
              <span
                className={`${
                  currentDay === item.day
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
};

const CircularProgress = ({
  percent,
  size = 120,
  darkMode,
  curriculumLength,
  completedCount,
}) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
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
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {percent}%
          </div>
          <div
            className={`text-xs ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Complete
          </div>
        </div>
      </div>
      <p
        className={`text-sm ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {completedCount} of {curriculumLength} days
      </p>
    </div>
  );
};

export default Sidebar;
