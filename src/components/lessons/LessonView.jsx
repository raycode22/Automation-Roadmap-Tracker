import React, { useMemo, useState, useEffect } from 'react';
import { 
  Target, Zap, BookOpen, Lightbulb, ClipboardList, ExternalLink, 
  CheckCircle2, Clock
} from 'lucide-react';
import bootcampData from '../../bootcampData.js';

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
  lessonStatus
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  
  const dayChecklist = useMemo(() => 
    bootcampData.checklists.find(c => c.day === currentDay), 
    [currentDay]
  );
  
  const allChecklistsComplete = useMemo(() => 
    areAllChecklistsComplete(currentDay), 
    [areAllChecklistsComplete, currentDay]
  );

  // Start timer when lesson is viewed and lesson status is in_progress
  useEffect(() => {
    const statusData = lessonStatus?.[currentDay];
    const status = statusData?.status;
    if (status === 'in_progress' && !timerRunning) {
      setTimerRunning(true);
    } else if (status !== 'in_progress' && timerRunning) {
      setTimerRunning(false);
    }
  }, [currentDay, lessonStatus, timerRunning]);

  // Timer interval
  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

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
        </div>
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
