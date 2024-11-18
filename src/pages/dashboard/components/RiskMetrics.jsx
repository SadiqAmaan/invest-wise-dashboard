import React from 'react';
import Icon from '../../../components/AppIcon';
import metricsData from '../../../pages/portfolio-management/components/riskMetrics.json';

const RiskMetrics = () => {
  const metrics = metricsData;

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-success';
      case 'warning': return 'text-warning';
      case 'danger': return 'text-error';
      default: return 'text-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'danger': return 'XCircle';
      default: return 'Info';
    }
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Risk Metrics</h3>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          Detailed Analysis
        </button>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getStatusIcon(metric.status)} 
                    size={16} 
                    className={getStatusColor(metric.status)}
                  />
                  <h4 className="text-sm font-medium text-foreground">
                    {metric.name}
                  </h4>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-xl font-semibold text-foreground font-data">
                    {metric.value}
                  </span>
                  <span className={`text-sm font-medium ${getChangeColor(metric.change)} font-data`}>
                    {metric.change > 0 ? '+' : ''}{metric.change?.toFixed(2)}
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={14} />
          <span>Risk metrics updated every 15 minutes during market hours</span>
        </div>
      </div>
    </div>
  );
};

export default RiskMetrics;