import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
import Image from 'next/image';
import { SidebarNav1 } from './components/sidebar-nav';
import './styles.css';

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.'
};

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/dashboard/forms'
  },
  {
    title: 'Account',
    href: '/dashboard/forms/account'
  },
  {
    title: 'Appearance',
    href: '/dashboard/forms/appearance'
  },
  {
    title: 'Display',
    href: '/dashboard/forms/display'
  }
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className=" space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="cont-section">
          <aside className="-mx-4 md:w-1/3 lg:w-1/5 ">
            <SidebarNav1 items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
