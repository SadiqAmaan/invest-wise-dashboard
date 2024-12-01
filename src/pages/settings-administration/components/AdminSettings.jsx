import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import adminData from './adminData.json';
import adminOptions from './adminOptions.json';
import adminTabs from './adminTabs.json';

const AdminSettings = () => {
  const [selectedTab, setSelectedTab] = useState('users');
  const [isLoading, setIsLoading] = useState(false);
  const [newUserData, setNewUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'analyst',
    department: 'Investment Management'
  });

  const users = adminData.users;
  const auditLogs = adminData.auditLogs;
  const systemMetrics = adminData.systemMetrics;

  const roleOptions = [
    { value: 'admin', label: 'Administrator' },
    { value: 'portfolio_manager', label: 'Portfolio Manager' },
    { value: 'analyst', label: 'Senior Analyst' },
    { value: 'risk_manager', label: 'Risk Manager' },
    { value: 'compliance', label: 'Compliance Officer' },
    { value: 'client', label: 'Client' }
  ];

  const departmentOptions = [
    { value: 'Investment Management', label: 'Investment Management' },
    { value: 'Risk Management', label: 'Risk Management' },
    { value: 'Research', label: 'Research' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Compliance', label: 'Compliance' },
    { value: 'Client Relations', label: 'Client Relations' }
  ];

  const handleAddUser = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setNewUserData({
      firstName: '',
      lastName: '',
      email: '',
      role: 'analyst',
      department: 'Investment Management'
    });
  };

  const handleUserAction = (userId, action) => {
    console.log(`${action} user:`, userId);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'high': return 'bg-error/10';
      case 'warning': return 'bg-warning/10';
      case 'info': return 'bg-info/10';
      default: return 'bg-muted/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Administration Settings</h2>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <div className="flex space-x-1 mb-6 border-b">
          {adminTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                selectedTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {selectedTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">User Management</h3>
              <Button
                onClick={() => setIsLoading(true)}
                disabled={isLoading}
                className="flex items-center space-x-2"
              >
                <Icon name="Plus" size={16} />
                <span>Add User</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user) => (
                <div key={user.id} className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{user.name}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 'active' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
                  <p className="text-sm text-muted-foreground mb-4">{user.role}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, 'edit')}>
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, 'delete')}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'audit' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Audit Logs</h3>
            <div className="space-y-4">
              {auditLogs.map((log) => (
                <div key={log.id} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${getSeverityBg(log.severity)}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{log.action}</p>
                    <p className="text-sm text-muted-foreground">{log.user} - {log.timestamp}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(log.severity)} bg-current/10`}>
                    {log.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'system' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">System Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {systemMetrics.map((metric) => (
                <div key={metric.id} className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={metric.trend === 'up' ? 'TrendingUp' : metric.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                      size={16} 
                      className={metric.trend === 'up' ? 'text-success' : metric.trend === 'down' ? 'text-error' : 'text-muted-foreground'} 
                    />
                    <span className={`text-sm ${metric.trend === 'up' ? 'text-success' : metric.trend === 'down' ? 'text-error' : 'text-muted-foreground'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <h5 className="font-medium text-foreground mb-3">System Health</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Database Connection</span>
                  <span className="status-positive">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">API Services</span>
                  <span className="status-positive">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Background Jobs</span>
                  <span className="status-positive">Running</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Cache System</span>
                  <span className="status-positive">Optimal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Security Monitoring</span>
                  <span className="status-positive">Active</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
