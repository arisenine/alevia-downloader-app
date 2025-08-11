import React, { useMemo } from 'react';
import { BarChart3, TrendingUp, Download, Clock, X, Calendar, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getDownloadHistory, getDownloadStats } from '../utils/storage';
import { formatBytes } from '../utils/formatters';

interface DownloadAnalyticsProps {
  onClose: () => void;
}

const DownloadAnalytics = React.memo<DownloadAnalyticsProps>(({ onClose }) => {
  const history = useMemo(() => getDownloadHistory(), []);
  const stats = useMemo(() => getDownloadStats(), []);

  const chartData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const dayHistory = history.filter(item => {
        const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
        return itemDate === date;
      });

      return {
        date,
        downloads: dayHistory.length,
        successful: dayHistory.filter(h => h.success).length,
        failed: dayHistory.filter(h => !h.success).length
      };
    });
  }, [history]);

  const platformStats = useMemo(() => {
    const platforms: Record<string, { total: number; successful: number; failed: number }> = {};
    
    history.forEach(item => {
      if (!platforms[item.platform]) {
        platforms[item.platform] = { total: 0, successful: 0, failed: 0 };
      }
      platforms[item.platform].total++;
      if (item.success) {
        platforms[item.platform].successful++;
      } else {
        platforms[item.platform].failed++;
      }
    });

    return Object.entries(platforms)
      .map(([platform, data]) => ({
        platform,
        ...data,
        successRate: data.total > 0 ? (data.successful / data.total) * 100 : 0
      }))
      .sort((a, b) => b.total - a.total);
  }, [history]);

  const timeStats = useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const hourlyData = hours.map(hour => {
      const hourDownloads = history.filter(item => {
        const itemHour = new Date(item.timestamp).getHours();
        return itemHour === hour;
      });
      return {
        hour,
        downloads: hourDownloads.length
      };
    });

    const mostActiveHour = hourlyData.reduce((max, current) => 
      current.downloads > max.downloads ? current : max
    );

    return { hourlyData, mostActiveHour };
  }, [history]);

  const achievements = useMemo(() => {
    const achievements = [];
    
    if (stats.total >= 100) achievements.push({ title: 'Download Master', desc: '100+ downloads', icon: '🏆' });
    if (stats.total >= 50) achievements.push({ title: 'Power User', desc: '50+ downloads', icon: '⚡' });
    if (stats.total >= 10) achievements.push({ title: 'Getting Started', desc: '10+ downloads', icon: '🚀' });
    if (stats.successRate >= 95) achievements.push({ title: 'Perfectionist', desc: '95%+ success rate', icon: '🎯' });
    if (stats.recentActivity >= 7) achievements.push({ title: 'Weekly Warrior', desc: '7+ downloads this week', icon: '📅' });
    
    return achievements;
  }, [stats]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Download Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Insights into your download activity
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="w-10 h-10 p-0 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-6 text-center border border-yellow-200 dark:border-yellow-700">
              <Download className="w-8 h-8 mx-auto mb-3 text-yellow-600 dark:text-yellow-400" />
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.total}</div>
              <div className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Total Downloads</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 text-center border border-green-200 dark:border-green-700">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-green-600 dark:text-green-400" />
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.successRate.toFixed(1)}%</div>
              <div className="text-sm font-medium text-green-700 dark:text-green-300">Success Rate</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 text-center border border-blue-200 dark:border-blue-700">
              <Calendar className="w-8 h-8 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.recentActivity}</div>
              <div className="text-sm font-medium text-blue-700 dark:text-blue-300">This Week</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 text-center border border-purple-200 dark:border-purple-700">
              <Zap className="w-8 h-8 mx-auto mb-3 text-purple-600 dark:text-purple-400" />
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.averagePerDay.toFixed(1)}</div>
              <div className="text-sm font-medium text-purple-700 dark:text-purple-300">Daily Average</div>
            </div>
          </div>

          {/* Activity Chart */}
          <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">7-Day Activity</h4>
            <div className="space-y-4">
              {chartData.map((day, index) => (
                <div key={day.date} className="flex items-center space-x-4">
                  <div className="w-20 text-sm text-gray-600 dark:text-gray-400">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex-1 flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-6 relative overflow-hidden">
                      <div 
                        className="bg-green-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.max((day.successful / Math.max(...chartData.map(d => d.downloads))) * 100, 5)}%` }}
                      />
                      <div 
                        className="bg-red-500 h-full rounded-full absolute top-0 transition-all duration-300"
                        style={{ 
                          left: `${Math.max((day.successful / Math.max(...chartData.map(d => d.downloads))) * 100, 5)}%`,
                          width: `${Math.max((day.failed / Math.max(...chartData.map(d => d.downloads))) * 100, 2)}%` 
                        }}
                      />
                    </div>
                    <div className="w-16 text-sm text-gray-600 dark:text-gray-400 text-right">
                      {day.downloads}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Successful</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Failed</span>
              </div>
            </div>
          </div>

          {/* Platform Statistics */}
          <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Platform Usage</h4>
            <div className="space-y-4">
              {platformStats.slice(0, 5).map((platform, index) => (
                <div key={platform.platform} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white capitalize">
                        {platform.platform}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {platform.total} downloads • {platform.successRate.toFixed(1)}% success
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {platform.successful}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      successful
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Analysis */}
          <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Activity Patterns</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Most Active Hour</h5>
                <div className="flex items-center space-x-3">
                  <Clock className="w-8 h-8 text-yellow-500" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {timeStats.mostActiveHour.hour}:00
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {timeStats.mostActiveHour.downloads} downloads
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Peak Activity</h5>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  You're most active during {timeStats.mostActiveHour.hour >= 12 ? 'afternoon' : 'morning'} hours.
                  {timeStats.mostActiveHour.hour >= 22 || timeStats.mostActiveHour.hour <= 6 ? ' Night owl detected! 🦉' : ''}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          {achievements.length > 0 && (
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Achievements</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {achievement.title}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {achievement.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

DownloadAnalytics.displayName = 'DownloadAnalytics';

export default DownloadAnalytics;
