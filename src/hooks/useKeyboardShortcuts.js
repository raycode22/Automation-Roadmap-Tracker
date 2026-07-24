/**
 * Custom hook for managing keyboard shortcuts
 * Provides consistent keyboard navigation across the application
 */

import { useEffect, useCallback } from 'react';

export function useKeyboardShortcuts(shortcuts, dependencies = []) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing in input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // Check each shortcut configuration
      for (const shortcut of shortcuts) {
        const {
          key,
          ctrlKey = false,
          metaKey = false,
          shiftKey = false,
          preventDefault = true,
          action
        } = shortcut;

        // Check if modifier keys match
        if (
          (ctrlKey && !e.ctrlKey) ||
          (metaKey && !e.metaKey) ||
          (shiftKey && !e.shiftKey)
        ) {
          continue;
        }

        // Check if the key matches
        if (e.key.toLowerCase() === key.toLowerCase()) {
          if (preventDefault) {
            e.preventDefault();
          }
          action(e);
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, ...dependencies]);
}

/**
 * Pre-configured shortcut configurations for common actions
 */
export const shortcutPresets = {
  // Navigation shortcuts (1-6)
  navigation: (onNavigate, addToast) => [
    { key: '1', action: () => { onNavigate('dashboard'); addToast?.({ type: 'info', title: 'Navigation', message: 'Switched to Dashboard', duration: 2000 }); } },
    { key: '2', action: () => { onNavigate('lessons'); addToast?.({ type: 'info', title: 'Navigation', message: 'Switched to Lessons', duration: 2000 }); } },
    { key: '3', action: () => { onNavigate('resources'); addToast?.({ type: 'info', title: 'Navigation', message: 'Switched to Resources', duration: 2000 }); } },
    { key: '4', action: () => { onNavigate('reference'); addToast?.({ type: 'info', title: 'Navigation', message: 'Switched to Quick Ref', duration: 2000 }); } },
    { key: '5', action: () => { onNavigate('checklists'); addToast?.({ type: 'info', title: 'Navigation', message: 'Switched to Checklists', duration: 2000 }); } },
    { key: '6', action: () => { onNavigate('instructor'); addToast?.({ type: 'info', title: 'Navigation', message: 'Switched to Instructor', duration: 2000 }); } }
  ],

  // Theme toggle
  theme: (onToggle, addToast, isDark) => ({
    key: 'd',
    action: () => {
      onToggle();
      addToast?.({
        type: 'info',
        title: 'Theme',
        message: isDark ? 'Switched to light mode' : 'Switched to dark mode',
        duration: 2000,
      });
    }
  }),

  // Sidebar collapse
  sidebarCollapse: (onToggle) => ({
    key: 's',
    action: () => onToggle()
  }),

  // Show shortcuts modal
  showHelp: (onShow) => ({
    key: '?',
    shiftKey: false,
    action: () => onShow(true)
  }),

  // Close modal with Escape
  closeOnEscape: (onClose, isOpen) => ({
    key: 'Escape',
    action: () => isOpen && onClose()
  }),

  // Complete lesson with Ctrl/Cmd + Enter
  completeLesson: (onComplete, isActive, lesson) => ({
    key: 'Enter',
    ctrlKey: true,
    metaKey: true,
    action: () => {
      if (isActive && lesson) {
        onComplete(lesson.day);
      }
    }
  })
};

export default useKeyboardShortcuts;
