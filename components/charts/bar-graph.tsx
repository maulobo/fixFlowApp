'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from 'recharts';
import { Tooltip } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { browser } from 'process';

type BarGraphProps = {
  data: Data[];
  title: string;
  range: string;
  description: string;
};

export interface Data {
  _id: string;
  count: number;
  percentaje?: number;
}
const availableColors = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--chart-6))',
  'hsl(var(--chart-7))',
  'hsl(var(--chart-8))'
];

const chartConfig = {
  cantidad: {
    label: 'Cantidad'
  }
};

export function BarGraph({ data, description, title, range }: BarGraphProps) {
  const generatedColorMap: {
    [key: string]: { label: string; color: string };
  } = {};
  data.forEach((item, index) => {
    generatedColorMap[item._id] = {
      color: `hsl(var(--chart-${(index % availableColors.length) + 1}))`,
      label: item._id
    };
  });

  const chartData = data.reduce((acc: any[], item, index) => {
    const normalizedId = item._id?.trim().toLowerCase() || 'sin solucion';

    const existingIndex = acc.findIndex(
      (entry) => entry.name.toLowerCase() === normalizedId
    );

    if (existingIndex >= 0) {
      // Si ya existe el nombre, sumamos la cantidad
      acc[existingIndex].cantidad += item.count;
    } else {
      // Si no existe, agregamos un nuevo objeto con sus propiedades
      acc.push({
        name: item._id?.trim() || 'Sin Solución',
        cantidad: item.count,
        fill: availableColors[index % availableColors.length]
      });
    }

    return acc;
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{range}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            className="h-40 w-screen"
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Tooltip content={<ChartTooltipContent />} cursor={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="cantidad"
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
