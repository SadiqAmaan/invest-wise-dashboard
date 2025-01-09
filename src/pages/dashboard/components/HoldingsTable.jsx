import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import holdingsData from './holdings.json';

const HoldingsTable = () => {
  const [sortField, setSortField] = useState('value');
  const [sortDirection, setSortDirection] = useState('desc');

  const holdings = holdingsData;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedHoldings = [...holdings].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const getSortIcon = (field) => {
    if (sortField !== field) return 'ArrowUpDown';
    return sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Top Holdings</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="default" size="sm" iconName="Plus">
            Add Holding
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4">
                <button 
                  onClick={() => handleSort('symbol')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Symbol</span>
                  <Icon name={getSortIcon('symbol')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-foreground">Company</span>
              </th>
              <th className="text-right p-4">
                <button 
                  onClick={() => handleSort('quantity')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors ml-auto"
                >
                  <span>Quantity</span>
                  <Icon name={getSortIcon('quantity')} size={14} />
                </button>
              </th>
              <th className="text-right p-4">
                <button 
                  onClick={() => handleSort('price')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors ml-auto"
                >
                  <span>Price</span>
                  <Icon name={getSortIcon('price')} size={14} />
                </button>
              </th>
              <th className="text-right p-4">
                <button 
                  onClick={() => handleSort('value')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors ml-auto"
                >
                  <span>Market Value</span>
                  <Icon name={getSortIcon('value')} size={14} />
                </button>
              </th>
              <th className="text-right p-4">
                <button 
                  onClick={() => handleSort('change')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors ml-auto"
                >
                  <span>Day Change</span>
                  <Icon name={getSortIcon('change')} size={14} />
                </button>
              </th>
              <th className="text-center p-4">
                <span className="text-sm font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedHoldings.map((holding, index) => {
              const isPositive = holding.change >= 0;
              const changeColor = isPositive ? 'text-success' : 'text-error';
              
              return (
                <tr key={holding.symbol} className="border-b border-border hover:bg-muted/20 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {holding.symbol.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-foreground">{holding.symbol}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="text-sm font-medium text-foreground">{holding.name}</div>
                      <div className="text-xs text-muted-foreground">{holding.sector}</div>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-sm text-foreground font-data">
                      {holding.quantity.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-sm text-foreground font-data">
                      ₹{holding.price.toFixed(2)}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-sm font-medium text-foreground font-data">
                      ₹{holding.value.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className={`text-sm font-medium ${changeColor} font-data`}>
                        {isPositive ? '+' : ''}₹{holding.change.toFixed(2)}
                      </span>
                      <span className={`text-xs ${changeColor} font-data`}>
                        ({isPositive ? '+' : ''}{holding.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center space-x-1">
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <Icon name="Eye" size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <Icon name="Edit" size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-8 h-8 text-error hover:text-error">
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-between p-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing {sortedHoldings.length} of {holdings.length} holdings
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HoldingsTable;