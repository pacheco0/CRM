import { Metadata } from 'next';
import CustomerDetailClient from './client';

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
    title: customer ? `${customer.name} | CRM Pro` : 'Customer Not Found | CRM Pro',
  };
}

export default function Page({ params }: { params: { id: string } }) {
  const customer = CUSTOMERS.find(c => c.id === params.id);
  
  // Filter related data for this customer
  const customerContacts = CONTACTS.filter(contact => contact.customerId === params.id);
  const customerDeals = DEALS.filter(deal => deal.customerId === params.id);
  const customerActivities = ACTIVITIES.filter(activity => activity.customerId === params.id);
  
  return (
    <CustomerDetailClient 
      customer={customer} 
      contacts={customerContacts} 
      deals={customerDeals} 
      activities={customerActivities} 
    />
  );
} 