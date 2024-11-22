import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PortfolioHeader = ({ portfolio, onEdit, onRebalance, onExport }) => {
  if (!portfolio) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center text-muted-foreground">
          <Icon name="Briefcase" size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">Select a Portfolio</h3>
          <p className="text-sm">Choose a portfolio from the left panel to view details</p>
        </div>
      </div>
    );
  }

  const getPerformanceColor = (performance) => {
    const value = parseFloat(performance.replace('%', ''));
    return value >= 0 ? 'text-success' : 'text-error';
  };

  const getPerformanceIcon = (performance) => {
    const value = parseFloat(performance.replace('%', ''));
    return value >= 0 ? 'TrendingUp' : 'TrendingDown';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Header Row */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-2xl font-semibold text-foreground">{portfolio.name}</h1>
            <span className={`text-xs px-2 py-1 rounded-sm ${
              portfolio.status === 'Active' ? 'status-positive' :
              portfolio.status === 'Rebalancing' ? 'status-neutral' : 'status-negative'
            }`}>
              {portfolio.status}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Manager: {portfolio.manager}</span>
            <span>•</span>
            <span>Created: {portfolio.createdDate}</span>
            <span>•</span>
            <span>Last Updated: {portfolio.lastUpdated}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={onExport}
          >
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onRebalance}
          >
            Rebalance
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={onEdit}
          >
            Edit
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Value */}
        <div className="text-center">
          <div className="text-2xl font-semibold text-foreground mb-1">{portfolio.totalValue}</div>
          <div className="text-sm text-muted-foreground">Total Value</div>
          <div className={`flex items-center justify-center mt-2 text-sm ${getPerformanceColor(portfolio.dayChange)}`}>
            <Icon name={getPerformanceIcon(portfolio.dayChange)} size={14} className="mr-1" />
            {portfolio.dayChange} today
          </div>
        </div>

        {/* Performance */}
        <div className="text-center">
          <div className={`text-2xl font-semibold mb-1 ${getPerformanceColor(portfolio.performance)}`}>
            {portfolio.performance}
          </div>
          <div className="text-sm text-muted-foreground">YTD Performance</div>
          <div className="text-sm text-muted-foreground mt-2">
            vs S&P 500: {portfolio.benchmarkComparison}
          </div>
        </div>

        {/* Holdings Count */}
        <div className="text-center">
          <div className="text-2xl font-semibold text-foreground mb-1">{portfolio.holdings}</div>
          <div className="text-sm text-muted-foreground">Holdings</div>
          <div className="text-sm text-muted-foreground mt-2">
            Across {portfolio.sectors} sectors
          </div>
        </div>

        {/* Risk Metrics */}
        <div className="text-center">
          <div className="text-2xl font-semibold text-foreground mb-1">{portfolio.volatility}</div>
          <div className="text-sm text-muted-foreground">Volatility (30d)</div>
          <div className="text-sm text-muted-foreground mt-2">
            Sharpe: {portfolio.sharpeRatio}
          </div>
        </div>
      </div>

      {/* Asset Allocation */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Asset Allocation</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {portfolio.assetAllocation.map((asset, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-semibold text-foreground">{asset.percentage}%</div>
              <div className="text-xs text-muted-foreground">{asset.type}</div>
              <div className="text-xs text-muted-foreground">{asset.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioHeader;