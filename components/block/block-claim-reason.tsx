'use client';

import { useEffect, useState } from 'react';
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import { BASE_URL } from '@/constants/data';
import { useFetchDataMine } from '@/hooks/useFetchMain';
import { useSession } from 'next-auth/react';

interface ClaimReasonData {
  _id: string;
  count: number;
}

const colorMap: { [key: string]: string } = {
  'Error empaquetado': 'hsl(var(--chart-1))',
  Devolucion: 'hsl(var(--chart-6))',
  'Cambio despacho': 'hsl(var(--chart-2))',
  'Error Logistica': 'hsl(var(--chart-3))',
  Otro: 'hsl(var(--chart-4))',
  Garantia: 'hsl(var(--chart-5))',
  'Sin stock': 'hsl(var(--chart-7))',
  Retorno: 'hsl(var(--chart-8))'
};

type Data = {};

export default function ClaimReason() {
  const session = useSession();

  const [data, setData] = useState<ClaimReasonData[]>([]);

  useEffect(() => {
    const asyncRecipt = async () => {
      const result = await useFetchDataMine(session.data?.sessionToken);
      const dataClaim = result.countClaimReason.slice(0, 4);
      setData(dataClaim);
    };
    asyncRecipt();
  }, []);

  return (
    <Card className="">
      <CardContent className="flex  max-h-[300px] gap-4 p-4 pb-2 ">
        <ChartContainer
          config={{
            'Error empaquetado': {
              label: 'Error empaquetado',
              color: 'hsl(var(--color-error-empaquetado))'
            },
            'Cambio despacho': {
              label: 'Cambio despacho',
              color: 'hsl(var(--color-cambio-despacho))'
            },
            'Error Logistica': {
              label: 'Error Logistica',
              color: 'hsl(var(--color-error-logistica))'
            },
            Otro: {
              label: 'Otro',
              color: 'hsl(var(--color-otro))'
            },
            Garantia: {
              label: 'Garantia',
              color: 'hsl(var(--color-garantia))'
            },
            Devolucion: {
              label: 'Garantia',
              color: 'hsl(var(--color-Devolucion))'
            },
            'Sin stock': {
              label: 'Garantia',
              color: 'hsl(var(--color-Sin stock))'
            }
          }}
          className="max-h-[250px] w-full"
        >
          <BarChart
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 10
            }}
            data={data.map((item) => ({
              count: item.count,
              fill: colorMap[item._id] || 'gray'
            }))}
            layout="vertical"
            barSize={32}
            barGap={2}
          >
            <XAxis type="number" dataKey="count" hide />
            <YAxis
              dataKey="claimReason"
              type="category"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
              className="capitalize"
            />
            <Bar dataKey="count" radius={5}>
              <LabelList
                position="insideLeft"
                dataKey="count"
                fill="white"
                offset={8}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-row border-t p-4">
        <div className="flex w-full items-center gap-2">
          {data.map((item) => (
            <div key={item._id} className="grid flex-1 auto-rows-min gap-0.5">
              <div className="text-xs text-muted-foreground">{item._id}</div>
              <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                {item.count}
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
