import React, { useMemo } from 'react';
import { 
  Trophy, TrendingUp, Clock, Award, Target, Calendar, Download
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from './StatCard';
import ChartCard from './ChartCard';
import RecordCard from './RecordCard';
import LearningHeatmap from '../LearningHeatmap';
import ExportModal from '../ExportModal';
import FocusMode from '../FocusMode';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const Dashboard = ({ analytics, completedLessons, curriculum, progressPercent, lessonTimeSpent, darkMode }) => {
  const [showExportModal, setShowExportModal] = React.useState(false);
  const [showFocusMode, setShowFocusMode] = React.useState(false);
  
  // Helper function to format seconds as HH:MM:SS
  const formatTimeFull = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Helper function to format seconds as readable time string
  const formatTimeReadable = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m ${secs}s`;
    } else if (mins > 0) {
      return `${mins}m ${secs}s`;
    }
    return `${secs}s`;
  };
  
  const totalTimeSpent = useMemo(() => {
    return Math.round(Object.values(lessonTimeSpent).reduce((sum, t) => sum + t, 0));
  }, [lessonTimeSpent]);

  // Convert lessonTimeSpent to daily totals for heatmap
  const dailyTimeData = useMemo(() => {
    const dailyTotals = {};
    Object.entries(lessonTimeSpent).forEach(([key, seconds]) => {
      // Extract day from key (e.g., "Day 1-lesson-1" -> "Day 1")
      const dayMatch = key.match(/(Day \d+)/);
      if (dayMatch) {
        const day = dayMatch[1];
        dailyTotals[day] = (dailyTotals[day] || 0) + seconds;
      }
    });
    return dailyTotals;
  }, [lessonTimeSpent]);

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 
              className={`text-3xl md:text-4xl font-bold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Learning Dashboard
            </h1>
            <p 
              className={`text-lg ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Track your progress to become a Technical Automation Architect
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowFocusMode(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              title="Enter Focus Mode"
            >
              <Target className="w-5 h-5" />
              <span className="hidden sm:inline">Focus Mode</span>
            </button>
            
            <button
              onClick={() => setShowExportModal(true)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
              title="Export Progress"
            >
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatCard
          icon={Trophy}
          label="Completed"
          value={`${completedLessons.length}/${curriculum.length}`}
          subtext="lessons done"
          colorClass={darkMode ? 'bg-blue-900 bg-opacity-20 border-blue-700' : 'bg-blue-50 border-blue-200'}
          iconColor="text-yellow-500"
          darkMode={darkMode}
        />
        <StatCard
          icon={TrendingUp}
          label="Progress"
          value={`${progressPercent}%`}
          subtext="overall completion"
          colorClass={darkMode ? 'bg-green-900 bg-opacity-20 border-green-700' : 'bg-green-50 border-green-200'}
          iconColor="text-green-500"
          darkMode={darkMode}
        />
        <StatCard
          icon={Clock}
          label="Time Spent"
          value={formatTimeFull(totalTimeSpent)}
          subtext="total learning time"
          colorClass={darkMode ? 'bg-purple-900 bg-opacity-20 border-purple-700' : 'bg-purple-50 border-purple-200'}
          iconColor="text-purple-500"
          darkMode={darkMode}
        />
        <StatCard
          icon={Award}
          label="Streak"
          value={completedLessons.length}
          subtext="days active"
          colorClass={darkMode ? 'bg-orange-900 bg-opacity-20 border-orange-700' : 'bg-orange-50 border-orange-200'}
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
                label={{ value: 'Time (HH:MM:SS)', angle: -90, position: 'insideLeft', fill: darkMode ? "#9ca3af" : "#6b7280" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? "#1f2937" : "#fff",
                  border: `1px solid ${darkMode ? "#374151" : "#e5e7eb"}`,
                  borderRadius: '8px'
                }}
                labelStyle={{ color: darkMode ? "#fff" : "#111" }}
                formatter={(value) => [formatTimeFull(Math.round(value)), 'Time']}
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
            metric={formatTimeReadable(analytics.longestLesson.timeSpent)}
            message="This lesson took the longest time - consider reviewing the concepts again!"
            colorClass={darkMode ? 'bg-red-900 bg-opacity-20 border-red-700' : 'bg-red-50 border-red-200'}
            textColor={darkMode ? 'text-red-300' : 'text-red-700'}
            metricColor={darkMode ? 'text-red-400' : 'text-red-600'}
            darkMode={darkMode}
          />
        )}

        {analytics.fastestLesson && (
          <RecordCard
            title="Quickest Lesson"
            icon={Trophy}
            value={`Day ${analytics.fastestLesson.day}: ${analytics.fastestLesson.title}`}
            metric={formatTimeReadable(analytics.fastestLesson.timeSpent)}
            message="You mastered this one quickly! Great job understanding these concepts."
            colorClass={darkMode ? 'bg-green-900 bg-opacity-20 border-green-700' : 'bg-green-50 border-green-200'}
            textColor={darkMode ? 'text-green-300' : 'text-green-700'}
            metricColor={darkMode ? 'text-green-400' : 'text-green-600'}
            darkMode={darkMode}
          />
        )}
      </div>

      <div 
        className={`p-6 rounded-xl border-2 mb-6 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <h2 
          className={`text-xl font-bold mb-4 flex items-center gap-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          <Calendar size={20} className="text-orange-500" aria-hidden="true" />
          Weekly Progress
        </h2>
        <div className="space-y-4">
          {analytics.weeklyProgress.map((week) => (
            <div key={week.week}>
              <div className="flex justify-between mb-2">
                <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {week.week}
                </span>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {week.completed}/{week.total} lessons ({week.percentage}%)
                </span>
              </div>
              <div className={`w-full h-4 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} role="progressbar" aria-valuenow={week.percentage} aria-valuemin="0" aria-valuemax="100" aria-label={`${week.week} progress`}>
                <div
                  className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                  style={{ width: `${week.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Heatmap */}
      <div 
        className={`p-6 rounded-xl border-2 mb-6 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <h2 
          className={`text-xl font-bold mb-4 flex items-center gap-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          <Calendar size={20} className="text-green-500" aria-hidden="true" />
          Learning Activity (Last 365 Days)
        </h2>
        <LearningHeatmap timeData={dailyTimeData} />
      </div>

      <div 
        className={`p-6 rounded-xl border-2 ${
          darkMode ? 'bg-gradient-to-r from-blue-900 to-purple-900 border-blue-700' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
        }`}
      >
        <h2 
          className={`text-xl font-bold mb-3 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          🎯 Your Path to Becoming Job-Ready
        </h2>
        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          You're building skills in API integration, automation workflows, AI-powered systems, and business problem-solving.
          Keep going - each lesson brings you closer to becoming a Technical Automation Architect ready for 2026!
        </p>
        <div className="flex flex-wrap gap-2">
          {['APIs & Webhooks', 'JSON Data', 'Automation Tools', 'AI Integration', 'Business Systems'].map((skill) => (
            <span 
              key={skill} 
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                darkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-200 text-blue-800'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Modals */}
      <ExportModal 
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        progressData={analytics.progressData || {}}
        timeData={lessonTimeSpent}
      />
      
      <FocusMode 
        isOpen={showFocusMode}
        onClose={() => setShowFocusMode(false)}
        currentLesson={null}
        timer={0}
        timeData={lessonTimeSpent}
      />
    </>
  );
};

export default Dashboard;
