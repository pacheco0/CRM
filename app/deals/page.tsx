'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import PageLayout from '../components/PageLayout';

// Mock data for deals
const DEALS = [
  { 
    id: '1', 
    title: 'Enterprise License', 
    customer: 'Acme Inc.', 
    value: 25000, 
    stage: 'proposal', 
    probability: 75, 
    closeDate: new Date(2023, 5, 15),
  },
  { 
    id: '2', 
    title: 'Support Contract', 
    customer: 'Acme Inc.', 
    value: 10000, 
    stage: 'negotiation', 
    probability: 90, 
    closeDate: new Date(2023, 4, 30),
  },
  { 
    id: '3', 
    title: 'Software Integration', 
    customer: 'Globex Corporation', 
    value: 35000, 
    stage: 'qualified', 
    probability: 60, 
    closeDate: new Date(2023, 6, 20),
  },
  { 
    id: '4', 
    title: 'Consulting Services', 
    customer: 'Stark Industries', 
    value: 15000, 
    stage: 'closed', 
    probability: 100, 
    closeDate: new Date(2023, 3, 10),
  },
  { 
    id: '5', 
    title: 'Annual Subscription', 
    customer: 'Wayne Enterprises', 
    value: 18000, 
    stage: 'prospect', 
    probability: 30, 
    closeDate: new Date(2023, 7, 5),
  },
];

const stageColors = {
  prospect: 'bg-gray-100 text-gray-800',
  qualified: 'bg-blue-100 text-blue-800',
  proposal: 'bg-yellow-100 text-yellow-800',
  negotiation: 'bg-orange-100 text-orange-800',
  closed: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
};

export default function DealsPage() {
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('all');

  const filteredDeals = DEALS.filter(deal => {
    // Apply search filter
    const matchesSearch = search === '' || 
      deal.title.toLowerCase().includes(search.toLowerCase()) ||
      deal.customer.toLowerCase().includes(search.toLowerCase());
    
    // Apply stage filter
    const matchesStage = stageFilter === 'all' || deal.stage === stageFilter;
    
    return matchesSearch && matchesStage;
  });

  // Calculate total value of filtered deals
  const totalValue = filteredDeals.reduce((sum, deal) => sum + deal.value, 0);

  return (
    <PageLayout title="Deals">
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
                placeholder="Search deals..."
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="ml-3">
              <select
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
              >
                <option value="all">All Stages</option>
                <option value="prospect">Prospect</option>
                <option value="qualified">Qualified</option>
                <option value="proposal">Proposal</option>
                <option value="negotiation">Negotiation</option>
                <option value="closed">Closed</option>
                <option value="lost">Lost</option>
              </select>
            </div>
          </div>

          <Link
            href="/deals/new"
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add Deal
          </Link>
        </div>

        {/* Deals summary */}
        <div className="rounded-lg bg-white p-4 shadow sm:p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold leading-6 text-gray-900">Deal Summary</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {filteredDeals.length} deals with a total value of ${totalValue.toLocaleString()}
              </p>
            </div>
            <div className="mt-3 flex sm:ml-4 sm:mt-0">
              <Link
                href="/deals/pipeline"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <FunnelIcon className="-ml-0.5 mr-1.5 h-4 w-4" aria-hidden="true" />
                Pipeline View
              </Link>
            </div>
          </div>
        </div>

        {/* Deals table */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Deal
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Value
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Stage
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Close Date
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredDeals.map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{deal.title}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">{deal.customer}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">${deal.value.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{deal.probability}% probability</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${stageColors[deal.stage as keyof typeof stageColors]}`}>
                      {deal.stage.charAt(0).toUpperCase() + deal.stage.slice(1)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {deal.closeDate.toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <Link href={`/deals/${deal.id}`} className="text-indigo-600 hover:text-indigo-900">
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