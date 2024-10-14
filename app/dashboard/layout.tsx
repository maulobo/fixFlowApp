import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { updateNavItemsWithPendingCount } from '@/constants/data';
import { NavItem } from '@/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FlowFlex',
  description: 'Manejador de informacion'
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const navbar: NavItem[] = await updateNavItemsWithPendingCount();

  return (
    <div className="flex">
      <Sidebar navBar={navbar} />
      <main className="w-full flex-1 overflow-hidden">
        {/* <Header /> */}
        {children}
      </main>
    </div>
  );
}
