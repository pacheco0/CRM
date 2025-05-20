'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  PencilIcon, 
  TrashIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import PageLayout from '../../components/PageLayout';

// Mock data for customers
const CUSTOMERS = [
  { 
    id: '1', 
    name: 'Acme Inc.', 
    company: 'Acme Corporation',
    contact: 'John Doe', 
    email: 'john@acme.com', 
    phone: '(555) 123-4567',
    website: 'www.acme.com',
    address: '123 Acme St, Anytown, USA',
    status: 'active',
    industry: 'Technology',
    source: 'Referral',
    notes: 'Long-term client with multiple departments using our services.',
  },
  // Additional customers would be here
];

// Mock data for contacts
const CONTACTS = [
  { id: '1', customerId: '1', firstName: 'John', lastName: 'Doe', email: 'john@acme.com', phone: '(555) 123-4567', position: 'CEO' },
  { id: '2', customerId: '1', firstName: 'Jane', lastName: 'Smith', email: 'jane@acme.com', phone: '(555) 234-5678', position: 'CTO' },
  { id: '3', customerId: '1', firstName: 'Mike', lastName: 'Johnson', email: 'mike@acme.com', phone: '(555) 345-6789', position: 'Sales Manager' },
];

// Mock data for deals
const DEALS = [
  { id: '1', customerId: '1', title: 'Enterprise License', value: 25000, stage: 'proposal', probability: 75, closeDate: new Date(2023, 5, 15) },
  { id: '2', customerId: '1', title: 'Support Contract', value: 10000, stage: 'negotiation', probability: 90, closeDate: new Date(2023, 4, 30) },
];

// Mock data for activities
const ACTIVITIES = [
  { id: '1', customerId: '1', type: 'meeting', description: 'Initial discovery call', createdAt: new Date(2023, 2, 15) },
  { id: '2', customerId: '1', type: 'email', description: 'Sent proposal documents', createdAt: new Date(2023, 3, 1) },
  { id: '3', customerId: '1', type: 'note', description: 'Client expressed interest in additional services', createdAt: new Date(2023, 3, 10) },
];

const tabs = [
  { name: 'Overview', id: 'overview' },
  { name: 'Contacts', id: 'contacts' },
  { name: 'Deals', id: 'deals' },
  { name: 'Activities', id: 'activities' },
];

const dealStageColors = {
  prospect: 'bg-gray-100 text-gray-800',
  qualified: 'bg-blue-100 text-blue-800',
  proposal: 'bg-yellow-100 text-yellow-800',
  negotiation: 'bg-orange-100 text-orange-800',
  closed: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
};

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find the customer based on the ID from the URL
  const customer = CUSTOMERS.find(c => c.id === params.id);
  
  // Filter related data for this customer
  const customerContacts = CONTACTS.filter(contact => contact.customerId === params.id);
  const customerDeals = DEALS.filter(deal => deal.customerId === params.id);
  const customerActivities = ACTIVITIES.filter(activity => activity.customerId === params.id);
  
  if (!customer) {
    return (
      <PageLayout title="Customer Not Found">
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Customer not found</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>The customer you are looking for does not exist or has been removed.</p>
              </div>
              <div className="mt-4">
                <Link
                  href="/customers"
                  className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-800 hover:bg-red-100"
                >
                  <ArrowLeftIcon className="-ml-0.5 mr-1.5 h-4 w-4" aria-hidden="true" />
                  Back to Customers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={customer.name}>
      <div className="space-y-6">
        {/* Customer actions */}
        <div className="flex items-center justify-between">
          <Link
            href="/customers"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="-ml-0.5 mr-1.5 h-4 w-4" aria-hidden="true" />
            Back to Customers
          </Link>

          <div className="flex items-center space-x-3">
            <Link
              href={`/customers/${customer.id}/edit`}
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <PencilIcon className="-ml-0.5 mr-1.5 h-4 w-4" aria-hidden="true" />
              Edit
            </Link>
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
            >
              <TrashIcon className="-ml-0.5 mr-1.5 h-4 w-4" aria-hidden="true" />
              Delete
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium 
                  ${activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                `}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        <div>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Customer Information</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <BuildingOfficeIcon className="mr-1.5 h-5 w-5 text-gray-400" />
                      Company Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{customer.company}</dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <UserIcon className="mr-1.5 h-5 w-5 text-gray-400" />
                      Primary Contact
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{customer.contact}</dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <EnvelopeIcon className="mr-1.5 h-5 w-5 text-gray-400" />
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <a href={`mailto:${customer.email}`} className="text-indigo-600 hover:text-indigo-900">
                        {customer.email}
                      </a>
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <PhoneIcon className="mr-1.5 h-5 w-5 text-gray-400" />
                      Phone
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <a href={`tel:${customer.phone}`} className="text-indigo-600 hover:text-indigo-900">
                        {customer.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <GlobeAltIcon className="mr-1.5 h-5 w-5 text-gray-400" />
                      Website
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <a href={`https://${customer.website}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                        {customer.website}
                      </a>
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <TagIcon className="mr-1.5 h-5 w-5 text-gray-400" />
                      Industry
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{customer.industry}</dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{customer.address}</dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Notes</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{customer.notes}</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Contacts</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">List of contacts associated with this customer.</p>
                </div>
                <Link
                  href={`/customers/${customer.id}/contacts/new`}
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  Add Contact
                </Link>
              </div>
              <div className="border-t border-gray-200">
                <ul role="list" className="divide-y divide-gray-200">
                  {customerContacts.map((contact) => (
                    <li key={contact.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <p className="truncate text-sm font-medium text-indigo-600">
                          {contact.firstName} {contact.lastName}
                        </p>
                        <div className="ml-2 flex shrink-0">
                          <Link
                            href={`/customers/${customer.id}/contacts/${contact.id}`}
                            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-900"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            {contact.position}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <EnvelopeIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                          <p>
                            <a href={`mailto:${contact.email}`} className="hover:underline">
                              {contact.email}
                            </a>
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Deals Tab */}
          {activeTab === 'deals' && (
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Deals</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">List of deals associated with this customer.</p>
                </div>
                <Link
                  href={`/customers/${customer.id}/deals/new`}
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  Add Deal
                </Link>
              </div>
              <div className="border-t border-gray-200">
                <ul role="list" className="divide-y divide-gray-200">
                  {customerDeals.map((deal) => (
                    <li key={deal.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <p className="truncate text-sm font-medium text-indigo-600">{deal.title}</p>
                        <div className="ml-2 flex shrink-0">
                          <Link
                            href={`/deals/${deal.id}`}
                            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-900"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${dealStageColors[deal.stage as keyof typeof dealStageColors]}`}>
                              {deal.stage.charAt(0).toUpperCase() + deal.stage.slice(1)}
                            </span>
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p><span className="font-medium">${deal.value.toLocaleString()}</span> • {deal.probability}% • Closes {deal.closeDate.toLocaleDateString()}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Activities Tab */}
          {activeTab === 'activities' && (
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Activities</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Recent activities related to this customer.</p>
                </div>
                <div className="space-x-3">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Log Call
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Add Note
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Schedule Meeting
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-200">
                <ul role="list" className="divide-y divide-gray-200">
                  {customerActivities.map((activity) => (
                    <li key={activity.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <p className="truncate text-sm font-medium text-gray-900">
                          <span className="capitalize">{activity.type}</span>: {activity.description}
                        </p>
                        <div className="ml-2 flex shrink-0">
                          <p className="text-sm text-gray-500">{activity.createdAt.toLocaleDateString()}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
} 