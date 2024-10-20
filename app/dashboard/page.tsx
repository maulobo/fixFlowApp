import { auth } from '@/auth';

import { CalendarDateRangePicker } from '@/components/date-range-picker';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchData } from '@/lib/fetchData';
import TabMonth from './reclamos/components/tabs/tab-month';
import TabWeek from './reclamos/components/tabs/tab-week';
import TabDay from './reclamos/components/tabs/tab-day';
import TabSet from './reclamos/components/tabs/tab-set';
import TabMain from './reclamos/components/tabs/tab-main';

export default async function page({
  searchParams
}: {
  searchParams: { startDate?: string; endDate?: string };
}) {
  const session = await auth();

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Bienvenido {`${session?.user?.name}`}👋
          </h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="">
            <TabsTrigger value="overview">main</TabsTrigger>
            <TabsTrigger value="month">month</TabsTrigger>
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="day">Dia</TabsTrigger>
            <TabsTrigger className="hidden md:block" value="set">
              Rango de fechas
            </TabsTrigger>
            <CalendarDateRangePicker className="hidden md:block" />
          </TabsList>
          <TabMain />
          <TabMonth />
          <TabWeek />
          <TabDay />
          <TabSet searchParams={searchParams} />
        </Tabs>
      </div>
    </PageContainer>
  );
}
