import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScheduledReportItem = ({ report, onEdit, onPause, onDelete, onViewHistory }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'paused': return 'text-warning bg-warning/10';
      case 'failed': return 'text-error bg-error/10';
      case 'pending': return 'text-primary bg-primary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getFrequencyIcon = (frequency) => {
    switch (frequency) {
      case 'daily': return 'Calendar';
      case 'weekly': return 'CalendarDays';
      case 'monthly': return 'CalendarRange';
      case 'quarterly': return 'CalendarClock';
      default: return 'Calendar';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-medium text-foreground">{report.name}</h4>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(report.status)}`}>
              {report.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{report.template}</p>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(report)}
            className="w-8 h-8"
          >
            <Icon name="Edit2" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPause(report)}
            className="w-8 h-8"
          >
            <Icon name={report.status === 'active' ? 'Pause' : 'Play'} size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(report)}
            className="w-8 h-8 text-error hover:text-error"
          >
            <Icon name="Trash2" size={14} />
          </Button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm">
          <Icon name={getFrequencyIcon(report.frequency)} size={14} className="text-muted-foreground" />
          <span className="text-muted-foreground">Frequency:</span>
          <span className="text-foreground font-medium capitalize">{report.frequency}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Clock" size={14} className="text-muted-foreground" />
          <span className="text-muted-foreground">Next run:</span>
          <span className="text-foreground font-medium">{report.nextRun}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Users" size={14} className="text-muted-foreground" />
          <span className="text-muted-foreground">Recipients:</span>
          <span className="text-foreground font-medium">{report.recipients} clients</span>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Briefcase" size={14} className="text-muted-foreground" />
          <span className="text-muted-foreground">Portfolio:</span>
          <span className="text-foreground font-medium">{report.portfolio}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Last sent: {report.lastSent}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewHistory(report)}
          iconName="History"
          iconPosition="left"
        >
          History
        </Button>
      </div>
    </div>
  );
};

export default ScheduledReportItem;