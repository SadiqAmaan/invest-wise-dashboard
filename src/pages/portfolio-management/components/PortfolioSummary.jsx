import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import quickActionsData from './portfolioQuickActions.json';
import riskMetricsData from './riskMetrics.json';

const PortfolioSummary = ({ portfolio, onQuickAction }) => {
  if (!portfolio) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center text-muted-foreground">
          <Icon name="BarChart3" size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">Portfolio summary will appear here</p>
        </div>
      </div>
    );
  }

  const quickActions = quickActionsData;

  const riskMetrics = riskMetricsData.map(metric => ({
    ...metric,
    value: portfolio && portfolio[metric.label.toLowerCase().replace(' ', '')] !== undefined ? portfolio[metric.label.toLowerCase().replace(' ', '')] : metric.value
  }));

  const topHoldings = portfolio.topHoldings || [];
  const recentTransactions = portfolio.recentTransactions || [];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h3>
        <div className="space-y-2">
          {quickActions.map(action => (
            <Button
              key={action.id}
              variant={action.variant}
              size="sm"
              iconName={action.icon}
              iconPosition="left"
              fullWidth
              onClick={() => onQuickAction(action.id)}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Risk Metrics</h3>
        <div className="space-y-3">
          {riskMetrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <div className="text-sm font-medium text-foreground">{metric.label}</div>
                <div className="text-xs text-muted-foreground">{metric.description}</div>
              </div>
              <div className="text-sm font-semibold text-foreground">{metric.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Holdings */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Top Holdings</h3>
          <Button variant="ghost" size="sm" iconName="ExternalLink">
            View All
          </Button>
        </div>
        <div className="space-y-2">
          {topHoldings.slice(0, 5).map((holding, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">{holding.symbol}</div>
                <div className="text-xs text-muted-foreground truncate">{holding.name}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">{holding.weight}%</div>
                <div className={`text-xs ${
                  holding.change.startsWith('+') ? 'text-success' : 'text-error'
                }`}>
                  {holding.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
          <Button variant="ghost" size="sm" iconName="History">
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {recentTransactions.slice(0, 3).map((transaction, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                transaction.type === 'buy' ? 'bg-success' : 
                transaction.type === 'sell' ? 'bg-error' : 'bg-warning'
              }`}></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-foreground">
                  <span className="font-medium capitalize">{transaction.type}</span> {transaction.shares} shares of {transaction.symbol}
                </div>
                <div className="text-xs text-muted-foreground">{transaction.date}</div>
              </div>
              <div className="text-sm font-medium text-foreground">{transaction.amount}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Performance Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">1 Day</span>
            <span className={`text-sm font-medium ${
              portfolio.performance1d?.startsWith('+') ? 'text-success' : 'text-error'
            }`}>
              {portfolio.performance1d}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">1 Week</span>
            <span className={`text-sm font-medium ${
              portfolio.performance1w?.startsWith('+') ? 'text-success' : 'text-error'
            }`}>
              {portfolio.performance1w}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">1 Month</span>
            <span className={`text-sm font-medium ${
              portfolio.performance1m?.startsWith('+') ? 'text-success' : 'text-error'
            }`}>
              {portfolio.performance1m}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">YTD</span>
            <span className={`text-sm font-medium ${
              portfolio.performance?.startsWith('+') ? 'text-success' : 'text-error'
            }`}>
              {portfolio.performance}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;