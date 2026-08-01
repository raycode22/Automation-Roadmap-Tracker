import React, { useMemo, useState, useEffect } from 'react';
import { 
  Target, Zap, BookOpen, Lightbulb, ClipboardList, ExternalLink, 
  CheckCircle2, Clock
} from 'lucide-react';
import bootcampData from '../../data';

const ConceptCard = ({ concept, darkMode }) => (
  <div 
    className={`p-4 md:p-6 rounded-lg border ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
    }`}
  >
    <h3 
      className={`text-base md:text-lg font-semibold mb-2 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}
    >
      {concept.name}
    </h3>
    <p 
      className={`mb-3 text-sm md:text-base ${
        darkMode ? 'text-gray-300' : 'text-gray-700'
      }`}
    >
      {concept.explanation}
    </p>
    {concept.analogy && (
      <div 
        className={`p-3 rounded text-xs md:text-sm mb-3 italic ${
          darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-50 text-gray-700'
        }`}
      >
        💡 <strong>Analogy:</strong> {concept.analogy}
      </div>
    )}
    {concept.example && (
      <pre 
        className={`p-3 rounded text-xs overflow-x-auto mb-3 ${
          darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-800 text-gray-100'
        }`}
      >
        {concept.example}
      </pre>
    )}
    {concept.methods && (
      <ul className="space-y-2">
        {concept.methods.map((m, i) => (
          <li key={i} className="text-xs md:text-sm">
            <strong className="text-blue-600">{m.method}</strong>:{" "}
            <span className={darkMode ? 'text-gray-300' : ''}>{m.use}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const ObjectiveItem = ({ objective, index, darkMode }) => (
  <li className="flex gap-3 md:gap-4">
    <div 
      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs md:text-sm font-semibold min-w-[24px] ${
        darkMode ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-600'
      }`}
      aria-hidden="true"
    >
      {index + 1}
    </div>
    <p 
      className={`leading-relaxed text-sm md:text-base ${
        darkMode ? 'text-gray-300' : 'text-gray-700'
      }`}
    >
      {objective}
    </p>
  </li>
);

const StepItem = ({ step, index, darkMode }) => (
  <div 
    className={`border-l-4 border-blue-600 pl-4 md:pl-6 ${
      darkMode ? 'border-blue-500' : ''
    }`}
  >
    <h3 
      className={`text-base md:text-lg font-semibold mb-2 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}
    >
      Step {index + 1}: {step.title}
    </h3>
    <p 
      className={`mb-3 text-sm md:text-base ${
        darkMode ? 'text-gray-300' : 'text-gray-700'
      }`}
    >
      {step.description}
    </p>
    {step.action && (
      <pre 
        className="bg-gray-800 text-gray-100 p-3 rounded text-xs overflow-x-auto mb-3"
        aria-label="Code example"
      >
        {step.action}
      </pre>
    )}
    {step.notes && (
      <p className="text-xs md:text-sm text-gray-600 italic">{step.notes}</p>
    )}
  </div>
);

const ExerciseCard = ({ exercise, darkMode }) => (
  <div 
    className={`border-l-4 border-purple-600 p-4 md:p-6 rounded-lg ${
      darkMode ? 'bg-purple-900 bg-opacity-20' : 'bg-purple-50'
    }`}
  >
    <h3 
      className={`text-base md:text-lg font-semibold mb-2 ${
        darkMode ? 'text-purple-300' : 'text-purple-900'
      }`}
    >
      {exercise.title}
    </h3>
    <p 
      className={`mb-3 text-sm md:text-base ${
        darkMode ? 'text-gray-300' : 'text-gray-700'
      }`}
    >
      {exercise.description}
    </p>
    {exercise.platform && (
      <div className="mb-4">
        <span 
          className={`inline-block px-3 py-1 text-xs md:text-sm font-semibold rounded ${
            darkMode ? 'bg-purple-800 text-purple-200' : 'bg-purple-200 text-purple-800'
          }`}
        >
          Platform: {exercise.platform}
        </span>
      </div>
    )}
    {exercise.steps && (
      <div className="mb-4">
        <p 
          className={`text-xs md:text-sm font-semibold mb-2 ${
            darkMode ? 'text-gray-300' : 'text-gray-900'
          }`}
        >
          Steps:
        </p>
        <ol className="list-decimal list-inside space-y-2">
          {exercise.steps.map((step, i) => (
            <li key={i} className={`text-xs md:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {step}
            </li>
          ))}
        </ol>
      </div>
    )}
    {exercise.expected && (
      <div 
        className={`p-3 rounded text-xs md:text-sm ${
          darkMode ? 'bg-purple-800 bg-opacity-50 text-purple-200' : 'bg-purple-100 text-gray-700'
        }`}
      >
        <strong>Expected Result:</strong> {exercise.expected}
      </div>
    )}
  </div>
);

const ActivityCard = ({ activity, darkMode }) => (
  <div 
    className={`border-l-4 border-green-600 p-4 md:p-6 rounded-lg ${
      darkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-50'
    }`}
  >
    <h3 
      className={`text-base md:text-lg font-semibold mb-2 ${
        darkMode ? 'text-green-300' : 'text-green-900'
      }`}
    >
      {activity.title}
    </h3>
    <p 
      className={`mb-3 text-sm md:text-base ${
        darkMode ? 'text-gray-300' : 'text-gray-700'
      }`}
    >
      {activity.description}
    </p>
    {activity.duration && (
      <p 
        className={`text-xs md:text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}
      >
        ⏱️ Duration: {activity.duration}
      </p>
    )}
  </div>
);

const ResourceLink = ({ resource, darkMode }) => (
  <a
    href={resource.url}
    target="_blank"
    rel="noopener noreferrer"
    className={`block p-4 rounded-lg border transition ${
      darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-50'
    }`}
    aria-label={`Open ${resource.title} in new tab`}
  >
    <h3 
      className={`text-sm md:text-base font-semibold flex items-center gap-2 ${
        darkMode ? 'text-blue-300' : 'text-blue-700'
      }`}
    >
      {resource.title}
      <ExternalLink size={14} aria-hidden="true" />
    </h3>
    {resource.description && (
      <p 
        className={`text-xs md:text-sm mt-1 ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        {resource.description}
      </p>
    )}
  </a>
);

const LessonView = ({ 
  lesson, 
  currentDay, 
  isCompleted, 
  toggleCompletion, 
  darkMode, 
  checklistState, 
  toggleChecklistItem, 
  areAllChecklistsComplete,
  lessonStatus,
  startLesson,
  isDayUnlocked
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(Date.now());
  
  const dayChecklist = useMemo(() => 
    bootcampData.checklists.find(c => c.day === currentDay), 
    [currentDay]
  );
  
  const allChecklistsComplete = useMemo(() => 
    areAllChecklistsComplete(currentDay), 
    [areAllChecklistsComplete, currentDay]
  );

  // Load saved timer state from localStorage on mount or day change
  useEffect(() => {
    try {
      const savedTimerData = localStorage.getItem(`timer_${currentDay}`);
      if (savedTimerData) {
        const { time, timestamp } = JSON.parse(savedTimerData);
        // Calculate elapsed time since last save (handles page refresh)
        const now = Date.now();
        const elapsedSinceSave = Math.floor((now - timestamp) / 1000);
        setElapsedTime(time + elapsedSinceSave);
        setLastSaveTime(now);
      } else {
        setElapsedTime(0);
        setLastSaveTime(Date.now());
      }
    } catch (error) {
      console.error('Error loading timer state:', error);
      setElapsedTime(0);
      setLastSaveTime(Date.now());
    }
  }, [currentDay]);

  // Timer only runs when explicitly started by user
  // Timer interval with periodic saves
  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setElapsedTime(prev => {
          const newTime = prev + 1;
          // Save to localStorage every 5 seconds
          if (newTime % 5 === 0) {
            try {
              localStorage.setItem(`timer_${currentDay}`, JSON.stringify({
                time: newTime,
                timestamp: Date.now()
              }));
            } catch (error) {
              console.error('Error saving timer state:', error);
            }
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, currentDay]);

  // Save timer state on unmount or day change
  useEffect(() => {
    return () => {
      if (elapsedTime > 0) {
        try {
          localStorage.setItem(`timer_${currentDay}`, JSON.stringify({
            time: elapsedTime,
            timestamp: Date.now()
          }));
        } catch (error) {
          console.error('Error saving timer state on unmount:', error);
        }
      }
    };
  }, [elapsedTime, currentDay]);

  // Handle tab visibility changes - pause timer when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && timerRunning) {
        // Tab is hidden, save current state
        try {
          localStorage.setItem(`timer_${currentDay}`, JSON.stringify({
            time: elapsedTime,
            timestamp: Date.now()
          }));
        } catch (error) {
          console.error('Error saving timer on visibility change:', error);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [timerRunning, elapsedTime, currentDay]);

  // Listen for storage events from other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === `timer_${currentDay}` && e.newValue) {
        try {
          const { time, timestamp } = JSON.parse(e.newValue);
          const now = Date.now();
          const elapsedSinceSave = Math.floor((now - timestamp) / 1000);
          setElapsedTime(time + elapsedSinceSave);
          setLastSaveTime(now);
        } catch (error) {
          console.error('Error syncing timer from other tab:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [currentDay]);

  // Format time display as hh:mm:ss
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Format time display as HH:MM:SS (always with hours)
  const formatTimeFull = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer control functions
  const handleStartTimer = () => {
    setTimerRunning(true);
  };

  const handlePauseTimer = () => {
    setTimerRunning(false);
  };

  const handleResetTimer = () => {
    setTimerRunning(false);
    setElapsedTime(0);
    try {
      localStorage.removeItem(`timer_${currentDay}`);
    } catch (error) {
      console.error('Error removing timer data:', error);
    }
  };

  const isLessonStarted = elapsedTime > 0 || timerRunning;

  return (
    <>
      <div className="mb-8 md:mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
          <span 
            className={`inline-block px-3 py-1 text-xs md:text-sm font-semibold rounded ${
              darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
            }`}
          >
            Day {lesson.day}
          </span>
          {isCompleted(lesson.day) && (
            <span 
              className={`inline-flex items-center gap-1 px-3 py-1 text-xs md:text-sm font-semibold rounded ${
                darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
              }`}
            >
              <CheckCircle2 size={16} aria-hidden="true" />
              Completed
            </span>
          )}
          {/* Live Timer Display */}
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 text-xs md:text-sm font-semibold rounded ${
              darkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-700'
            }`}
          >
            <Clock size={16} aria-hidden="true" />
            Time: {formatTime(elapsedTime)}
          </span>
          {/* Timer Controls - Show when lesson is started or in progress */}
          {(isLessonStarted || timerRunning) && (
            <div className="flex items-center gap-2">
              {!timerRunning ? (
                <button
                  onClick={handleStartTimer}
                  className={`px-3 py-1 text-xs md:text-sm font-semibold rounded flex items-center gap-1 transition ${
                    darkMode 
                      ? 'bg-green-700 hover:bg-green-600 text-white' 
                      : 'bg-green-600 hover:bg-green-500 text-white'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  Resume
                </button>
              ) : (
                <button
                  onClick={handlePauseTimer}
                  className={`px-3 py-1 text-xs md:text-sm font-semibold rounded flex items-center gap-1 transition ${
                    darkMode 
                      ? 'bg-yellow-700 hover:bg-yellow-600 text-white' 
                      : 'bg-yellow-600 hover:bg-yellow-500 text-white'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                  Pause
                </button>
              )}
              <button
                onClick={handleResetTimer}
                className={`px-3 py-1 text-xs md:text-sm font-semibold rounded flex items-center gap-1 transition ${
                  darkMode 
                    ? 'bg-red-700 hover:bg-red-600 text-white' 
                    : 'bg-red-600 hover:bg-red-500 text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                </svg>
                Reset
              </button>
            </div>
          )}
        </div>
        {/* Start Lesson Button - Only show when lesson hasn't been started */}
        {!isLessonStarted && !isCompleted(lesson.day) && (
          <div className="mb-4">
            <button
              onClick={handleStartTimer}
              className={`px-6 py-3 text-base font-bold rounded-lg flex items-center gap-2 transition ${
                darkMode 
                  ? 'bg-blue-700 hover:bg-blue-600 text-white' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Start Learning Session
            </button>
          </div>
        )}
        <h1 
          className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 leading-tight ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          {lesson.title}
        </h1>
        <p 
          className={`text-base md:text-lg leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {lesson.focus}
        </p>
      </div>

      {/* Daily Checklist Section */}
      {dayChecklist && dayChecklist.items && dayChecklist.items.length > 0 && (
        <section className="mb-8 md:mb-10" aria-labelledby="checklist-heading">
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <ClipboardList size={20} className="md:w-6 md:h-6 text-green-600 flex-shrink-0" aria-hidden="true" />
            <h2 id="checklist-heading" className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Daily Checklist
            </h2>
          </div>
          <div 
            className={`p-4 md:p-6 rounded-lg border ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}
          >
            <ul className="space-y-3">
              {dayChecklist.items.map((item, idx) => {
                const isChecked = checklistState[currentDay]?.[idx] || false;
                return (
                  <li key={idx} className="flex items-start gap-3">
                    <button
                      onClick={() => toggleChecklistItem(currentDay, idx)}
                      className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition ${
                        isChecked
                          ? 'bg-green-600 border-green-600 text-white'
                          : darkMode
                          ? 'border-gray-500 hover:border-green-500'
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                      aria-pressed={isChecked}
                      aria-label={`Toggle task: ${item.task}`}
                    >
                      {isChecked && <CheckCircle2 size={14} aria-hidden="true" />}
                    </button>
                    <div className="flex-1">
                      <p 
                        className={`text-sm md:text-base ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        } ${isChecked ? 'line-through opacity-60' : ''}`}
                      >
                        {item.task}
                      </p>
                      {item.time && (
                        <p 
                          className={`text-xs ${
                            darkMode ? 'text-gray-500' : 'text-gray-500'
                          }`}
                        >
                          ⏱️ {item.time}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
            {!allChecklistsComplete && (
              <p 
                className={`mt-4 text-sm ${
                  darkMode ? 'text-yellow-400' : 'text-yellow-600'
                }`}
                role="alert"
              >
                ⚠️ Complete all checklist items to unlock the "Mark as Complete" button
              </p>
            )}
          </div>
        </section>
      )}

      {lesson.concepts && (
        <section className="mb-8 md:mb-10" aria-labelledby="concepts-heading">
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <Target size={20} className="md:w-6 md:h-6 text-blue-600 flex-shrink-0" aria-hidden="true" />
            <h2 id="concepts-heading" className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Core Concepts
            </h2>
          </div>
          <div className="space-y-4 md:space-y-6">
            {lesson.concepts.map((concept, idx) => (
              <ConceptCard key={idx} concept={concept} darkMode={darkMode} />
            ))}
          </div>
        </section>
      )}

      {lesson.objectives && (
        <section className="mb-8 md:mb-10" aria-labelledby="objectives-heading">
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <Zap size={20} className="md:w-6 md:h-6 text-orange-600 flex-shrink-0" aria-hidden="true" />
            <h2 id="objectives-heading" className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Learning Objectives
            </h2>
          </div>
          <ul className="space-y-3">
            {lesson.objectives.map((obj, idx) => (
              <ObjectiveItem key={idx} objective={obj} index={idx} darkMode={darkMode} />
            ))}
          </ul>
        </section>
      )}

      {lesson.steps && (
        <section className="mb-8 md:mb-10" aria-labelledby="steps-heading">
          <h2 id="steps-heading" className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Step-by-Step Guide
          </h2>
          <div className="space-y-4 md:space-y-6">
            {lesson.steps.map((step, idx) => (
              <StepItem key={idx} step={step} index={idx} darkMode={darkMode} />
            ))}
          </div>
        </section>
      )}

      {lesson.exercises && lesson.exercises.length > 0 && (
        <section className="mb-8 md:mb-10" aria-labelledby="exercises-heading">
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <Zap size={20} className="md:w-6 md:h-6 text-purple-600 flex-shrink-0" aria-hidden="true" />
            <h2 id="exercises-heading" className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Hands-On Exercises
            </h2>
          </div>
          <div className="space-y-4 md:space-y-6">
            {lesson.exercises.map((exercise, idx) => (
              <ExerciseCard key={idx} exercise={exercise} darkMode={darkMode} />
            ))}
          </div>
        </section>
      )}

      {lesson.activities && lesson.activities.length > 0 && (
        <section className="mb-8 md:mb-10" aria-labelledby="activities-heading">
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <Target size={20} className="md:w-6 md:h-6 text-green-600 flex-shrink-0" aria-hidden="true" />
            <h2 id="activities-heading" className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Learning Activities
            </h2>
          </div>
          <div className="space-y-4 md:space-y-6">
            {lesson.activities.map((activity, idx) => (
              <ActivityCard key={idx} activity={activity} darkMode={darkMode} />
            ))}
          </div>
        </section>
      )}

      {lesson.resources && lesson.resources.length > 0 && (
        <section className="mb-8 md:mb-10" aria-labelledby="resources-heading">
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <ExternalLink size={20} className="md:w-6 md:h-6 text-blue-600 flex-shrink-0" aria-hidden="true" />
            <h2 id="resources-heading" className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Additional Resources
            </h2>
          </div>
          <div className="space-y-2">
            {lesson.resources.map((resource, idx) => (
              <ResourceLink key={idx} resource={resource} darkMode={darkMode} />
            ))}
          </div>
        </section>
      )}

      <div 
        className={`mt-10 p-6 rounded-xl border-2 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <button
          onClick={() => toggleCompletion(currentDay)}
          disabled={!allChecklistsComplete && !isCompleted(currentDay)}
          className={`w-full py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-3 ${
            isCompleted(currentDay)
              ? darkMode
                ? 'bg-green-700 hover:bg-green-600 text-white'
                : 'bg-green-600 hover:bg-green-500 text-white'
              : !allChecklistsComplete
              ? darkMode
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : darkMode
              ? 'bg-blue-700 hover:bg-blue-600 text-white'
              : 'bg-blue-600 hover:bg-blue-500 text-white'
          }`}
          aria-label={
            isCompleted(currentDay) 
              ? 'Mark lesson as incomplete' 
              : allChecklistsComplete 
                ? 'Mark lesson as complete' 
                : 'Complete checklists first'
          }
        >
          {isCompleted(currentDay) ? (
            <>
              <CheckCircle2 size={24} aria-hidden="true" /> Mark as Incomplete
            </>
          ) : !allChecklistsComplete ? (
            <>
              <CheckCircle2 size={24} aria-hidden="true" /> Complete Checklists First
            </>
          ) : (
            <>
              <CheckCircle2 size={24} aria-hidden="true" /> Mark as Complete
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default LessonView;
