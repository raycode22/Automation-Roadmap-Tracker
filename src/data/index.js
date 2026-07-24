/**
 * Central export point for all bootcamp data
 * Provides a unified interface for accessing curriculum, checklists, resources, and instructor data
 */

export { default as curriculum, curriculum } from './curriculum.js';
export { default as checklists, checklists } from './checklists.js';
export { default as resources, resources, quickReference } from './resources.js';
export { default as instructor, instructor } from './instructor.js';

// Re-export combined bootcampData object for backward compatibility
import curriculum from './curriculum.js';
import checklists from './checklists.js';
import { resources, quickReference } from './resources.js';
import instructor from './instructor.js';

const bootcampData = {
  lessons: curriculum,
  checklists,
  resources,
  quickReference,
  instructor
};

export default bootcampData;
