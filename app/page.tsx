'use client';

import Link from 'next/link';
import PageLayout from './components/PageLayout';
import { 
  UserGroupIcon, 
  CurrencyDollarIcon, 
  ClipboardDocumentListIcon, 
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

// Mock data for the dashboard
const stats = [
  { 
    name: 'Total Customers', 
    value: '120', 
    change: '+8%', 
    trend: 'up',
    icon: UserGroupIcon, 
    href: '/customers',
    color: 'bg-blue-100 text-blue-800'
  },
  { 
    name: 'Active Deals', 
    value: '24', 
    change: '+12%', 
    trend: 'up',
    icon: CurrencyDollarIcon, 
    href: '/deals',
    color: 'bg-green-100 text-green-800'
  },
  { 
    name: 'Tasks Due Today', 
    value: '5', 
    change: '-2', 
    trend: 'down',
    icon: ClipboardDocumentListIcon, 
    href: '/tasks',
    color: 'bg-amber-100 text-amber-800'
  },
  { 
    name: 'Revenue This Month', 
    value: '$32,410', 
    change: '+18%', 
    trend: 'up',
    icon: ArrowTrendingUpIcon, 
    href: '/reports',
    color: 'bg-purple-100 text-purple-800'
  },
];

const recentActivity = [
  { id: 1, type: 'deal', title: 'New deal created', customer: 'Acme Inc.', timestamp: '2 hours ago' },
  { id: 2, type: 'customer', title: 'New customer added', customer: 'Globex Corporation', timestamp: '4 hours ago' },
  { id: 3, type: 'task', title: 'Task completed', customer: 'Stark Industries', timestamp: '5 hours ago' },
  { id: 4, type: 'email', title: 'Email sent', customer: 'Wayne Enterprises', timestamp: 'Yesterday' },
  { id: 5, type: 'meeting', title: 'Meeting scheduled', customer: 'Umbrella Corp', timestamp: 'Yesterday' },
];

export default function Home() {
  return (
    <PageLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Link 
              key={stat.name} 
              href={stat.href}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow transition-all hover:shadow-md"
            >
              <div className="flex items-center">
                <div className={`rounded-md p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-4 flex-1">
                  <dt className="truncate text-sm font-medium text-gray-500">{stat.name}</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                    <div className={`ml-2 flex items-center text-sm font-semibold ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </div>
                  </dd>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg bg-white shadow">
          <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Recent Activity</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <li key={activity.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium text-indigo-600">{activity.title}</p>
                  <div className="ml-2 flex shrink-0">
                    <p className="text-sm text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{activity.customer}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
            <Link href="/activities" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all activity
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
