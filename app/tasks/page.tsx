'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlusIcon, MagnifyingGlassIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import PageLayout from '../components/PageLayout';

// Mock data for tasks
const TASKS = [
  { 
    id: '1', 
    title: 'Follow up with Acme Inc', 
    customer: 'Acme Inc.',
    description: 'Call John Doe to discuss the proposal',
    dueDate: new Date(2023, 5, 15),
    status: 'pending',
    priority: 'high',
  },
  { 
    id: '2', 
    title: 'Send contract for Support Services', 
    customer: 'Acme Inc.',
    description: 'Email the updated contract for review',
    dueDate: new Date(2023, 4, 30),
    status: 'pending',
    priority: 'medium',
  },
  { 
    id: '3', 
    title: 'Prepare integration proposal', 
    customer: 'Globex Corporation',
    description: 'Draft technical specifications and pricing',
    dueDate: new Date(2023, 6, 20),
    status: 'in-progress',
    priority: 'medium',
  },
  { 
    id: '4', 
    title: 'Invoice for consulting services', 
    customer: 'Stark Industries',
    description: 'Generate monthly invoice for April services',
    dueDate: new Date(2023, 4, 5),
    status: 'completed',
    priority: 'medium',
  },
  { 
    id: '5', 
    title: 'Product demo for new client', 
    customer: 'Wayne Enterprises',
    description: 'Schedule and prepare demo for executive team',
    dueDate: new Date(2023, 5, 12),
    status: 'pending',
    priority: 'high',
  },
];

const statusColors = {
  'pending': 'bg-amber-100 text-amber-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  'completed': 'bg-green-100 text-green-800',
  'canceled': 'bg-gray-100 text-gray-800',
};

const priorityColors = {
  'low': 'bg-gray-100 text-gray-800',
  'medium': 'bg-blue-100 text-blue-800',
  'high': 'bg-red-100 text-red-800',
};

export default function TasksPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredTasks = TASKS.filter(task => {
    // Apply search filter
    const matchesSearch = search === '' || 
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.customer.toLowerCase().includes(search.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(search.toLowerCase()));
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    
    // Apply priority filter
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <PageLayout title="Tasks">
      <div className="space-y-4">
        {/* Actions bar */}
        <div className="flex flex-wrap gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center max-w-md">
            <div className="w-full relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                placeholder="Search tasks..."
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>

            <select
              className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <Link
              href="/tasks/new"
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Add Task
            </Link>
          </div>
        </div>

        {/* Tasks list */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
          <ul className="divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <li key={task.id} className="p-4 hover:bg-gray-50 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-1 items-center">
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/tasks/${task.id}`}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                      >
                        {task.title}
                      </Link>
                      <p className="truncate text-sm text-gray-500">
                        {task.customer} • {task.description}
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex flex-col sm:flex-row gap-2 items-end sm:items-center">
                    <div className="flex items-center">
                      <CalendarDaysIcon className="mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span className="text-sm text-gray-500">
                        {task.dueDate.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[task.status as keyof typeof statusColors]}`}>
                        {task.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageLayout>
  );
} 