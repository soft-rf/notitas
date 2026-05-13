import React from 'react';
import { Header } from './Header';
import { TabsBar } from './TabsBar';

interface LayoutProps {
  children: React.ReactNode;
  headerActions?: React.ReactNode;
  tabsProps: any;
}

export const Layout: React.FC<LayoutProps> = ({ children, headerActions, tabsProps }) => {
  return (
    <div className="h-screen w-full bg-dark-900 text-gray-200 flex flex-col font-sans overflow-hidden">
      <Header>{headerActions}</Header>
      <TabsBar {...tabsProps} />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#0f0f0f]">
        <div className="max-w-3xl mx-auto w-full h-full pb-32">
          {children}
        </div>
      </main>
    </div>
  );
};
