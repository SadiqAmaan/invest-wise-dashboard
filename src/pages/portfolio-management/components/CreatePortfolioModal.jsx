import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import portfolioOptions from './portfolioOptions.json';
import managerOptions from './managerOptions.json';

const CreatePortfolioModal = ({ isOpen, onClose, onCreatePortfolio }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    manager: '',
    benchmark: '',
    riskTolerance: '',
    initialCash: ''
  });

  const [errors, setErrors] = useState({});

  const { portfolioTypes, benchmarkOptions, riskToleranceOptions } = portfolioOptions;

  const managerOptions = [
    { value: 'john_doe', label: 'John Doe' },
    { value: 'sarah_wilson', label: 'Sarah Wilson' },
    { value: 'michael_chen', label: 'Michael Chen' },
    { value: 'emily_davis', label: 'Emily Davis' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Portfolio name is required';
    }

    if (!formData.type) {
      newErrors.type = 'Portfolio type is required';
    }

    if (!formData.manager) {
      newErrors.manager = 'Portfolio manager is required';
    }

    if (!formData.benchmark) {
      newErrors.benchmark = 'Benchmark is required';
    }

    if (!formData.riskTolerance) {
      newErrors.riskTolerance = 'Risk tolerance is required';
    }

    if (!formData.initialCash.trim()) {
      newErrors.initialCash = 'Initial cash amount is required';
    } else if (isNaN(parseFloat(formData.initialCash.replace(/[,$]/g, '')))) {
      newErrors.initialCash = 'Please enter a valid amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const portfolioData = {
        ...formData,
        id: Date.now(),
        createdDate: new Date().toLocaleDateString(),
        status: 'Active',
        totalValue: formData.initialCash,
        holdings: 0,
        performance: '+0.00%',
        dayChange: '+0.00%'
      };
      
      onCreatePortfolio(portfolioData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      type: '',
      manager: '',
      benchmark: '',
      riskTolerance: '',
      initialCash: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1020 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-black" >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Create New Portfolio</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Set up a new investment portfolio with initial configuration
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
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
            
            <Input
              label="Portfolio Name"
              type="text"
              placeholder="Enter portfolio name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={errors.name}
              required
            />

            <Input
              label="Description"
              type="text"
              placeholder="Brief description of the portfolio strategy"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Portfolio Type"
                placeholder="Select portfolio type"
                options={portfolioTypes}
                value={formData.type}
                onChange={(value) => handleInputChange('type', value)}
                error={errors.type}
                required
              />

              <Select
                label="Portfolio Manager"
                placeholder="Select manager"
                options={managerOptions}
                value={formData.manager}
                onChange={(value) => handleInputChange('manager', value)}
                error={errors.manager}
                required
              />
            </div>
          </div>

          {/* Investment Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Investment Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Benchmark"
                placeholder="Select benchmark"
                options={benchmarkOptions}
                value={formData.benchmark}
                onChange={(value) => handleInputChange('benchmark', value)}
                error={errors.benchmark}
                required
              />

              <Select
                label="Risk Tolerance"
                placeholder="Select risk level"
                options={riskToleranceOptions}
                value={formData.riskTolerance}
                onChange={(value) => handleInputChange('riskTolerance', value)}
                error={errors.riskTolerance}
                required
              />
            </div>

            <Input
              label="Initial Cash Amount"
              type="text"
              placeholder="$1,000,000"
              value={formData.initialCash}
              onChange={(e) => handleInputChange('initialCash', e.target.value)}
              error={errors.initialCash}
              description="Starting cash amount for the portfolio"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
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
              iconName="Plus"
              iconPosition="left"
            >
              Create Portfolio
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePortfolioModal;