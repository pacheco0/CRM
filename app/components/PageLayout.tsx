'use client';

import Header from './Header';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <div className="flex h-full flex-col">
      <Header title={title} />
      <div className="flex-1 overflow-y-auto p-4 md:p-6">{children}</div>
    </div>
  );
} 