'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface CustomerFormProps {
  initialData?: {
    id?: string;
    name: string;
    company?: string;
    industry?: string;
    email?: string;
    phone?: string;
    website?: string;
    address?: string;
    status?: string;
    source?: string;
    notes?: string;
  };
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
}

export default function CustomerForm({ initialData, onSubmit, isSubmitting = false }: CustomerFormProps) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {
      name: '',
      company: '',
      industry: '',
      email: '',
      phone: '',
      website: '',
      address: '',
      status: 'lead',
      source: '',
      notes: '',
    }
  });

  const statuses = [
    { id: 'lead', name: 'Lead' },
    { id: 'active', name: 'Active' },
    { id: 'inactive', name: 'Inactive' },
  ];

  const industries = [
    'Technology',
    'Manufacturing',
    'Healthcare',
    'Finance',
    'Retail',
    'Education',
    'Entertainment',
    'Hospitality',
    'Transportation',
    'Construction',
    'Agriculture',
    'Energy',
    'Other',
  ];

  const sources = [
    'Referral',
    'Website',
    'Marketing Campaign',
    'Cold Call',
    'Trade Show',
    'Social Media',
    'Other',
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Customer Name*
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  autoComplete="organization"
                  {...register('name', { required: 'Customer name is required' })}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 overflow-hidden text-ellipsis ${errors.name ? 'ring-red-500' : ''}`}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name.message?.toString()}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900">
                Company
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="company"
                  {...register('company')}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 overflow-hidden text-ellipsis"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="industry" className="block text-sm font-medium leading-6 text-gray-900">
                Industry
              </label>
              <div className="mt-2">
                <select
                  id="industry"
                  {...register('industry')}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 overflow-hidden text-ellipsis"
                >
                  <option value="">Select industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                Status
              </label>
              <div className="mt-2">
                <select
                  id="status"
                  {...register('status')}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 overflow-hidden text-ellipsis"
                >
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  autoComplete="email"
                  {...register('email', {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 overflow-hidden text-ellipsis ${errors.email ? 'ring-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email.message?.toString()}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="phone"
                  autoComplete="tel"
                  {...register('phone')}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 overflow-hidden text-ellipsis"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                Website
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="website"
                  placeholder="www.example.com"
                  {...register('website')}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 overflow-hidden text-ellipsis"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="source" className="block text-sm font-medium leading-6 text-gray-900">
                Source
              </label>
              <div className="mt-2">
                <select
                  id="source"
                  {...register('source')}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 overflow-hidden text-ellipsis"
                >
                  <option value="">Select source</option>
                  {sources.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                Address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="address"
                  {...register('address')}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 overflow-hidden text-ellipsis"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="notes" className="block text-sm font-medium leading-6 text-gray-900">
                Notes
              </label>
              <div className="mt-2">
                <textarea
                  id="notes"
                  rows={4}
                  {...register('notes')}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 overflow-auto"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </form>
  );
} 