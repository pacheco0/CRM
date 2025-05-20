'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from '../../components/PageLayout';
import CustomerForm from '../../components/CustomerForm';

export default function NewCustomerPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, you would call an API endpoint here
      // to save the customer to the database
      console.log('Creating new customer:', data);
      
      // For demonstration, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to the customers list
      router.push('/customers');
      router.refresh();
    } catch (error) {
      console.error('Error creating customer:', error);
      alert('Failed to create customer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout title="Add New Customer">
      <div className="mx-auto max-w-3xl">
        <CustomerForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </PageLayout>
  );
} 