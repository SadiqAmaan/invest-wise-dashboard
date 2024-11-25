import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import templateOptionsData from './emailTemplateOptions.json';
import reportTypeOptionsData from './reportTypeOptions.json';
import emailTemplatesData from './emailTemplates.json';

const EmailComposer = ({ isOpen, onClose, onSend }) => {
  const [emailData, setEmailData] = useState({
    recipients: [],
    subject: '',
    template: 'performance-update',
    personalMessage: '',
    includeReport: true,
    reportType: 'monthly-summary',
    scheduleSend: false,
    sendDate: '',
    sendTime: ''
  });

  const [recipientInput, setRecipientInput] = useState('');

  const templateOptions = templateOptionsData;

  const reportTypeOptions = reportTypeOptionsData;

  const emailTemplates = emailTemplatesData;

  const handleInputChange = (field, value) => {
    setEmailData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addRecipient = () => {
    if (recipientInput.trim() && !emailData.recipients.includes(recipientInput.trim())) {
      setEmailData(prev => ({
        ...prev,
        recipients: [...prev.recipients, recipientInput.trim()]
      }));
      setRecipientInput('');
    }
  };

  const removeRecipient = (email) => {
    setEmailData(prev => ({
      ...prev,
      recipients: prev.recipients.filter(r => r !== email)
    }));
  };

  const handleSend = () => {
    onSend(emailData);
    onClose();
  };

  const getTemplateContent = () => {
    return emailTemplates[emailData.template]?.content || '';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-black flex-col">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white text-black flex flex-colbg-card flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Compose Email</h2>
            <p className="text-sm text-muted-foreground">Send updates to your clients</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            {/* Recipients */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Recipients</label>
              <div className="flex space-x-2 mb-3">
                <Input
                  value={recipientInput}
                  onChange={(e) => setRecipientInput(e.target.value)}
                  placeholder="Enter email address"
                  onKeyPress={(e) => e.key === 'Enter' && addRecipient()}
                  className="flex-1"
                />
                <Button variant="outline" onClick={addRecipient} iconName="Plus">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {emailData.recipients.map((email, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    <span>{email}</span>
                    <button
                      onClick={() => removeRecipient(email)}
                      className="hover:text-error transition-colors"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Template Selection */}
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Email Template"
                options={templateOptions}
                value={emailData.template}
                onChange={(value) => handleInputChange('template', value)}
              />
              
              <Input
                label="Subject Line"
                value={emailData.subject || emailTemplates[emailData.template]?.subject || ''}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder="Enter subject line"
              />
            </div>

            {/* Report Attachment */}
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <input
                  type="checkbox"
                  id="includeReport"
                  checked={emailData.includeReport}
                  onChange={(e) => handleInputChange('includeReport', e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <label htmlFor="includeReport" className="font-medium text-foreground">
                  Include Report Attachment
                </label>
              </div>
              
              {emailData.includeReport && (
                <Select
                  label="Report Type"
                  options={reportTypeOptions}
                  value={emailData.reportType}
                  onChange={(value) => handleInputChange('reportType', value)}
                />
              )}
            </div>

            {/* Email Content */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Content</label>
              <div className="border border-border rounded-lg">
                <div className="bg-muted/30 px-4 py-2 border-b border-border">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Info" size={14} />
                    <span>Template preview - variables will be replaced with actual values</span>
                  </div>
                </div>
                <textarea
                  value={getTemplateContent()}
                  readOnly
                  className="w-full h-64 p-4 bg-transparent resize-none focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Personal Message */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Personal Message</label>
              <textarea
                value={emailData.personalMessage}
                onChange={(e) => handleInputChange('personalMessage', e.target.value)}
                placeholder="Add a personal message that will be inserted into the template..."
                className="w-full h-24 px-3 py-2 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Schedule Send */}
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <input
                  type="checkbox"
                  id="scheduleSend"
                  checked={emailData.scheduleSend}
                  onChange={(e) => handleInputChange('scheduleSend', e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <label htmlFor="scheduleSend" className="font-medium text-foreground">
                  Schedule Send
                </label>
              </div>
              
              {emailData.scheduleSend && (
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Send Date"
                    type="date"
                    value={emailData.sendDate}
                    onChange={(e) => handleInputChange('sendDate', e.target.value)}
                  />
                  <Input
                    label="Send Time"
                    type="time"
                    value={emailData.sendTime}
                    onChange={(e) => handleInputChange('sendTime', e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{emailData.recipients.length} recipients</span>
            </div>
            {emailData.includeReport && (
              <div className="flex items-center space-x-1">
                <Icon name="Paperclip" size={14} />
                <span>Report attached</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="outline" iconName="Save">
              Save Draft
            </Button>
            <Button 
              variant="default" 
              onClick={handleSend}
              iconName={emailData.scheduleSend ? "Clock" : "Send"}
            >
              {emailData.scheduleSend ? 'Schedule' : 'Send Now'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailComposer;