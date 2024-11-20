import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import supportOptions from './supportOptions.json';
import faqItems from './faqItems.json';

const SupportInfo = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Help Toggle Button */}
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => setIsHelpOpen(!isHelpOpen)}
          iconName={isHelpOpen ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          className="text-primary hover:text-primary/80"
        >
          Need Help?
        </Button>
      </div>

      {/* Expandable Help Content */}
      {isHelpOpen && (
        <div className="bg-card/30 border border-border/50 rounded-lg p-6 space-y-6">
          {/* Support Options */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="HelpCircle" size={20} className="mr-2 text-primary" />
              Contact Support
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {supportOptions.map((option) => (
                <div
                  key={option.id}
                  className="bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-shadow"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name={option.icon} size={16} className="text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground">{option.title}</h4>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Icon name="Mail" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{option.contact}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Phone" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{option.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{option.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="MessageCircle" size={20} className="mr-2 text-primary" />
              Frequently Asked Questions
            </h3>
            
            <div className="space-y-3">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-4"
                >
                  <h4 className="font-medium text-foreground mb-2">{item.question}</h4>
                  <p className="text-sm text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <h4 className="font-medium text-foreground">Emergency Access</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              For urgent access issues outside business hours, contact our emergency support line.
            </p>
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={14} className="text-warning" />
              <span className="text-sm font-medium text-foreground">+1 (555) 911-HELP</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportInfo;