import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  
  const routeMap = {
    '/dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/portfolio-management': { label: 'Portfolio Management', icon: 'Briefcase' },
    '/analytics-performance': { label: 'Analytics & Performance', icon: 'TrendingUp' },
    '/reports-client-communication': { label: 'Reports & Client Communication', icon: 'FileText' },
    '/settings-administration': { label: 'Settings & Administration', icon: 'Settings' }
  };

  const currentRoute = routeMap[location.pathname];
  
  if (location.pathname === '/login' || !currentRoute) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      <Link 
        to="/dashboard" 
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Icon name="Home" size={14} className="mr-1" />
        Home
      </Link>
      
      <Icon name="ChevronRight" size={14} />
      
      <div className="flex items-center text-foreground font-medium">
        <Icon name={currentRoute.icon} size={14} className="mr-1" />
        {currentRoute.label}
      </div>
    </nav>
  );
};

export default Breadcrumb;