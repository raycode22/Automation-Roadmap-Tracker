import React from 'react';

const ChecklistsView = ({ checklists, darkMode }) => (
  <div 
    className={`p-8 rounded-xl border-2 ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}
  >
    <h2 
      className={`text-2xl font-bold mb-6 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}
    >
      Daily Checklists
    </h2>
    <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
      Track your daily tasks and ensure you complete all essential activities for each lesson.
    </p>

    <div className="space-y-6">
      {checklists.map((dayChecklist) => (
        <div
          key={dayChecklist.day}
          className={`p-6 rounded-lg border-2 ${
            darkMode ? 'border-gray-600 bg-gray-750' : 'border-gray-200 bg-gray-50'
          }`}
        >
          <h3 
            className={`text-lg font-bold mb-4 flex items-center gap-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            <span 
              className={`px-3 py-1 rounded-full text-sm ${
                darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
              }`}
            >
              Day {dayChecklist.day}
            </span>
          </h3>
          <div className="space-y-3">
            {dayChecklist.items.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      darkMode ? 'border-gray-500' : 'border-gray-300'
                    }`}
                    aria-hidden="true"
                  />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {item.task}
                  </span>
                </div>
                <span 
                  className={`text-sm px-2 py-1 rounded ${
                    darkMode ? 'bg-gray-600 text-gray-400' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ChecklistsView;
