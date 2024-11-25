import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ReportTemplateCard = ({ template, onSelect, onPreview, onCustomize }) => {
  const getTemplateIcon = (type) => {
    switch (type) {
      case 'performance': return 'TrendingUp';
      case 'risk': return 'Shield';
      case 'compliance': return 'FileCheck';
      case 'summary': return 'BarChart3';
      case 'detailed': return 'FileText';
      default: return 'FileText';
    }
  };

  const getTemplateColor = (type) => {
    switch (type) {
      case 'performance': return 'text-success';
      case 'risk': return 'text-warning';
      case 'compliance': return 'text-primary';
      case 'summary': return 'text-accent';
      case 'detailed': return 'text-secondary';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-all duration-200 group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${getTemplateColor(template.type)}`}>
            <Icon name={getTemplateIcon(template.type)} size={20} />
          </div>
          <div>
            <h3 className="font-medium text-foreground">{template.name}</h3>
            <p className="text-sm text-muted-foreground">{template.category}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {template.isPopular && (
            <span className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full font-medium">
              Popular
            </span>
          )}
          {template.isNew && (
            <span className="bg-success/10 text-success text-xs px-2 py-1 rounded-full font-medium">
              New
            </span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full h-32 bg-muted rounded-lg overflow-hidden">
          <Image
            src={template.thumbnail}
            alt={`${template.name} template preview`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {template.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>{template.generationTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Download" size={12} />
            <span>{template.downloads}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Icon
              key={i}
              name="Star"
              size={12}
              className={i < template.rating ? 'text-warning fill-current' : 'text-muted-foreground'}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({template.reviews})</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPreview(template)}
          className="flex-1"
          iconName="Eye"
          iconPosition="left"
        >
          Preview
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onCustomize(template)}
          iconName="Settings"
          iconPosition="left"
        >
          Customize
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => onSelect(template)}
          iconName="Plus"
          iconPosition="left"
        >
          Use
        </Button>
      </div>

      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: {template.lastUpdated}</span>
          <span>Version {template.version}</span>
        </div>
      </div>
    </div>
  );
};

export default ReportTemplateCard;