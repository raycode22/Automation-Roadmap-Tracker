import React, { useState } from 'react';
import { Maximize2, Minimize2, X, Clock, BookOpen, CheckCircle } from 'lucide-react';

const FocusMode = ({ isOpen, onClose, currentLesson, timer, timeData }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen || !currentLesson) return null;

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalTimeSeconds = timeData[currentLesson.id] || 0;
  const formattedTotal = formatTime(totalTimeSeconds);

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-gray-900 text-white rounded-lg shadow-2xl p-4 flex items-center gap-4 min-w-[300px]">
          <div className="flex-1">
            <div className="text-xs text-gray-400">Focus Mode</div>
            <div className="font-semibold truncate">{currentLesson.title}</div>
          </div>
          <div className="text-2xl font-mono font-bold">{formatTime(timer)}</div>
          <button
            onClick={() => setIsMinimized(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="Expand"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="Exit Focus Mode"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-blue-400" />
          <span className="text-white font-semibold">Focus Mode</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            title="Minimize"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            title="Exit Focus Mode"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-4xl w-full space-y-8">
          {/* Lesson Info */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {currentLesson.title}
            </h1>
            <p className="text-gray-400 text-lg">
              {currentLesson.day}
            </p>
          </div>

          {/* Timer Display */}
          <div className="bg-gray-800 rounded-2xl p-8 md:p-12">
            <div className="text-center space-y-4">
              <div className="text-gray-400 text-sm uppercase tracking-wider">
                Current Session
              </div>
              <div className="text-7xl md:text-9xl font-mono font-bold text-white tabular-nums">
                {formatTime(timer)}
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Total: {formattedTotal}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {currentLesson.completed ? 'Completed' : 'In Progress'}
              </div>
              <div className="text-gray-400 text-sm">Status</div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{formattedTotal}</div>
              <div className="text-gray-400 text-sm">Total Time</div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <BookOpen className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {Math.ceil(totalTimeSeconds / 3600)}h
              </div>
              <div className="text-gray-400 text-sm">Est. to Mastery</div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-900/20 border border-blue-800 rounded-xl p-6">
            <h3 className="text-blue-400 font-semibold mb-2">💡 Focus Tips</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Eliminate distractions and stay focused on this lesson</li>
              <li>• Take a 5-minute break every 25-30 minutes</li>
              <li>• Use the timer to track your deep work sessions</li>
              <li>• Press <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Ctrl+Enter</kbd> to mark as complete</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusMode;
