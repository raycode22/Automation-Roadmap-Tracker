import React, { useEffect, useState } from 'react';
import { Keyboard, X } from 'lucide-react';

const ShortcutModal = ({ isOpen, onClose, darkMode }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !isClient) return null;

  const shortcuts = [
    { keys: ['Space'], description: 'Start/Stop timer (in lesson view)', category: 'Timer' },
    { keys: ['Ctrl/Cmd', 'Enter'], description: 'Mark lesson as complete/incomplete', category: 'Actions' },
    { keys: ['?'], description: 'Show/hide this keyboard shortcuts modal', category: 'Navigation' },
    { keys: ['1'], description: 'Go to Dashboard', category: 'Navigation' },
    { keys: ['2'], description: 'Go to Lessons', category: 'Navigation' },
    { keys: ['3'], description: 'Go to Resources', category: 'Navigation' },
    { keys: ['4'], description: 'Go to Reference', category: 'Navigation' },
    { keys: ['5'], description: 'Go to Checklists', category: 'Navigation' },
    { keys: ['6'], description: 'Go to Instructor Info', category: 'Navigation' },
    { keys: ['↑', '↓'], description: 'Navigate between lessons (in sidebar)', category: 'Navigation' },
    { keys: ['d'], description: 'Toggle dark mode', category: 'Settings' },
    { keys: ['s'], description: 'Toggle sidebar collapse', category: 'Settings' },
  ];

  const categories = [...new Set(shortcuts.map(s => s.category))];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className={`relative w-full max-w-2xl mx-4 rounded-xl shadow-2xl ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-center justify-between p-6 border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 
            id="modal-title"
            className={`text-2xl font-bold flex items-center gap-3 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            <Keyboard size={28} className="text-blue-600" />
            Keyboard Shortcuts
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition ${
              darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {categories.map((category) => (
            <div key={category} className="mb-6 last:mb-0">
              <h3 className={`text-lg font-semibold mb-3 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {category}
              </h3>
              <div className="space-y-2">
                {shortcuts
                  .filter((s) => s.category === category)
                  .map((shortcut, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        darkMode ? 'bg-gray-900' : 'bg-gray-50'
                      }`}
                    >
                      <span className={`text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {shortcut.description}
                      </span>
                      <div className="flex items-center gap-2">
                        {shortcut.keys.map((key, keyIdx) => (
                          <React.Fragment key={keyIdx}>
                            <kbd
                              className={`px-3 py-1.5 text-xs font-mono font-semibold rounded border ${
                                darkMode
                                  ? 'bg-gray-800 border-gray-600 text-gray-300'
                                  : 'bg-white border-gray-300 text-gray-700'
                              }`}
                            >
                              {key}
                            </kbd>
                            {keyIdx < shortcut.keys.length - 1 && (
                              <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>
                                +
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`p-6 border-t ${
          darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'
        }`}>
          <p className={`text-sm text-center ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Press <kbd className={`px-2 py-1 text-xs font-mono rounded border ${
              darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'
            }`}>?</kbd> anytime to toggle this help modal
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShortcutModal;
