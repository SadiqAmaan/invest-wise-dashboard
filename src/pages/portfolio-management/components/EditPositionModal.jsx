import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import sectorOptions from './sectorOptions.json';

const EditPositionModal = ({ isOpen, onClose, onSavePosition, position }) => {
  const [formData, setFormData] = useState({
    symbol: '',
    name: '',
    shares: '',
    avgCost: '',
    sector: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (position) {
      setFormData({
        symbol: position.symbol || '',
        name: position.name || '',
        shares: position.shares?.toString() || '',
        avgCost: position.avgCost?.replace('$', '') || '',
        sector: position.sector?.toLowerCase().replace(' ', '_') || '',
        notes: position.notes || ''
      });
    } else {
      setFormData({
        symbol: '',
        name: '',
        shares: '',
        avgCost: '',
        sector: '',
        notes: ''
      });
    }
    setErrors({});
  }, [position, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.symbol.trim()) {
      newErrors.symbol = 'Symbol is required';
    } else if (!/^[A-Z]{1,5}$/.test(formData.symbol.toUpperCase())) {
      newErrors.symbol = 'Please enter a valid stock symbol';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required';
    }

    if (!formData.shares.trim()) {
      newErrors.shares = 'Number of shares is required';
    } else if (isNaN(parseInt(formData.shares)) || parseInt(formData.shares) <= 0) {
      newErrors.shares = 'Please enter a valid number of shares';
    }

    if (!formData.avgCost.trim()) {
      newErrors.avgCost = 'Average cost is required';
    } else if (isNaN(parseFloat(formData.avgCost)) || parseFloat(formData.avgCost) <= 0) {
      newErrors.avgCost = 'Please enter a valid cost';
    }

    if (!formData.sector) {
      newErrors.sector = 'Sector is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const positionData = {
        ...position,
        symbol: formData.symbol.toUpperCase(),
        name: formData.name,
        shares: parseInt(formData.shares),
        avgCost: `₹${parseFloat(formData.avgCost).toFixed(2)}`,
        sector: sectorOptions.find(s => s.value === formData.sector)?.label || formData.sector,
        notes: formData.notes,
        // Calculate market value (mock current price)
        currentPrice: `₹${(parseFloat(formData.avgCost) * (0.95 + Math.random() * 0.1)).toFixed(2)}`,
        marketValue: `₹${(parseInt(formData.shares) * parseFloat(formData.avgCost) * (0.95 + Math.random() * 0.1)).toFixed(2)}`,
        lastUpdated: new Date().toLocaleString()
      };
      
      onSavePosition(positionData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      symbol: '',
      name: '',
      shares: '',
      avgCost: '',
      sector: '',
      notes: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1020 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white text-black shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {position ? 'Edit Position' : 'Add New Position'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {position ? 'Update position details' : 'Add a new position to the portfolio'}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Symbol"
              type="text"
              placeholder="AAPL"
              value={formData.symbol}
              onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
              error={errors.symbol}
              required
            />

            <Select
              label="Sector"
              placeholder="Select sector"
              options={sectorOptions}
              value={formData.sector}
              onChange={(value) => handleInputChange('sector', value)}
              error={errors.sector}
              required
            />
          </div>

          <Input
            label="Company Name"
            type="text"
            placeholder="Apple Inc."
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={errors.name}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Number of Shares"
              type="number"
              placeholder="100"
              value={formData.shares}
              onChange={(e) => handleInputChange('shares', e.target.value)}
              error={errors.shares}
              required
            />

            <Input
              label="Average Cost per Share"
              type="number"
              placeholder="150.00"
              value={formData.avgCost}
              onChange={(e) => handleInputChange('avgCost', e.target.value)}
              error={errors.avgCost}
              description="Cost per share in USD"
              required
            />
          </div>

          <Input
            label="Notes"
            type="text"
            placeholder="Optional notes about this position"
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
          />

          {/* Calculated Values Preview */}
          {formData.shares && formData.avgCost && !isNaN(formData.shares) && !isNaN(formData.avgCost) && (
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="text-sm font-medium text-foreground mb-2">Position Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Total Cost Basis:</span>
                  <span className="font-medium text-foreground ml-2">
                    ₹{(parseInt(formData.shares) * parseFloat(formData.avgCost)).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Position Size:</span>
                  <span className="font-medium text-foreground ml-2">
                    {parseInt(formData.shares).toLocaleString()} shares
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              iconName={position ? "Save" : "Plus"}
              iconPosition="left"
            >
              {position ? 'Update Position' : 'Add Position'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPositionModal;