import BlockArea from '@/components/block/block-area';
import ClaimReason from '@/components/block/block-claim-reason';
import BlockThreeCircle from '@/components/block/block-three-circle';
import { BarGraph } from '@/components/charts/bar-graph';
import { CircleGraph } from '@/components/charts/circle-graph';
import { LateralGraph } from '@/components/charts/lateral-graph';
import { LineDots } from '@/components/charts/line-dots-graph';
import { LinearChart } from '@/components/charts/linear-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { fetchData } from '@/lib/actions';
import { DataStructure } from '@/types/types-dashboard';
import React from 'react';

export default async function TabDay() {
  const date = new Date(); // Fecha y hora actual
  const endDate = new Date(date); // Copia la fecha actual para el endDate
  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);

  const data: DataStructure = await fetchData(
    `dashboard/daily?startDate=${startDate}&endDate=${endDate}`
  );

  const averageResolutionTime =
    data.averageResolutionTime[0].averageResolutionTimeHours;
  const hours = Math.floor(averageResolutionTime);
  const minutes = Math.floor((averageResolutionTime - hours) * 60);

  return (
    <TabsContent value="overview" className="space-y-4">
      {/* primeras 4 cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Reclamos Pendientes
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.recentComplaints ? data.pendingComplaints : 'No data'}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Reclamos Resueltos
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.recentComplaints ? data.resolvedComplaints : 'No data'}
            </div>
            <p className="text-xs text-muted-foreground">Comparativas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">T. Respuesta</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.recentComplaints
                ? `${hours} hrs ${minutes} min `
                : 'No data'}
            </div>
            <p className="text-xs text-muted-foreground">Horas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gastos en envios
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {data.economicImpact
                ? data.economicImpact.totalClaimCost[0].claimCost
                : 'No data'}
            </div>
            <p className="text-xs text-muted-foreground">$ Pesos</p>
          </CardContent>
        </Card>
      </div>
      {/* motivo del error y three circle */}
      <div className="grid grid-cols-4 gap-4 md:grid-rows-2">
        <div className="col-span-4 md:col-span-2 md:row-span-3">
          {/* <ClaimReason claimReasonData={claimReasonData} /> */}
          <CircleGraph
            data={data.claimReasons}
            description="Nunmero de reclamos totales separados por tipo"
            title="Reclamos totales por tipo"
            range="Entre tal y tal fecha"
          />
        </div>
        <div className="col-span-4 md:col-span-2 md:row-span-3">
          <LateralGraph
            claimedProducts={data.topClaimedProducts}
            title="Productos reclamados"
            range="Entre tales fechas"
            description="Productos mas reclamados con nombres"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 md:grid-rows-2">
        <div className="col-span-4 md:col-span-4 md:row-span-3">
          <BarGraph
            data={data.solutionDistribution}
            description="Nunmero de reclamos totales separados por tipo"
            title="Reclamos totales por tipo"
            range="Entre tal y tal fecha"
          />
        </div>
        <div className="col-span-4 md:col-span-2 md:row-span-3">
          <LinearChart data={data.claimsTrend} />
        </div>
      </div>
    </TabsContent>
  );
}
