import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Icon from '../../components/AppIcon';
import { useToast } from '../../components/ui/Toast';
import calendarEventsData from './calendarEvents.json';
import monthNames from './monthNames.json';
import dayNames from './dayNames.json';
import eventTypes from './eventTypes.json';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [events, setEvents] = useState(calendarEventsData);

  const { toast } = useToast();

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    
    // Previous month days
    for (let i = firstDayWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    // Current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push({
        date: currentDate,
        isCurrentMonth: true,
        isToday: currentDate.toDateString() === today.toDateString()
      });
    }
    
    // Next month days to fill grid
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: Date.now()
    };
    setEvents(prev => [...prev, newEvent]);
    toast.success('Event added successfully');
    setIsEventModalOpen(false);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time))
    .slice(0, 5);

  return (
    <>
      <Helmet>
        <title>Calendar - Invest Wise</title>
        <meta name="description" content="Portfolio calendar with investment events, meetings, earnings releases, and economic indicators." />
      </Helmet>

      <div className="min-h-screen bg-black text-white">
        <main className="pt-16">
          <div className="container-dashboard py-8">
            <Breadcrumb />
            
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-foreground mb-2">Portfolio Calendar</h1>
                <p className="text-muted-foreground">
                  Track important dates, meetings, and market events
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <Button variant="outline" iconName="Download">
                  Export Calendar
                </Button>
                <Button variant="default" iconName="Plus" onClick={handleAddEvent}>
                  Add Event
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Calendar */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => navigateMonth(-1)}
                        >
                          <Icon name="ChevronLeft" size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentDate(new Date())}
                        >
                          Today
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => navigateMonth(1)}
                        >
                          <Icon name="ChevronRight" size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Calendar Header */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {dayNames.map((day) => (
                        <div
                          key={day}
                          className="p-2 text-center text-sm font-medium text-muted-foreground"
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {getDaysInMonth(currentDate).map((day, index) => {
                        const dayEvents = getEventsForDate(day.date);
                        
                        return (
                          <div
                            key={index}
                            onClick={() => handleDateClick(day.date)}
                            className={`p-2 min-h-24 border border-border rounded-lg cursor-pointer hover:bg-muted/30 transition-colors ${
                              !day.isCurrentMonth ? 'opacity-40' : ''
                            } ${
                              day.isToday ? 'bg-primary/10 border-primary' : ''
                            } ${
                              selectedDate && selectedDate.toDateString() === day.date.toDateString()
                                ? 'bg-accent/20 border-accent' :''
                            }`}
                          >
                            <div className={`text-sm font-medium mb-1 ${
                              day.isToday ? 'text-primary' : 'text-foreground'
                            }`}>
                              {day.date.getDate()}
                            </div>
                            
                            {/* Event indicators */}
                            <div className="space-y-1">
                              {dayEvents.slice(0, 2).map((event) => (
                                <div
                                  key={event.id}
                                  className={`px-1 py-0.5 rounded text-xs truncate ${
                                    eventTypes[event.type]?.color || 'bg-muted text-muted-foreground'
                                  }`}
                                  title={event.title}
                                >
                                  {event.title}
                                </div>
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="text-xs text-muted-foreground">
                                  +{dayEvents.length - 2} more
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="Clock" size={18} className="text-primary" />
                      <span>Upcoming Events</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <div className={`p-1 rounded ${eventTypes[event.type]?.color || 'bg-muted'}`}>
                              <Icon name={eventTypes[event.type]?.icon || 'Calendar'} size={12} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm text-foreground truncate">
                                {event.title}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(event.date).toLocaleDateString()} at {event.time}
                              </div>
                              {event.portfolio && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  {event.portfolio}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Event Legend */}
                <Card>
                  <CardHeader>
                    <CardTitle>Event Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(eventTypes).map(([type, config]) => (
                        <div key={type} className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded ${config.color}`}></div>
                          <span className="text-sm text-foreground capitalize">{type}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" fullWidth iconName="UserPlus">
                        Schedule Client Meeting
                      </Button>
                      <Button variant="outline" size="sm" fullWidth iconName="FileText">
                        Set Review Reminder
                      </Button>
                      <Button variant="outline" size="sm" fullWidth iconName="Bell">
                        Add Market Alert
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Selected Date Events */}
            {selectedDate && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>
                    Events for {selectedDate.toLocaleDateString()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {getEventsForDate(selectedDate).length > 0 ? (
                    <div className="space-y-4">
                      {getEventsForDate(selectedDate).map((event) => (
                        <div key={event.id} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                          <div className={`p-2 rounded ${eventTypes[event.type]?.color || 'bg-muted'}`}>
                            <Icon name={eventTypes[event.type]?.icon || 'Calendar'} size={16} />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-foreground">{event.title}</div>
                            <div className="text-sm text-muted-foreground">{event.time}</div>
                            {event.description && (
                              <div className="text-sm text-muted-foreground mt-1">
                                {event.description}
                              </div>
                            )}
                            {event.portfolio && (
                              <div className="text-xs text-muted-foreground mt-2">
                                Portfolio: {event.portfolio}
                              </div>
                            )}
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" className="w-8 h-8">
                              <Icon name="Edit" size={14} />
                            </Button>
                            <Button variant="ghost" size="icon" className="w-8 h-8 text-error">
                              <Icon name="Trash2" size={14} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No events scheduled for this date.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>

      {/* Add Event Modal */}
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSave={handleSaveEvent}
      />
    </>
  );
};

// Event Modal Component
const EventModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    type: 'meeting',
    description: '',
    portfolio: '',
    attendees: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      title: '',
      date: '',
      time: '',
      type: 'meeting',
      description: '',
      portfolio: '',
      attendees: ''
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Event" size="lg" className='bg-white text-black'>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Event Title *
            </label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
              placeholder="Enter event title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Event Type *
            </label>
            <Select
              value={formData.type}
              onChange={(value) => setFormData(prev => ({...prev, type: value}))}
              options={[
                { value: 'meeting', label: 'Meeting' },
                { value: 'client', label: 'Client Meeting' },
                { value: 'earnings', label: 'Earnings Release' },
                { value: 'economic', label: 'Economic Event' },
                { value: 'deadline', label: 'Deadline' }
              ]}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Date *
            </label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({...prev, date: e.target.value}))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Time *
            </label>
            <Input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData(prev => ({...prev, time: e.target.value}))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Portfolio
            </label>
            <Select
              value={formData.portfolio}
              onChange={(value) => setFormData(prev => ({...prev, portfolio: value}))}
              options={[
                { value: '', label: 'Select Portfolio' },
                { value: 'Growth Portfolio A', label: 'Growth Portfolio A' },
                { value: 'Conservative Fund B', label: 'Conservative Fund B' },
                { value: 'Balanced Strategy C', label: 'Balanced Strategy C' },
                { value: 'Tech Innovation D', label: 'Tech Innovation D' },
                { value: 'All Portfolios', label: 'All Portfolios' }
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Attendees
            </label>
            <Input
              type="text"
              value={formData.attendees}
              onChange={(e) => setFormData(prev => ({...prev, attendees: e.target.value}))}
              placeholder="Comma-separated names"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description
          </label>
          <textarea
            className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows="3"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
            placeholder="Event description or notes"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="default">
            Add Event
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default Calendar;