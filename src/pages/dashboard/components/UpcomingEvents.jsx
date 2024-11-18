import React from 'react';
import Icon from '../../../components/AppIcon';
import upcomingEvents from './upcomingEvents.json';

const UpcomingEvents = () => {
  const events = upcomingEvents;

  const getEventIcon = (type) => {
    switch (type) {
      case 'market': return 'TrendingUp';
      case 'meeting': return 'Users';
      case 'earnings': return 'DollarSign';
      case 'task': return 'CheckSquare';
      default: return 'Calendar';
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'market': return 'bg-primary/10 text-primary';
      case 'meeting': return 'bg-success/10 text-success';
      case 'earnings': return 'bg-warning/10 text-warning';
      case 'task': return 'bg-accent/10 text-accent';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-success';
      default: return 'bg-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Upcoming Events</h3>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          View Calendar
        </button>
      </div>
      
      <div className="divide-y divide-border">
        {events.map((event) => (
          <div key={event.id} className="p-4 hover:bg-muted/20 transition-colors">
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getEventColor(event.type)}`}>
                <Icon name={getEventIcon(event.type)} size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-foreground">
                    {event.title}
                  </h4>
                  <div className={`w-2 h-2 rounded-full ${getPriorityColor(event.priority)}`} />
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">
                  {event.description}
                </p>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
              
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="MoreVertical" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 transition-colors font-medium">
          Add Event
        </button>
      </div>
    </div>
  );
};

export default UpcomingEvents;