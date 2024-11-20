import React from 'react';
import Icon from '../../../components/AppIcon';
import trustBadges from './trustBadges.json';
import securityFeatures from './securityFeatures.json';

const TrustSignals = () => {
  return (
    <div className="space-y-8">
      {/* Trust Badges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {trustBadges.map((badge) => (
          <div
            key={badge.id}
            className="bg-card/50 border border-border/50 rounded-lg p-4 text-center hover:bg-card/70 transition-colors"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name={badge.icon} size={20} className="text-primary" />
            </div>
            <h3 className="text-sm font-medium text-foreground mb-1">{badge.name}</h3>
            <p className="text-xs text-muted-foreground">{badge.description}</p>
          </div>
        ))}
      </div>

      {/* Security Features */}
      <div className="bg-card/30 border border-border/50 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Shield" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Enterprise Security</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Information */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <Icon name="Globe" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Global Coverage</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">24/7 Monitoring</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Trusted by 500+ Institutions</span>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
          Invest Wise meets the highest standards of financial data security and regulatory compliance. 
          Your portfolio data is protected with institutional-grade encryption and access controls.
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;
