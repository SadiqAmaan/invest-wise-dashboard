import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'report_generated': return 'FileText';
      case 'report_sent': return 'Send';
      case 'report_downloaded': return 'Download';
      case 'email_sent': return 'Mail';
      case 'schedule_created': return 'Calendar';
      case 'template_created': return 'Plus';
      case 'client_viewed': return 'Eye';
      case 'report_failed': return 'AlertTriangle';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'report_generated': return 'text-success';
      case 'report_sent': return 'text-primary';
      case 'report_downloaded': return 'text-accent';
      case 'email_sent': return 'text-primary';
      case 'schedule_created': return 'text-secondary';
      case 'template_created': return 'text-success';
      case 'client_viewed': return 'text-accent';
      case 'report_failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return time.toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-foreground">Recent Activity</h3>
      
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
            <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getActivityColor(activity.type)}`}>
              <Icon name={getActivityIcon(activity.type)} size={14} />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">{activity.user}</span>
                {' '}
                <span className="text-muted-foreground">{activity.action}</span>
                {activity.target && (
                  <>
                    {' '}
                    <span className="font-medium">{activity.target}</span>
                  </>
                )}
              </p>
              
              {activity.details && (
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.details}
                </p>
              )}
              
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs text-muted-foreground">
                  {formatTimeAgo(activity.timestamp)}
                </span>
                
                {activity.portfolio && (
                  <>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {activity.portfolio}
                    </span>
                  </>
                )}
              </div>
            </div>
            
            {activity.status && (
              <div className={`text-xs px-2 py-1 rounded-full font-medium ${
                activity.status === 'success' ? 'text-success bg-success/10' :
                activity.status === 'failed' ? 'text-error bg-error/10' :
                activity.status === 'pending'? 'text-warning bg-warning/10' : 'text-muted-foreground bg-muted'
              }`}>
                {activity.status}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {activities.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={32} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No recent activity</p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;