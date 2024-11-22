import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const HoldingsTable = ({ holdings, onAddPosition, onEditPosition, onDeletePositions, onImportCSV }) => {
  const [selectedHoldings, setSelectedHoldings] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedHoldings(holdings.map(h => h.id));
    } else {
      setSelectedHoldings([]);
    }
  };

  const handleSelectHolding = (holdingId, checked) => {
    if (checked) {
      setSelectedHoldings([...selectedHoldings, holdingId]);
    } else {
      setSelectedHoldings(selectedHoldings.filter(id => id !== holdingId));
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const sortedHoldings = React.useMemo(() => {
    let sortableHoldings = [...holdings];
    
    if (searchTerm) {
      sortableHoldings = sortableHoldings.filter(holding =>
        holding.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        holding.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig.key) {
      sortableHoldings.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Handle numeric values
        if (typeof aValue === 'string' && aValue.includes('₹')) {
          aValue = parseFloat(aValue.replace(/[₹,]/g, ''));
          bValue = parseFloat(bValue.replace(/[₹,]/g, ''));
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return sortableHoldings;
  }, [holdings, sortConfig, searchTerm]);

  const getChangeColor = (change) => {
    const value = parseFloat(change.replace(/[%₹,]/g, ''));
    return value >= 0 ? 'text-success' : 'text-error';
  };

  const getChangeIcon = (change) => {
    const value = parseFloat(change.replace(/[%₹,]/g, ''));
    return value >= 0 ? 'TrendingUp' : 'TrendingDown';
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImportCSV(file);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header Actions */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-foreground">Holdings</h3>
            <span className="text-sm text-muted-foreground">
              {holdings.length} positions
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Search holdings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48"
            />
            
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileUpload}
              className="hidden"
              id="csv-upload"
            />
            <Button
              variant="outline"
              size="sm"
              iconName="Upload"
              iconPosition="left"
              onClick={() => document.getElementById('csv-upload').click()}
            >
              Import
            </Button>

            <Button
              variant="default"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={onAddPosition}
            >
              Add Position
            </Button>
          </div>
        </div>

        {selectedHoldings.length > 0 && (
          <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">
                {selectedHoldings.length} position{selectedHoldings.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Edit"
                  iconPosition="left"
                >
                  Bulk Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={() => onDeletePositions(selectedHoldings)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full data-table">
          <thead className="bg-muted/30">
            <tr>
              <th className="data-cell w-12">
                <Checkbox
                  checked={selectedHoldings.length === holdings.length && holdings.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="data-cell text-left">
                <button
                  onClick={() => handleSort('symbol')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors"
                >
                  <span>Symbol</span>
                  <Icon name={getSortIcon('symbol')} size={14} />
                </button>
              </th>
              <th className="data-cell text-left">Name</th>
              <th className="data-cell text-right">
                <button
                  onClick={() => handleSort('shares')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors ml-auto"
                >
                  <span>Shares</span>
                  <Icon name={getSortIcon('shares')} size={14} />
                </button>
              </th>
              <th className="data-cell text-right">
                <button
                  onClick={() => handleSort('avgCost')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors ml-auto"
                >
                  <span>Avg Cost</span>
                  <Icon name={getSortIcon('avgCost')} size={14} />
                </button>
              </th>
              <th className="data-cell text-right">
                <button
                  onClick={() => handleSort('currentPrice')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors ml-auto"
                >
                  <span>Current Price</span>
                  <Icon name={getSortIcon('currentPrice')} size={14} />
                </button>
              </th>
              <th className="data-cell text-right">
                <button
                  onClick={() => handleSort('marketValue')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors ml-auto"
                >
                  <span>Market Value</span>
                  <Icon name={getSortIcon('marketValue')} size={14} />
                </button>
              </th>
              <th className="data-cell text-right">
                <button
                  onClick={() => handleSort('unrealizedGainLoss')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors ml-auto"
                >
                  <span>Unrealized P&L</span>
                  <Icon name={getSortIcon('unrealizedGainLoss')} size={14} />
                </button>
              </th>
              <th className="data-cell text-right">Day Change</th>
              <th className="data-cell text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedHoldings.map((holding) => (
              <tr key={holding.id} className="hover:bg-muted/20 transition-colors">
                <td className="data-cell">
                  <Checkbox
                    checked={selectedHoldings.includes(holding.id)}
                    onChange={(e) => handleSelectHolding(holding.id, e.target.checked)}
                  />
                </td>
                <td className="data-cell">
                  <div className="font-medium text-foreground">{holding.symbol}</div>
                  <div className="text-xs text-muted-foreground">{holding.sector}</div>
                </td>
                <td className="data-cell">
                  <div className="text-sm text-foreground max-w-48 truncate" title={holding.name}>
                    {holding.name}
                  </div>
                </td>
                <td className="data-cell text-right font-medium">
                  {holding.shares.toLocaleString()}
                </td>
                <td className="data-cell text-right">{holding.avgCost}</td>
                <td className="data-cell text-right">{holding.currentPrice}</td>
                <td className="data-cell text-right font-medium">{holding.marketValue}</td>
                <td className={`data-cell text-right font-medium ${getChangeColor(holding.unrealizedGainLoss)}`}>
                  <div className="flex items-center justify-end space-x-1">
                    <Icon name={getChangeIcon(holding.unrealizedGainLoss)} size={12} />
                    <span>{holding.unrealizedGainLoss}</span>
                  </div>
                  <div className="text-xs">
                    {holding.unrealizedGainLossPercent}
                  </div>
                </td>
                <td className={`data-cell text-right ${getChangeColor(holding.dayChange)}`}>
                  <div className="flex items-center justify-end space-x-1">
                    <Icon name={getChangeIcon(holding.dayChange)} size={12} />
                    <span>{holding.dayChange}</span>
                  </div>
                  <div className="text-xs">
                    {holding.dayChangePercent}
                  </div>
                </td>
                <td className="data-cell text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditPosition(holding)}
                      className="h-8 w-8"
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeletePositions([holding.id])}
                      className="h-8 w-8 text-error hover:text-error"
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sortedHoldings.length === 0 && (
          <div className="p-8 text-center">
            <Icon name="Search" size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              {searchTerm ? 'No holdings match your search' : 'No holdings found'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HoldingsTable;