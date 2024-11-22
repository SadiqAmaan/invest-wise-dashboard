import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const PortfolioList = ({ portfolios, selectedPortfolio, onPortfolioSelect, onCreatePortfolio }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredPortfolios = portfolios.filter(portfolio => {
    const matchesSearch = portfolio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         portfolio.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || portfolio.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getPerformanceColor = (performance) => {
    const value = parseFloat(performance.replace('%', ''));
    return value >= 0 ? 'text-success' : 'text-error';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'status-positive';
      case 'Rebalancing': return 'status-neutral';
      case 'Under Review': return 'status-negative';
      default: return 'status-neutral';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Portfolios</h2>
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={onCreatePortfolio}
          >
            Create
          </Button>
        </div>

        {/* Search */}
        <Input
          type="search"
          placeholder="Search portfolios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-3"
        />

        {/* Filter Tabs */}
        <div className="flex space-x-1">
          {[
            { key: 'all', label: 'All' },
            { key: 'growth', label: 'Growth' },
            { key: 'conservative', label: 'Conservative' },
            { key: 'balanced', label: 'Balanced' }
          ].map(filter => (
            <button
              key={filter.key}
              onClick={() => setFilterType(filter.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filterType === filter.key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio List */}
      <div className="flex-1 overflow-y-auto">
        {filteredPortfolios.map(portfolio => (
          <div
            key={portfolio.id}
            onClick={() => onPortfolioSelect(portfolio)}
            className={`p-4 border-b border-border cursor-pointer transition-colors hover:bg-muted/30 ${
              selectedPortfolio?.id === portfolio.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm text-foreground truncate">{portfolio.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{portfolio.manager}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-sm ${getStatusColor(portfolio.status)}`}>
                {portfolio.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">AUM:</span>
                <span className="font-medium text-foreground ml-1">{portfolio.totalValue}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Performance:</span>
                <span className={`font-medium ml-1 ${getPerformanceColor(portfolio.performance)}`}>
                  {portfolio.performance}
                </span>
              </div>
            </div>

            <div className="mt-2 text-xs text-muted-foreground">
              {portfolio.holdings} holdings • Updated {portfolio.lastUpdated}
            </div>
          </div>
        ))}

        {filteredPortfolios.length === 0 && (
          <div className="p-8 text-center">
            <Icon name="Search" size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No portfolios found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioList;