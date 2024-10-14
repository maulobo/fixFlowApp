import { auth } from '@/auth';
import authConfig from '@/auth.config';
import BlockArea from '@/components/block/block-area';
import ClaimReason from '@/components/block/block-claim-reason';
import BlockMonthlyChart from '@/components/block/block-monthly-chart';
import BlockThreeCircle from '@/components/block/block-three-circle';
import { LineDots } from '@/components/charts/line-dots-graph';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchData } from '@/lib/fetchData';
import TabMonth from './reclamos/components/tabs/tab-month';
import TabWeek from './reclamos/components/tabs/tab-week';
import TabDay from './reclamos/components/tabs/tab-day';
import TabSet from './reclamos/components/tabs/tab-set';

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
            Bienvenido de vuelta {`${session?.user?.name}`}👋
          </h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="">
            <TabsTrigger value="overview">Mes</TabsTrigger>
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="day">Dia</TabsTrigger>
            <TabsTrigger className="hidden md:block" value="set">
              Rango de fechas
            </TabsTrigger>
            <CalendarDateRangePicker className="hidden md:block" />
          </TabsList>
          <TabSet searchParams={searchParams} />
          <TabMonth />
          <TabWeek />
          <TabDay />
        </Tabs>
      </div>
    </PageContainer>
  );
}
