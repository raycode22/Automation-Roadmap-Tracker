import React, { useState } from 'react';
import { Download, X, Check } from 'lucide-react';

const ExportModal = ({ isOpen, onClose, progressData, timeData }) => {
  const [exportFormat, setExportFormat] = useState('markdown');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  if (!isOpen) return null;

  const generateMarkdown = () => {
    const today = new Date().toLocaleDateString();
    let md = `# Bootcamp Progress Report\n\n`;
    md += `*Generated on: ${today}*\n\n`;
    
    // Summary Stats
    const totalLessons = Object.values(progressData).flat().length;
    const completedLessons = Object.values(progressData).flat().filter(l => l.completed).length;
    const completionRate = Math.round((completedLessons / totalLessons) * 100) || 0;
    
    md += `## 📊 Summary\n\n`;
    md += `- **Total Lessons:** ${totalLessons}\n`;
    md += `- **Completed:** ${completedLessons}\n`;
    md += `- **Completion Rate:** ${completionRate}%\n\n`;
    
    // Time Tracking
    const totalTimeSeconds = Object.values(timeData).reduce((sum, t) => sum + t, 0);
    const totalHours = (totalTimeSeconds / 3600).toFixed(1);
    
    md += `## ⏱️ Time Spent\n\n`;
    md += `- **Total Hours:** ${totalHours}h\n`;
    md += `- **Total Minutes:** ${Math.floor(totalTimeSeconds / 60)}min\n\n`;
    
    // Weekly Breakdown
    md += `## 📅 Weekly Progress\n\n`;
    Object.entries(progressData).forEach(([day, lessons]) => {
      const dayCompleted = lessons.filter(l => l.completed).length;
      md += `### ${day}\n`;
      md += `- Completed: ${dayCompleted}/${lessons.length}\n`;
      
      lessons.forEach(lesson => {
        const status = lesson.completed ? '✅' : '⬜';
        const timeSpent = timeData[`${day}-${lesson.id}`] || 0;
        const minutes = Math.floor(timeSpent / 60);
        md += `  - ${status} **${lesson.title}** (${minutes}min)\n`;
      });
      md += `\n`;
    });
    
    return md;
  };

  const generateJSON = () => {
    return JSON.stringify({
      generatedAt: new Date().toISOString(),
      summary: {
        totalLessons: Object.values(progressData).flat().length,
        completedLessons: Object.values(progressData).flat().filter(l => l.completed).length,
        totalTimeSeconds: Object.values(timeData).reduce((sum, t) => sum + t, 0)
      },
      progress: progressData,
      timeTracking: timeData
    }, null, 2);
  };

  const generateCSV = () => {
    let csv = 'Day,Lesson Title,Status,Time Spent (minutes)\n';
    
    Object.entries(progressData).forEach(([day, lessons]) => {
      lessons.forEach(lesson => {
        const timeSpent = timeData[`${day}-${lesson.id}`] || 0;
        const minutes = Math.floor(timeSpent / 60);
        const status = lesson.completed ? 'Completed' : 'In Progress';
        csv += `${day},"${lesson.title}",${status},${minutes}\n`;
      });
    });
    
    return csv;
  };

  const handleExport = () => {
    setIsExporting(true);
    
    setTimeout(() => {
      let content, filename, mimeType;
      
      switch (exportFormat) {
        case 'markdown':
          content = generateMarkdown();
          filename = `bootcamp-progress-${new Date().toISOString().split('T')[0]}.md`;
          mimeType = 'text/markdown';
          break;
        case 'json':
          content = generateJSON();
          filename = `bootcamp-progress-${new Date().toISOString().split('T')[0]}.json`;
          mimeType = 'application/json';
          break;
        case 'csv':
          content = generateCSV();
          filename = `bootcamp-progress-${new Date().toISOString().split('T')[0]}.csv`;
          mimeType = 'text/csv';
          break;
        default:
          content = generateMarkdown();
          filename = `bootcamp-progress.md`;
          mimeType = 'text/markdown';
      }
      
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setIsExporting(false);
      setExportSuccess(true);
      
      setTimeout(() => {
        setExportSuccess(false);
        onClose();
      }, 2000);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Export Progress</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Format
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'markdown', label: 'Markdown', icon: '📝' },
                  { id: 'json', label: 'JSON', icon: '📋' },
                  { id: 'csv', label: 'CSV', icon: '📊' }
                ].map(format => (
                  <button
                    key={format.id}
                    onClick={() => setExportFormat(format.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      exportFormat === format.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{format.icon}</div>
                    <div className="text-xs font-medium">{format.label}</div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                What's included:
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Completion status for all lessons</li>
                <li>• Time spent on each lesson</li>
                <li>• Overall progress statistics</li>
                <li>• Weekly breakdown</li>
              </ul>
            </div>
            
            {exportSuccess ? (
              <div className="flex items-center justify-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg">
                <Check className="w-5 h-5" />
                <span>Export successful!</span>
              </div>
            ) : (
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isExporting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Download {exportFormat.toUpperCase()}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
