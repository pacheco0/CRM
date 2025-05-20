import { Metadata } from 'next';
import CustomerEditClient from './client';

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

export function generateStaticParams() {
  return CUSTOMERS.map((customer) => ({
    id: customer.id,
  }));
}

export function generateMetadata({ 
  params,
}: {
  params: { id: string };
}): Metadata {
  const customer = CUSTOMERS.find(c => c.id === params.id);
  return {
    title: customer ? `Edit: ${customer.name} | CRM Pro` : 'Customer Not Found | CRM Pro',
  };
}

export default function Page({ params }: { params: { id: string } }) {
  const customer = CUSTOMERS.find(c => c.id === params.id);
  return <CustomerEditClient customer={customer} id={params.id} />;
} 