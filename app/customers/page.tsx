'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UserPlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import PageLayout from '../components/PageLayout';

// Mock data for customers
const CUSTOMERS = [
  { 
    id: '1', 
    name: 'Acme Inc.', 
    contact: 'John Doe', 
    email: 'john@acme.com', 
    phone: '(555) 123-4567', 
    status: 'active',
    industry: 'Technology'
  },
  { 
    id: '2', 
    name: 'Globex Corporation', 
    contact: 'Jane Smith', 
    email: 'jane@globex.com', 
    phone: '(555) 234-5678', 
    status: 'active',
    industry: 'Manufacturing'
  },
  { 
    id: '3', 
    name: 'Stark Industries', 
    contact: 'Tony Stark', 
    email: 'tony@stark.com', 
    phone: '(555) 345-6789', 
    status: 'lead',
    industry: 'Defense'
  },
  { 
    id: '4', 
    name: 'Wayne Enterprises', 
    contact: 'Bruce Wayne', 
    email: 'bruce@wayne.com', 
    phone: '(555) 456-7890', 
    status: 'inactive',
    industry: 'Various'
  },
  { 
    id: '5', 
    name: 'Umbrella Corp', 
    contact: 'Albert Wesker', 
    email: 'wesker@umbrella.com', 
    phone: '(555) 567-8901', 
    status: 'lead',
    industry: 'Pharmaceutical'
  },
];

const statusColors = {
  active: 'bg-green-100 text-green-800',
  lead: 'bg-blue-100 text-blue-800',
  inactive: 'bg-gray-100 text-gray-800',
};

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCustomers = CUSTOMERS.filter(customer => {
    // Apply search filter
    const matchesSearch = search === '' || 
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.contact.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase());
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <PageLayout title="Customers">
      <div className="space-y-4">
        {/* Actions bar */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex flex-1 items-center max-w-md">
            <div className="w-full relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                placeholder="Search customers..."
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="ml-3">
              <select
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="lead">Lead</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <Link
            href="/customers/new"
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <UserPlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add Customer
          </Link>
        </div>

        {/* Customers table */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Industry
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">{customer.contact}</div>
                    <div className="text-sm text-gray-500">{customer.email}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {customer.industry}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusColors[customer.status as keyof typeof statusColors]}`}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <Link href={`/customers/${customer.id}`} className="text-indigo-600 hover:text-indigo-900">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
} 