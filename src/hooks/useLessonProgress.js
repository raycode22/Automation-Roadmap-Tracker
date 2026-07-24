/**
 * Custom hook for managing lesson progress and timing
 * Handles lesson completion status, time tracking, and persistence
 */

import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage.js';

export function useLessonProgress() {
  // Use localStorage hooks for persistence
  const [completedLessons, setCompletedLessons] = useLocalStorage('bootcampProgress', []);
  const [lessonTimeSpent, setLessonTimeSpent] = useLocalStorage('lessonTimeSpent', {});
  const [lessonStatus, setLessonStatus] = useLocalStorage('lessonStatus', {});
  const [checklistState, setChecklistState] = useLocalStorage('checklistState', {});

  // Check if a lesson is completed
  const isCompleted = useCallback((day) => {
    return completedLessons.includes(day);
  }, [completedLessons]);

  // Get lesson status (not_started, in_progress, completed)
  const getLessonStatus = useCallback((day) => {
    const statusData = lessonStatus?.[day];
    return statusData?.status || 'not_started';
  }, [lessonStatus]);

  // Start a lesson
  const startLesson = useCallback((day) => {
    const startTime = Date.now();
    setLessonStatus(prev => ({
      ...prev,
      [day]: { status: 'in_progress', startTime }
    }));
  }, [setLessonStatus]);

  // Toggle lesson completion with checklist validation
  const toggleCompletion = useCallback((day, checklistItems = [], currentChecklistState = {}) => {
    const isCurrentlyCompleted = completedLessons.includes(day);
    
    const dayChecklistState = currentChecklistState[day] || {};
    const allChecklistsComplete = checklistItems.length === 0 ||
      checklistItems.every((_, idx) => dayChecklistState[idx]);

    if (!isCurrentlyCompleted) {
      if (!allChecklistsComplete) {
        return { success: false, reason: 'checklist_incomplete' };
      }

      // Get time from timer storage
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
      return { success: true };
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
      
      return { success: true };
    }
  }, [completedLessons, setLessonTimeSpent, setLessonStatus, setCompletedLessons]);

  // Toggle checklist item
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
  }, [setChecklistState]);

  // Check if all checklists are complete for a lesson
  const areAllChecklistsComplete = useCallback((day, checklistItems) => {
    if (!checklistItems || checklistItems.length === 0) return true;
    
    const dayChecklistState = checklistState[day] || {};
    return checklistItems.every((_, idx) => dayChecklistState[idx]);
  }, [checklistState]);

  // Reset all progress
  const resetProgress = useCallback(() => {
    setCompletedLessons([]);
    setLessonTimeSpent({});
    setLessonStatus({});
    setChecklistState({});
    
    // Clear all timer data
    for (let i = 1; i <= 30; i++) {
      try {
        localStorage.removeItem(`timer_${i}`);
      } catch (error) {
        console.error('Error clearing timer data:', error);
      }
    }
  }, [setCompletedLessons, setLessonTimeSpent, setLessonStatus, setChecklistState]);

  return {
    completedLessons,
    lessonTimeSpent,
    lessonStatus,
    checklistState,
    isCompleted,
    getLessonStatus,
    startLesson,
    toggleCompletion,
    toggleChecklistItem,
    areAllChecklistsComplete,
    resetProgress,
    setCompletedLessons,
    setLessonTimeSpent,
    setLessonStatus,
    setChecklistState
  };
}

export default useLessonProgress;
