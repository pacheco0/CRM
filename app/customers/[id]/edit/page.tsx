'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from '../../../components/PageLayout';
import CustomerForm from '../../../components/CustomerForm';

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

export default function EditCustomerPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find the customer based on the ID from the URL
  const customer = CUSTOMERS.find(c => c.id === params.id);

  if (!customer) {
    return (
      <PageLayout title="Customer Not Found">
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Customer not found</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>The customer you are trying to edit does not exist or has been removed.</p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => router.push('/customers')}
                  className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-800 hover:bg-red-100"
                >
                  Back to Customers
                </button>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, you would call an API endpoint here
      // to update the customer in the database
      console.log('Updating customer:', data);
      
      // For demonstration, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to the customer details page
      router.push(`/customers/${params.id}`);
      router.refresh();
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Failed to update customer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout title={`Edit Customer: ${customer.name}`}>
      <div className="mx-auto max-w-3xl">
        <CustomerForm
          initialData={customer}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </PageLayout>
  );
} 