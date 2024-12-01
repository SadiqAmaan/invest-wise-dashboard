import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import securityData from './securityData.json';

const SecuritySettings = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showApiKeys, setShowApiKeys] = useState(false);

  const sessions = securityData.sessions;
  const apiKeys = securityData.apiKeys;

  const handlePasswordChange = async () => {
    setIsChangingPassword(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleSessionTerminate = (sessionId) => {
    // Handle session termination
    console.log('Terminating session:', sessionId);
  };

  const handleApiKeyRevoke = (keyId) => {
    // Handle API key revocation
    console.log('Revoking API key:', keyId);
  };

  const generateNewApiKey = () => {
    // Handle new API key generation
    console.log('Generating new API key');
  };

  return (
    <div className="space-y-6">
      {/* Password Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Password Settings</h3>
        
        <div className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData(prev => ({
              ...prev,
              currentPassword: e.target.value
            }))}
            placeholder="Enter current password"
          />
          
          <Input
            label="New Password"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData(prev => ({
              ...prev,
              newPassword: e.target.value
            }))}
            placeholder="Enter new password"
            description="Must be at least 8 characters with uppercase, lowercase, and numbers"
          />
          
          <Input
            label="Confirm New Password"
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData(prev => ({
              ...prev,
              confirmPassword: e.target.value
            }))}
            placeholder="Confirm new password"
          />
          
          <Button
            variant="default"
            loading={isChangingPassword}
            iconName="Lock"
            iconPosition="left"
            onClick={handlePasswordChange}
            disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
          >
            Change Password
          </Button>
        </div>
      </div>

      {/* Multi-Factor Authentication */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Multi-Factor Authentication</h3>
        
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${mfaEnabled ? 'bg-success/10' : 'bg-warning/10'}`}>
              <Icon name={mfaEnabled ? "Shield" : "ShieldAlert"} size={20} className={mfaEnabled ? 'text-success' : 'text-warning'} />
            </div>
            <div>
              <p className="font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">
                {mfaEnabled ? 'Enabled via Authenticator App' : 'Disabled - Your account is less secure'}
              </p>
            </div>
          </div>
          
          <Button
            variant={mfaEnabled ? "outline" : "default"}
            onClick={() => setMfaEnabled(!mfaEnabled)}
          >
            {mfaEnabled ? 'Disable' : 'Enable'}
          </Button>
        </div>
        
        {mfaEnabled && (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Smartphone" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">Authenticator App</span>
              </div>
              <span className="status-positive">Active</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">Email Backup</span>
              </div>
              <Button variant="ghost" size="sm">Configure</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Key" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">Recovery Codes</span>
              </div>
              <Button variant="ghost" size="sm">View</Button>
            </div>
          </div>
        )}
      </div>

      {/* Session Management */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-foreground">Active Sessions</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-foreground">Auto-logout after:</label>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="px-2 py-1 border border-border rounded text-sm bg-background text-foreground"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="480">8 hours</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={session.device.includes('iPhone') ? 'Smartphone' : 'Monitor'} size={20} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-foreground">{session.device}</p>
                    {session.current && (
                      <span className="status-positive">Current</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{session.browser} • {session.location}</p>
                  <p className="text-xs text-muted-foreground">{session.ipAddress} • Last active {session.lastActive}</p>
                </div>
              </div>
              
              {!session.current && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSessionTerminate(session.id)}
                >
                  Terminate
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-foreground">API Keys</h3>
          <Button
            variant="outline"
            iconName="Plus"
            iconPosition="left"
            onClick={generateNewApiKey}
          >
            Generate New Key
          </Button>
        </div>
        
        <div className="space-y-3">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${apiKey.status === 'active' ? 'bg-success/10' : 'bg-muted'}`}>
                  <Icon name="Key" size={20} className={apiKey.status === 'active' ? 'text-success' : 'text-muted-foreground'} />
                </div>
                <div>
                  <p className="font-medium text-foreground">{apiKey.name}</p>
                  <p className="text-sm text-muted-foreground font-mono">{showApiKeys ? apiKey.key : apiKey.key}</p>
                  <p className="text-xs text-muted-foreground">
                    Created {apiKey.created} • Last used {apiKey.lastUsed}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={apiKey.status === 'active' ? 'status-positive' : 'status-neutral'}>
                  {apiKey.status}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleApiKeyRevoke(apiKey.id)}
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Checkbox
            label="Show API keys in plain text"
            checked={showApiKeys}
            onChange={(e) => setShowApiKeys(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;