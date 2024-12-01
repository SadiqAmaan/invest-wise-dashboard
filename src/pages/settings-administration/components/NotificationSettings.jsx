import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import notificationOptions from './notificationOptions.json';

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    portfolioAlerts: true,
    performanceReports: true,
    riskAlerts: true,
    marketUpdates: false,
    systemMaintenance: true,
    securityAlerts: true
  });

  const [smsNotifications, setSmsNotifications] = useState({
    criticalAlerts: true,
    portfolioThresholds: false,
    systemDowntime: true
  });

  const [inAppNotifications, setInAppNotifications] = useState({
    realTimeUpdates: true,
    taskReminders: true,
    collaborationUpdates: true,
    newsAlerts: false
  });

  const [alertThresholds, setAlertThresholds] = useState({
    portfolioLoss: '5',
    volatilitySpike: '15',
    drawdownLimit: '10',
    concentrationRisk: '20'
  });

  const [notificationSchedule, setNotificationSchedule] = useState({
    dailyDigest: '08:00',
    weeklyReport: 'monday',
    monthlyReport: '1',
    timezone: 'America/New_York'
  });

  const [isSaving, setIsSaving] = useState(false);

  const weekdayOptions = notificationOptions.weekdayOptions;

  const monthlyOptions = Array.from({ length: 28 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1}${i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'} of the month`
  }));

  const timezoneOptions = notificationOptions.timezoneOptions;

  const handleEmailNotificationChange = (key, value) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSmsNotificationChange = (key, value) => {
    setSmsNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleInAppNotificationChange = (key, value) => {
    setInAppNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleThresholdChange = (key, value) => {
    setAlertThresholds(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleScheduleChange = (key, value) => {
    setNotificationSchedule(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  const testNotification = (type) => {
    // Handle test notification
    console.log(`Testing ${type} notification`);
  };

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-foreground">Email Notifications</h3>
          <Button
            variant="outline"
            size="sm"
            iconName="Mail"
            iconPosition="left"
            onClick={() => testNotification('email')}
          >
            Test Email
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Portfolio Alerts</p>
              <p className="text-sm text-muted-foreground">Notifications for portfolio performance and risk changes</p>
            </div>
            <Checkbox
              checked={emailNotifications.portfolioAlerts}
              onChange={(e) => handleEmailNotificationChange('portfolioAlerts', e.target.checked)}
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Performance Reports</p>
              <p className="text-sm text-muted-foreground">Daily, weekly, and monthly performance summaries</p>
            </div>
            <Checkbox
              checked={emailNotifications.performanceReports}
              onChange={(e) => handleEmailNotificationChange('performanceReports', e.target.checked)}
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Risk Alerts</p>
              <p className="text-sm text-muted-foreground">Notifications when risk thresholds are exceeded</p>
            </div>
            <Checkbox
              checked={emailNotifications.riskAlerts}
              onChange={(e) => handleEmailNotificationChange('riskAlerts', e.target.checked)}
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Market Updates</p>
              <p className="text-sm text-muted-foreground">Market news and economic indicators</p>
            </div>
            <Checkbox
              checked={emailNotifications.marketUpdates}
              onChange={(e) => handleEmailNotificationChange('marketUpdates', e.target.checked)}
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium text-foreground">System Maintenance</p>
              <p className="text-sm text-muted-foreground">Scheduled maintenance and system updates</p>
            </div>
            <Checkbox
              checked={emailNotifications.systemMaintenance}
              onChange={(e) => handleEmailNotificationChange('systemMaintenance', e.target.checked)}
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Security Alerts</p>
              <p className="text-sm text-muted-foreground">Login attempts and security-related notifications</p>
            </div>
            <Checkbox
              checked={emailNotifications.securityAlerts}
              onChange={(e) => handleEmailNotificationChange('securityAlerts', e.target.checked)}
            />
          </div>
        </div>
      </div>

      {/* SMS Notifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-foreground">SMS Notifications</h3>
          <Button
            variant="outline"
            size="sm"
            iconName="MessageSquare"
            iconPosition="left"
            onClick={() => testNotification('sms')}
          >
            Test SMS
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Critical Alerts</p>
              <p className="text-sm text-muted-foreground">High-priority alerts requiring immediate attention</p>
            </div>
            <Checkbox
              checked={smsNotifications.criticalAlerts}
              onChange={(e) => handleSmsNotificationChange('criticalAlerts', e.target.checked)}
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Portfolio Thresholds</p>
              <p className="text-sm text-muted-foreground">When portfolio metrics exceed defined limits</p>
            </div>
            <Checkbox
              checked={smsNotifications.portfolioThresholds}
              onChange={(e) => handleSmsNotificationChange('portfolioThresholds', e.target.checked)}
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium text-foreground">System Downtime</p>
              <p className="text-sm text-muted-foreground">Notifications about system outages</p>
            </div>
            <Checkbox
              checked={smsNotifications.systemDowntime}
              onChange={(e) => handleSmsNotificationChange('systemDowntime', e.target.checked)}
            />
          </div>
        </div>
      </div>

      {/* In-App Notifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">In-App Notifications</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Real-time Updates</p>
              <p className="text-sm text-muted-foreground">Live portfolio value and market data updates</p>
            </div>
            <Checkbox
              checked={inAppNotifications.realTimeUpdates}
              onChange={(e) => handleInAppNotificationChange('realTimeUpdates', e.target.checked)}
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Task Reminders</p>
              <p className="text-sm text-muted-foreground">Reminders for pending tasks and reviews</p>
            </div>
            <Checkbox
              checked={inAppNotifications.taskReminders}
              onChange={(e) => handleInAppNotificationChange('taskReminders', e.target.checked)}
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium text-foreground">Collaboration Updates</p>
              <p className="text-sm text-muted-foreground">Team comments and shared portfolio changes</p>
            </div>
            <Checkbox
              checked={inAppNotifications.collaborationUpdates}
              onChange={(e) => handleInAppNotificationChange('collaborationUpdates', e.target.checked)}
            />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div>
              <p className="font-medium text-foreground">News Alerts</p>
              <p className="text-sm text-muted-foreground">Breaking news affecting your portfolios</p>
            </div>
            <Checkbox
              checked={inAppNotifications.newsAlerts}
              onChange={(e) => handleInAppNotificationChange('newsAlerts', e.target.checked)}
            />
          </div>
        </div>
      </div>

      {/* Alert Thresholds */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Alert Thresholds</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Portfolio Loss Threshold"
            type="number"
            value={alertThresholds.portfolioLoss}
            onChange={(e) => handleThresholdChange('portfolioLoss', e.target.value)}
            description="Alert when portfolio loses more than this percentage"
            placeholder="5"
          />
          
          <Input
            label="Volatility Spike Threshold"
            type="number"
            value={alertThresholds.volatilitySpike}
            onChange={(e) => handleThresholdChange('volatilitySpike', e.target.value)}
            description="Alert when volatility exceeds this percentage"
            placeholder="15"
          />
          
          <Input
            label="Maximum Drawdown Limit"
            type="number"
            value={alertThresholds.drawdownLimit}
            onChange={(e) => handleThresholdChange('drawdownLimit', e.target.value)}
            description="Alert when drawdown exceeds this percentage"
            placeholder="10"
          />
          
          <Input
            label="Concentration Risk Threshold"
            type="number"
            value={alertThresholds.concentrationRisk}
            onChange={(e) => handleThresholdChange('concentrationRisk', e.target.value)}
            description="Alert when single position exceeds this percentage"
            placeholder="20"
          />
        </div>
      </div>

      {/* Notification Schedule */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Notification Schedule</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Daily Digest Time"
            type="time"
            value={notificationSchedule.dailyDigest}
            onChange={(e) => handleScheduleChange('dailyDigest', e.target.value)}
            description="Time to receive daily portfolio summary"
          />
          
          <Select
            label="Weekly Report Day"
            options={weekdayOptions}
            value={notificationSchedule.weeklyReport}
            onChange={(value) => handleScheduleChange('weeklyReport', value)}
            description="Day of the week for weekly reports"
          />
          
          <Select
            label="Monthly Report Date"
            options={monthlyOptions}
            value={notificationSchedule.monthlyReport}
            onChange={(value) => handleScheduleChange('monthlyReport', value)}
            description="Date of the month for monthly reports"
          />
          
          <Select
            label="Timezone"
            options={timezoneOptions}
            value={notificationSchedule.timezone}
            onChange={(value) => handleScheduleChange('timezone', value)}
            description="Timezone for all scheduled notifications"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
          onClick={handleSaveSettings}
        >
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;