'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';

import React from 'react';
import { CircleGraph } from '@/components/charts/circle-graph';
import { LateralGraph } from '@/components/charts/lateral-graph';
import { BarGraph } from '@/components/charts/bar-graph';
import { LinearChart } from '@/components/charts/linear-chart';
import { useFetchData } from '@/hooks/useFetchMain';

export default function TabMain() {
  const { data: dataRec, loading, error } = useFetchData('dashboard');

  // Validar si dataRec existe y tiene datos antes de acceder a sus propiedades
  const claimReasonData = dataRec?.claimReasons || [];
  const solutionData = dataRec?.solutionDistribution || [];
  const claimsTrend = dataRec?.claimsTrend || [];
  const averageResolutionTime =
    dataRec?.averageResolutionTime?.[0]?.averageResolutionTimeHours || 0;

  const hours = Math.floor(averageResolutionTime);
  const minutes = Math.floor((averageResolutionTime - hours) * 60);

  return (
    <TabsContent value="overview" className="space-y-4">
      {!loading && dataRec ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Reclamos Pendientes
                </CardTitle>
                {/* Icono SVG */}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dataRec.pendingComplaints || 'No data'}
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
                {/* Icono SVG */}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dataRec.resolvedComplaints || 'No data'}
                </div>
                <p className="text-xs text-muted-foreground">Comparativas</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  T. Respuesta
                </CardTitle>
                {/* Icono SVG */}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {`${hours} hrs ${minutes} min `}
                </div>
                <p className="text-xs text-muted-foreground">Horas</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Gastos en envíos
                </CardTitle>
                {/* Icono SVG */}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  $
                  {dataRec.economicImpact?.totalClaimCost?.[0]?.claimCost ||
                    'No data'}
                </div>
                <p className="text-xs text-muted-foreground">$ Pesos</p>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos */}
          {dataRec.economicImpact && (
            <>
              <div className="grid grid-cols-4 gap-4 md:grid-rows-2">
                <div className="col-span-4 md:col-span-2 md:row-span-3">
                  <CircleGraph
                    data={claimReasonData}
                    description="Número de reclamos totales separados por tipo"
                    title="Reclamos totales por tipo"
                    range="Entre tal y tal fecha"
                  />
                </div>
                <div className="col-span-4 md:col-span-2 md:row-span-3">
                  <LateralGraph
                    claimedProducts={dataRec.topClaimedProducts || []}
                    title="Productos reclamados"
                    range="Entre tales fechas"
                    description="Productos más reclamados con nombres"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 md:grid-rows-2">
                <div className="col-span-4 md:col-span-4 md:row-span-3">
                  <BarGraph
                    data={solutionData}
                    description="Número de reclamos totales separados por tipo"
                    title="Reclamos totales por tipo"
                    range="Entre tal y tal fecha"
                  />
                </div>
                <div className="col-span-4 md:col-span-2 md:row-span-3">
                  <LinearChart data={claimsTrend} />
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <p>Cargando datos...</p>
      )}
    </TabsContent>
  );
}
