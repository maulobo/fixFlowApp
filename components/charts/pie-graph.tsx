'use client';

import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';
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
import { useEffect, useMemo, useState } from 'react';

interface ChartDataType {
  browser: string;
  visitors: number;
  fill: string;
}

const colors: { [key: string]: string } = {
  led: 'var(--color-chrome)',
  pared: 'var(--color-safari)',
  techo: 'green',
  other: 'var(--color-other)'
};

const chartConfig: ChartConfig = {
  visitors: {
    label: 'Visitors'
  },
  led: {
    label: 'led',
    color: 'hsl(var(--chart-1))'
  },
  pared: {
    label: 'Pared',
    color: 'hsl(var(--chart-2))'
  },
  techo: {
    label: 'Techo',
    color: 'hsl(var(--chart-3))'
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))'
  }
};

export function PieGraph() {
  const [data, setData] = useState<ChartDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      let baseUrl = 'http://localhost:5001';
      try {
        const response = await fetch(`${baseUrl}/chart-data`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();

        const updatedData: ChartDataType[] = Object.keys(result).map((key) => ({
          browser: key,
          visitors: result[key],
          fill: colors[key] || colors.other
        }));

        setData(updatedData);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalVisitors = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Products
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
