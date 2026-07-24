import React, { useMemo } from 'react';

const LearningHeatmap = ({ timeData }) => {
  // Generate last 365 days of data
  const heatmapData = useMemo(() => {
    const today = new Date();
    const days = [];
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Get time spent on this day (in seconds)
      const seconds = timeData[dateStr] || 0;
      const minutes = Math.floor(seconds / 60);
      
      // Determine intensity level (0-4)
      let level = 0;
      if (minutes > 0) level = 1;
      if (minutes > 30) level = 2;
      if (minutes > 60) level = 3;
      if (minutes > 120) level = 4;
      
      days.push({
        date: dateStr,
        minutes,
        level,
        dayOfWeek: date.getDay(),
        month: date.getMonth(),
        dayOfMonth: date.getDate()
      });
    }
    
    return days;
  }, [timeData]);

  // Group by weeks for grid layout
  const weeks = useMemo(() => {
    const result = [];
    let currentWeek = [];
    
    // Start from the first Sunday before or on the first day
    const startDate = new Date(heatmapData[0].date);
    const startDay = startDate.getDay();
    
    // Add empty cells for days before the start of the first week
    for (let i = 0; i < startDay; i++) {
      currentWeek.push(null);
    }
    
    heatmapData.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        result.push(currentWeek);
        currentWeek = [];
      }
    });
    
    // Pad the last week if needed
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      result.push(currentWeek);
    }
    
    return result;
  }, [heatmapData]);

  const getColor = (level, isDark) => {
    const colors = isDark
      ? ['bg-gray-800', 'bg-green-900', 'bg-green-700', 'bg-green-500', 'bg-green-300']
      : ['bg-gray-200', 'bg-green-200', 'bg-green-400', 'bg-green-600', 'bg-green-800'];
    return colors[level] || colors[0];
  };

  const [tooltip, setTooltip] = React.useState(null);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px]">
        <div className="flex items-end gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="w-3 text-xs text-gray-500 dark:text-gray-400 text-center">
              {day}
            </div>
          ))}
        </div>
        
        <div className="flex gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => {
                if (!day) {
                  return <div key={dayIndex} className="w-3 h-3" />;
                }
                
                return (
                  <div
                    key={day.date}
                    className={`w-3 h-3 rounded-sm ${getColor(day.level, false)} dark:${getColor(day.level, true)} cursor-pointer transition-transform hover:scale-125`}
                    onMouseEnter={(e) => setTooltip({
                      date: day.date,
                      minutes: day.minutes,
                      x: e.clientX,
                      y: e.clientY
                    })}
                    onMouseLeave={() => setTooltip(null)}
                  />
                );
              })}
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map(level => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getColor(level, false)} dark:${getColor(level, true)}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
      
      {tooltip && (
        <div
          className="fixed z-50 px-3 py-2 text-xs bg-gray-900 text-white rounded shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full mt-2"
          style={{ left: tooltip.x, top: tooltip.y - 10 }}
        >
          <div className="font-semibold">{new Date(tooltip.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
          <div>{tooltip.minutes} min studied</div>
        </div>
      )}
    </div>
  );
};

export default LearningHeatmap;
