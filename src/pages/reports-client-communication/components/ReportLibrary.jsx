import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import typeOptionsData from './reportTypeOptions.json';
import sortOptionsData from './reportSortOptions.json';

const ReportLibrary = ({ reports, onDownload, onDelete, onDuplicate, onShare }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  const typeOptions = typeOptionsData;

  const sortOptions = sortOptionsData;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'processing': return 'text-warning bg-warning/10';
      case 'failed': return 'text-error bg-error/10';
      case 'scheduled': return 'text-primary bg-primary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'performance': return 'TrendingUp';
      case 'risk': return 'Shield';
      case 'compliance': return 'FileCheck';
      case 'summary': return 'BarChart3';
      default: return 'FileText';
    }
  };

  const filteredReports = reports
    .filter(report => {
      const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           report.portfolio.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || report.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date-desc': return new Date(b.createdAt) - new Date(a.createdAt);
        case 'date-asc': return new Date(a.createdAt) - new Date(b.createdAt);
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'size-desc': return b.size - a.size;
        default: return 0;
      }
    });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select
          options={typeOptions}
          value={filterType}
          onChange={setFilterType}
          className="w-48"
        />
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
          className="w-48"
        />
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={getTypeIcon(report.type)} size={20} className="text-muted-foreground" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-foreground truncate">{report.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center space-x-1">
                      <Icon name="Briefcase" size={12} />
                      <span>{report.portfolio}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>{report.createdAt}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="HardDrive" size={12} />
                      <span>{formatFileSize(report.size)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Download" size={12} />
                      <span>{report.downloads} downloads</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {report.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDownload(report)}
                  className="w-8 h-8"
                  title="Download"
                >
                  <Icon name="Download" size={14} />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onShare(report)}
                  className="w-8 h-8"
                  title="Share"
                >
                  <Icon name="Share2" size={14} />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDuplicate(report)}
                  className="w-8 h-8"
                  title="Duplicate"
                >
                  <Icon name="Copy" size={14} />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(report)}
                  className="w-8 h-8 text-error hover:text-error"
                  title="Delete"
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            </div>
            
            {/* Version History */}
            {report.versions && report.versions.length > 1 && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Version {report.version} • {report.versions.length} versions available
                  </span>
                  <Button variant="ghost" size="sm" className="text-xs">
                    View History
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No reports found</h3>
          <p className="text-muted-foreground">
            {searchTerm || filterType !== 'all' ?'Try adjusting your search or filters' :'Generate your first report to get started'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ReportLibrary;