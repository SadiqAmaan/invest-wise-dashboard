import React from 'react';
import Icon from '../../../components/AppIcon';

const PortfolioSummaryCard = ({ title, value, change, changePercent, icon, trend }) => {
  const isPositive = change >= 0;
  const trendColor = isPositive ? 'text-success' : 'text-error';
  const bgColor = isPositive ? 'bg-success/10' : 'bg-error/10';

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-soft transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        <div className={`px-2 py-1 rounded-sm ${bgColor}`}>
          <Icon name={trend} size={14} className={trendColor} />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-semibold text-foreground">{value}</div>
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${trendColor}`}>
            {isPositive ? '+' : ''}{change}
          </span>
          <span className={`text-sm ${trendColor}`}>
            ({isPositive ? '+' : ''}{changePercent}%)
          </span>
          <span className="text-xs text-muted-foreground">today</span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummaryCard;