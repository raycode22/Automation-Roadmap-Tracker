import React, { useState, useEffect } from 'react';
import { TrendingUp, CheckCircle, Clock, Target, Calendar } from 'lucide-react';
import { dashboardAPI } from '@/lib/api';
import { DashboardData } from '@/types';
import { formatNumber, formatPercentage } from '@/lib/utils';
import LoadingSpinner from '@/components/LoadingSpinner';
import { toast } from 'react-hot-toast';

const DashboardPage: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await dashboardAPI.getDashboardData();
        setDashboardData(data);
      } catch (error: any) {
        setError(error.message || 'Failed to load dashboard data');
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'Failed to load dashboard data'}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 btn btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  const { overview, weeklyProgress, toolStats } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Track your progress through the 6-week automation roadmap
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-success-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Completed</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {formatNumber(overview.completedActivities)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-warning-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {formatNumber(overview.inProgressActivities)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Target className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Overall Progress</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {formatPercentage(overview.overallCompletionPercent)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Current Streak</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {overview.currentStreak} days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Progress</h2>
        <div className="space-y-4">
          {weeklyProgress.map((week) => (
            <div key={week.weekNumber} className="flex items-center space-x-4">
              <div className="w-20 text-sm font-medium text-gray-900">
                Week {week.weekNumber}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{week.title}</span>
                  <span className="font-medium text-gray-900">
                    {week.completedActivities}/{week.totalActivities} ({formatPercentage(week.completionPercent)})
                  </span>
                </div>
                <div className="mt-1">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${week.completionPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tool Breakdown */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tools Used</h2>
        {toolStats.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {toolStats.map((tool) => (
              <div key={tool.tool} className="text-center">
                <div className="text-2xl font-bold text-primary-600">
                  {tool.count}
                </div>
                <div className="text-sm text-gray-600 capitalize">
                  {tool.tool.replace('_', ' ')}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            No progress yet. Start completing activities to see tool usage!
          </p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => window.location.href = '/roadmap'}
            className="btn btn-primary btn-lg"
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            View Roadmap
          </button>
          <button
            onClick={() => window.location.href = '/progress'}
            className="btn btn-outline btn-lg"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Track Progress
          </button>
          <button
            onClick={() => window.location.href = '/artifacts'}
            className="btn btn-outline btn-lg"
          >
            <Target className="h-5 w-5 mr-2" />
            View Artifacts
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;