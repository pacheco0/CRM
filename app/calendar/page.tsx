'use client';

import { useState } from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  PlusIcon,
  CalendarDaysIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';
import PageLayout from '../components/PageLayout';
import Link from 'next/link';

// Mock data for calendar events
const EVENTS = [
  { 
    id: '1', 
    title: 'Call with Acme Inc', 
    customer: 'Acme Inc.',
    type: 'call',
    startTime: new Date(2023, 4, 10, 10, 0), 
    endTime: new Date(2023, 4, 10, 11, 0),
    description: 'Follow-up call to discuss proposal details',
  },
  { 
    id: '2', 
    title: 'Globex Corporation Demo', 
    customer: 'Globex Corporation',
    type: 'meeting',
    startTime: new Date(2023, 4, 10, 14, 0), 
    endTime: new Date(2023, 4, 10, 15, 30),
    description: 'Product demo with executive team',
  },
  { 
    id: '3', 
    title: 'Stark Industries Review', 
    customer: 'Stark Industries',
    type: 'meeting',
    startTime: new Date(2023, 4, 12, 11, 0), 
    endTime: new Date(2023, 4, 12, 12, 0),
    description: 'Quarterly review meeting',
  },
  { 
    id: '4', 
    title: 'Send Wayne Enterprises Proposal', 
    customer: 'Wayne Enterprises',
    type: 'task',
    startTime: new Date(2023, 4, 13, 9, 0), 
    endTime: new Date(2023, 4, 13, 10, 0),
    description: 'Finalize and send revised proposal',
  },
  { 
    id: '5', 
    title: 'Team Sprint Planning', 
    type: 'internal',
    startTime: new Date(2023, 4, 15, 13, 0), 
    endTime: new Date(2023, 4, 15, 14, 30),
    description: 'Weekly sprint planning meeting',
  },
];

const eventTypeColors = {
  'call': 'bg-blue-50 text-blue-700 border-blue-200',
  'meeting': 'bg-purple-50 text-purple-700 border-purple-200',
  'task': 'bg-amber-50 text-amber-700 border-amber-200',
  'internal': 'bg-gray-50 text-gray-700 border-gray-200',
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('week');
  
  // Function to generate days for the week view
  const generateWeekDays = (date: Date) => {
    const days = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // Start from Sunday
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    
    return days;
  };
  
  const weekDays = generateWeekDays(currentDate);
  
  // Filter events for the current week
  const weekEvents = EVENTS.filter(event => {
    const eventDate = new Date(event.startTime);
    return weekDays.some(day => 
      eventDate.getDate() === day.getDate() && 
      eventDate.getMonth() === day.getMonth() && 
      eventDate.getFullYear() === day.getFullYear()
    );
  });
  
  // Group events by day
  const eventsByDay = weekDays.map(day => {
    return {
      date: day,
      events: weekEvents.filter(event => {
        const eventDate = new Date(event.startTime);
        return (
          eventDate.getDate() === day.getDate() &&
          eventDate.getMonth() === day.getMonth() &&
          eventDate.getFullYear() === day.getFullYear()
        );
      }).sort((a, b) => a.startTime.getTime() - b.startTime.getTime()),
    };
  });
  
  // Navigation functions
  const prevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };
  
  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };
  
  const today = () => {
    setCurrentDate(new Date());
  };
  
  // Format time (e.g., "10:00 AM")
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };
  
  return (
    <PageLayout title="Calendar">
      <div className="space-y-4">
        {/* Calendar header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={prevWeek}
              className="rounded-md bg-white p-1.5 text-gray-400 hover:text-gray-500"
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={nextWeek}
              className="rounded-md bg-white p-1.5 text-gray-400 hover:text-gray-500"
            >
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">
              {weekDays[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {' '}
              {weekDays[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h2>
            <button
              type="button"
              onClick={today}
              className="ml-4 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Today
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setView('week')}
                className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold ${
                  view === 'week' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                }`}
              >
                Week
              </button>
              <button
                type="button"
                onClick={() => setView('day')}
                className={`relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold ${
                  view === 'day' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                }`}
              >
                Day
              </button>
            </div>
            
            <Link
              href="/calendar/new"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-4 w-4" aria-hidden="true" />
              Add Event
            </Link>
          </div>
        </div>
        
        {/* Week view */}
        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden shadow">
          {/* Day headers */}
          {weekDays.map((day, i) => (
            <div 
              key={i} 
              className="bg-gray-50 py-2 text-center text-xs font-medium uppercase text-gray-500"
            >
              <div>{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
              <div className={`text-base mt-1 ${
                day.toDateString() === new Date().toDateString() 
                  ? 'bg-indigo-600 text-white h-7 w-7 rounded-full flex items-center justify-center mx-auto' 
                  : 'text-gray-900'
              }`}>
                {day.getDate()}
              </div>
            </div>
          ))}
          
          {/* Day cells with events */}
          {eventsByDay.map((dayData, i) => (
            <div 
              key={i} 
              className="h-96 overflow-y-auto bg-white p-2"
            >
              {dayData.events.length > 0 ? (
                <ul className="space-y-2">
                  {dayData.events.map(event => (
                    <li 
                      key={event.id}
                      className={`rounded-md border px-3 py-2 ${eventTypeColors[event.type as keyof typeof eventTypeColors]}`}
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-sm">{event.title}</p>
                        <span className="text-xs">
                          {formatTime(event.startTime)}
                        </span>
                      </div>
                      {event.customer && (
                        <p className="text-xs mt-1">{event.customer}</p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-gray-500">No events</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Upcoming events */}
        <div className="rounded-lg bg-white p-4 shadow sm:p-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-base font-semibold leading-6 text-gray-900 flex items-center">
              <CalendarDaysIcon className="mr-2 h-5 w-5 text-indigo-500" aria-hidden="true" />
              Upcoming Events
            </h3>
          </div>
          <ul className="mt-4 space-y-4">
            {weekEvents.slice(0, 3).map(event => (
              <li key={event.id} className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-indigo-800">
                      {event.startTime.getDate()}
                    </span>
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">{event.title}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {event.startTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </p>
                </div>
              </li>
            ))}
            {weekEvents.length > 3 && (
              <li className="text-center">
                <Link href="/calendar/list" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  View all events
                </Link>
              </li>
            )}
            {weekEvents.length === 0 && (
              <li className="text-center py-4">
                <p className="text-sm text-gray-500">No upcoming events</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </PageLayout>
  );
} 