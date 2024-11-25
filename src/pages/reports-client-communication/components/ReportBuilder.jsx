import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import { useToast } from '../../../components/ui/Toast';

const ReportBuilder = () => {
  const [reportConfig, setReportConfig] = useState({
    name: '',
    type: 'performance',
    portfolio: '',
    dateRange: '1M',
    frequency: 'monthly',
    sections: {
      summary: true,
      holdings: true,
      performance: true,
      allocation: true,
      transactions: false,
      benchmarking: true,
      riskMetrics: false,
      commentary: true
    },
    format: 'pdf',
    branding: true,
    confidential: false
  });

  const [isBuilding, setIsBuilding] = useState(false);
  const { toast } = useToast();

  const reportTypes = [
    { value: 'performance', label: 'Performance Report' },
    { value: 'holdings', label: 'Holdings Report' },
    { value: 'risk', label: 'Risk Analysis Report' },
    { value: 'compliance', label: 'Compliance Report' },
    { value: 'custom', label: 'Custom Report' }
  ];

  const portfolioOptions = [
    { value: '', label: 'All Portfolios' },
    { value: 'growth-a', label: 'Growth Portfolio A' },
    { value: 'conservative-b', label: 'Conservative Fund B' },
    { value: 'balanced-c', label: 'Balanced Strategy C' },
    { value: 'tech-d', label: 'Tech Innovation D' }
  ];

  const dateRangeOptions = [
    { value: '1W', label: 'Last Week' },
    { value: '1M', label: 'Last Month' },
    { value: '3M', label: 'Last 3 Months' },
    { value: '6M', label: 'Last 6 Months' },
    { value: '1Y', label: 'Last Year' },
    { value: 'YTD', label: 'Year to Date' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'annual', label: 'Annual' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'excel', label: 'Excel Workbook' },
    { value: 'powerpoint', label: 'PowerPoint Presentation' },
    { value: 'web', label: 'Web Dashboard' }
  ];

  const sections = [
    { key: 'summary', label: 'Executive Summary', description: 'High-level portfolio overview' },
    { key: 'holdings', label: 'Current Holdings', description: 'Detailed position breakdown' },
    { key: 'performance', label: 'Performance Analysis', description: 'Returns and performance metrics' },
    { key: 'allocation', label: 'Asset Allocation', description: 'Portfolio composition charts' },
    { key: 'transactions', label: 'Transaction History', description: 'Recent trading activity' },
    { key: 'benchmarking', label: 'Benchmark Comparison', description: 'Performance vs benchmarks' },
    { key: 'riskMetrics', label: 'Risk Metrics', description: 'VaR, volatility, and risk analysis' },
    { key: 'commentary', label: 'Market Commentary', description: 'Professional insights and outlook' }
  ];

  const handleSectionToggle = (sectionKey) => {
    setReportConfig(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: !prev.sections[sectionKey]
      }
    }));
  };

  const handleBuildReport = async () => {
    if (!reportConfig.name.trim()) {
      toast.error('Please enter a report name');
      return;
    }

    setIsBuilding(true);
    
    // Simulate report building
    setTimeout(() => {
      setIsBuilding(false);
      toast.success('Report generated successfully!', {
        title: 'Report Ready',
        duration: 4000,
        action: {
          label: 'Download',
          onClick: () => {
            // Simulate download
            toast.info('Downloading report...');
          }
        }
      });
    }, 3000);
  };

  const handleSaveTemplate = () => {
    toast.success('Report template saved successfully');
  };

  const getSelectedSectionsCount = () => {
    return Object.values(reportConfig.sections).filter(Boolean).length;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Building" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Report Builder</h3>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleSaveTemplate}>
            Save Template
          </Button>
          <Button variant="outline" size="sm">
            Load Template
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Basic Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Report Name *
            </label>
            <Input
              type="text"
              value={reportConfig.name}
              onChange={(e) => setReportConfig(prev => ({...prev, name: e.target.value}))}
              placeholder="Enter report name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Report Type
            </label>
            <Select
              value={reportConfig.type}
              onChange={(value) => setReportConfig(prev => ({...prev, type: value}))}
              options={reportTypes}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Portfolio
            </label>
            <Select
              value={reportConfig.portfolio}
              onChange={(value) => setReportConfig(prev => ({...prev, portfolio: value}))}
              options={portfolioOptions}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Date Range
            </label>
            <Select
              value={reportConfig.dateRange}
              onChange={(value) => setReportConfig(prev => ({...prev, dateRange: value}))}
              options={dateRangeOptions}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Frequency
            </label>
            <Select
              value={reportConfig.frequency}
              onChange={(value) => setReportConfig(prev => ({...prev, frequency: value}))}
              options={frequencyOptions}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Output Format
            </label>
            <Select
              value={reportConfig.format}
              onChange={(value) => setReportConfig(prev => ({...prev, format: value}))}
              options={formatOptions}
            />
          </div>
        </div>

        {/* Report Sections */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-foreground">Report Sections</h4>
            <span className="text-sm text-muted-foreground">
              {getSelectedSectionsCount()} of {sections.length} selected
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sections.map((section) => (
              <div
                key={section.key}
                className={`p-4 border rounded-lg transition-colors ${
                  reportConfig.sections[section.key] 
                    ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/30'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={reportConfig.sections[section.key]}
                    onChange={() => handleSectionToggle(section.key)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm text-foreground">
                      {section.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {section.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <div className="border-t border-border pt-6">
          <h4 className="text-lg font-medium text-foreground mb-4">Additional Options</h4>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={reportConfig.branding}
                onChange={(checked) => setReportConfig(prev => ({...prev, branding: checked}))}
              />
              <div>
                <div className="text-sm font-medium text-foreground">Include Company Branding</div>
                <div className="text-xs text-muted-foreground">Add company logo and branding elements</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                checked={reportConfig.confidential}
                onChange={(checked) => setReportConfig(prev => ({...prev, confidential: checked}))}
              />
              <div>
                <div className="text-sm font-medium text-foreground">Mark as Confidential</div>
                <div className="text-xs text-muted-foreground">Add confidentiality disclaimers and watermarks</div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview and Generate */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Report will include {getSelectedSectionsCount()} sections in {reportConfig.format.toUpperCase()} format
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" disabled={isBuilding}>
                Preview Report
              </Button>
              <Button 
                onClick={handleBuildReport}
                loading={isBuilding}
                loadingText="Building Report..."
                disabled={!reportConfig.name.trim()}
              >
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;