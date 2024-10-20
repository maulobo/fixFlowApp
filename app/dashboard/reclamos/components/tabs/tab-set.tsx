import BlockArea from '@/components/block/block-area';
import ClaimReason from '@/components/block/block-claim-reason';
import BlockThreeCircle from '@/components/block/block-three-circle';
import { LineDots } from '@/components/charts/line-dots-graph';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { fetchData } from '@/lib/fetchData';
import React from 'react';

interface Props {
  searchParams: { startDate?: string; endDate?: string };
}

export default async function TabSet({ searchParams }: Props) {
  const { startDate, endDate } = searchParams;

  const data = await fetchData(
    `dashboard-data/?startDate=${startDate}&endDate=${endDate}`
  );

  return (
    <TabsContent value="set" className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Reclamos Diarios
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
              {data.recentComplaints ? data.recentComplaints.length : 'No data'}
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
              {data.recentComplaints
                ? data.resolvedComplaints.length
                : 'No data'}
            </div>
            <p className="text-xs text-muted-foreground">comparativas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Errores Humanos
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
              {data.recentComplaints ? data.humanErrors : 'No data'}
            </div>
            <p className="text-xs text-muted-foreground">+21,4%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tiempo promedio de respuesta
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
              {data.recentComplaints
                ? (data.avgResolutionTime / 3600000).toFixed(2)
                : 'No data'}
            </div>
            <p className="text-xs text-muted-foreground">Horas</p>
          </CardContent>
        </Card>
      </div>
      {/* motivo del error y three circle */}
      <div className="grid grid-cols-4 gap-4 md:grid-rows-4">
        <div className="col-span-4 md:col-span-3 md:row-span-4">
          <ClaimReason />
        </div>
        <div className="col-span-4 md:col-span-1 md:row-span-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
              <div className="text-2xl font-bold">Costos de errores</div>
              <p className="text-xs text-muted-foreground">$ en pesos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Gastos en errores
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
                {data.recentComplaints
                  ? data.costsAndLosses.totalErrorCost
                  : 'No data'}
              </div>
              <p className="text-xs text-muted-foreground">Pesos</p>
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
                {data.recentComplaints
                  ? data.costsAndLosses.totalShippingsCost
                  : 'No data'}
              </div>
              <p className="text-xs text-muted-foreground">Pesos</p>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* grafico month y 3 cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-4">
        <div className="col-span-4 grid grid-cols-1 gap-4 md:col-span-4 md:row-span-1 md:grid-cols-2">
          {/* <BlockMonthlyChart /> */}
          <LineDots />
          <div>
            <BlockThreeCircle />
            <BlockArea />
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
