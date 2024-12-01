import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SettingsNavigation from './components/SettingsNavigation';
import ProfileSettings from './components/ProfileSettings';
import SecuritySettings from './components/SecuritySettings';
import NotificationSettings from './components/NotificationSettings';
import PreferencesSettings from './components/PreferencesSettings';
import AdminSettings from './components/AdminSettings';

const SettingsAdministration = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'preferences':
        return <PreferencesSettings />;
      case 'admin':
        return <AdminSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  const getSectionTitle = () => {
    const titles = {
      profile: 'Profile Settings',
      security: 'Security Settings',
      notifications: 'Notification Settings',
      preferences: 'User Preferences',
      admin: 'Administration'
    };
    return titles[activeSection] || 'Settings';
  };

  const getSectionDescription = () => {
    const descriptions = {
      profile: 'Manage your personal information, contact details, and professional credentials.',
      security: 'Configure password, multi-factor authentication, and session management settings.',
      notifications: 'Customize email, SMS, and in-app notification preferences with alert thresholds.',
      preferences: 'Set dashboard layout, chart preferences, currency display, and timezone options.',
      admin: 'Manage users, permissions, audit logs, and monitor system performance.'
    };
    return descriptions[activeSection] || 'Configure your settings and preferences.';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="pt-16">
        <div className="container-dashboard py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Settings & Administration
            </h1>
            <p className="text-muted-foreground">
              Configure your account settings, preferences, and administrative options for the portfolio management platform.
            </p>
          </div>

          {/* Settings Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h2 className="text-lg font-medium text-foreground mb-4">Settings</h2>
                <SettingsNavigation
                  activeSection={activeSection}
                  onSectionChange={setActiveSection}
                />
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {/* Section Header */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    {getSectionTitle()}
                  </h2>
                  <p className="text-muted-foreground">
                    {getSectionDescription()}
                  </p>
                </div>

                {/* Active Section Content */}
                {renderActiveSection()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsAdministration;