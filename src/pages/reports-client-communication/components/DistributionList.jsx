import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DistributionList = ({ lists, onCreateList, onEditList, onDeleteList }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleCreateList = () => {
    if (newListName.trim()) {
      onCreateList({
        name: newListName.trim(),
        recipients: [],
        createdAt: new Date().toISOString()
      });
      setNewListName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-foreground">Distribution Lists</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsCreating(true)}
          iconName="Plus"
          iconPosition="left"
        >
          New List
        </Button>
      </div>

      {isCreating && (
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <div className="space-y-3">
            <Input
              label="List Name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Enter list name"
              onKeyPress={(e) => e.key === 'Enter' && handleCreateList()}
            />
            <div className="flex items-center space-x-2">
              <Button variant="default" size="sm" onClick={handleCreateList}>
                Create
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setIsCreating(false);
                  setNewListName('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {lists.map((list) => (
          <div key={list.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-foreground">{list.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {Array.isArray(list.recipients) ? list.recipients.length : list.recipients || 0} recipients
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEditList(list)}
                  className="w-8 h-8"
                >
                  <Icon name="Edit2" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteList(list.id)}
                  className="w-8 h-8 text-error hover:text-error"
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {Array.isArray(list.recipients) && list.recipients.slice(0, 3).map((recipient, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">
                      {recipient.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-foreground">{recipient.name}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{recipient.email}</span>
                </div>
              ))}

              {Array.isArray(list.recipients) && list.recipients.length > 3 && (
                <div className="text-sm text-muted-foreground">
                  +{list.recipients.length - 3} more recipients
                </div>
              )}

              {!Array.isArray(list.recipients) && typeof list.recipients === 'number' && (
                <div className="text-sm text-muted-foreground">
                  {list.recipients} total recipients
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
              <div className="text-xs text-muted-foreground">
                Created: {new Date(list.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-xs">
                  View All
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Send Test
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {lists.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Users" size={32} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No distribution lists created</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCreating(true)}
            className="mt-3"
          >
            Create your first list
          </Button>
        </div>
      )}
    </div>
  );
};

export default DistributionList;