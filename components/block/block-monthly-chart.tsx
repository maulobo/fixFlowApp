'use client';

import {
  Bar,
  BarChart,
  Label,
  Rectangle,
  ReferenceLine,
  XAxis
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { BASE_URL } from '@/constants/data';

interface TrendItem {
  month: number; // Cambiado a number para ajustar el formato recibido
  year: number;
  categories: { count: number }[];
}

interface FormattedDataItem {
  month: string; // Usaremos nombres de meses
  complaints: number;
}

// Función para convertir número de mes a nombre de mes
const monthNames = [
  'En',
  'Feb',
  'Mar',
  'Ab',
  'May',
  'Ju',
  'Jul',
  'Ago',
  'Sept',
  'Oct',
  'Nov',
  'Dic'
];

export default function BlockMonthlyChart() {
  const [data, setData] = useState<FormattedDataItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${BASE_URL}/complaints`);
        const result = await response.json();
        console.log(result);

        if (result?.trend && Array.isArray(result.trend)) {
          // Formatear los datos
          const formattedData: FormattedDataItem[] = result.trend.map(
            (item: TrendItem) => ({
              month: monthNames[item.month - 1], // Convertir el número de mes a nombre
              complaints: item.categories.reduce(
                (sum, cat) => sum + cat.count,
                0
              ) // Sumar quejas por categoría
            })
          );

          // Generar todos los meses con quejas iniciales de 0
          const completeData: FormattedDataItem[] = monthNames.map(
            (monthName) => {
              const monthData = formattedData.find(
                (item) => item.month === monthName
              );
              return {
                month: monthName,
                complaints: monthData ? monthData.complaints : 0
              };
            }
          );

          setData(completeData);
        } else {
          console.error('Unexpected result structure:', result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  // Cálculo del promedio de quejas
  const totalComplaints = data.reduce((sum, item) => sum + item.complaints, 0);
  const averageComplaints = data.length > 0 ? totalComplaints / data.length : 0;

  return (
    <Card className="w-full">
      <CardHeader className="space-y-0 pb-2">
        <CardDescription>This Month</CardDescription>
        <CardTitle className="text-4xl tabular-nums">
          {totalComplaints}{' '}
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            complaints
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            complaints: {
              label: 'Complaints',
              color: 'hsl(var(--chart-1))'
            }
          }}
        >
          <BarChart
            accessibilityLayer
            margin={{
              left: -4,
              right: -4
            }}
            data={data}
          >
            <Bar
              dataKey="complaints"
              fill="var(--color-complaints)"
              radius={5}
              fillOpacity={0.6}
              activeBar={<Rectangle fillOpacity={0.8} />}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              interval={0}
            />
            <ChartTooltip
              defaultIndex={2}
              content={
                <ChartTooltipContent
                  hideIndicator
                  animationEasing="ease"
                  labelFormatter={(value) => value}
                />
              }
              cursor={false}
            />
            <ReferenceLine
              y={averageComplaints}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                position="insideBottomLeft"
                value="Average Complaints"
                offset={10}
                fill="hsl(var(--foreground))"
              />
              <Label
                position="insideTopLeft"
                value={averageComplaints}
                className="text-lg"
                fill="hsl(var(--foreground))"
                offset={10}
                startOffset={100}
              />
            </ReferenceLine>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <CardDescription>
          Over the past months, you have received{' '}
          <span className="font-medium text-foreground">{totalComplaints}</span>{' '}
          complaints.
        </CardDescription>
        <CardDescription>
          The average monthly complaints are{' '}
          <span className="font-medium text-foreground">
            {averageComplaints}
          </span>
          .
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
