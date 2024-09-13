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
import { useMemo } from 'react';

interface ProductDataType {
  _id: string;
  count: number;
}

interface MostComplainedProductsProps {
  mostComplainedProducts: ProductDataType[];
}

const colors: { [key: string]: string } = {
  'Tablet Apple iPad Pro': 'var(--color-chrome)',
  'Laptop Dell XPS 13': 'var(--color-safari)',
  'Auriculares Bose QuietComfort 45': 'green',
  'Smartphone Samsung Galaxy S23': 'var(--color-other)'
};

const chartConfig: ChartConfig = {
  visitors: {
    label: 'Visitors'
  },
  'Tablet Apple iPad Pro': {
    label: 'Tablet Apple iPad Pro',
    color: 'hsl(var(--chart-1))'
  },
  'Laptop Dell XPS 13': {
    label: 'Laptop Dell XPS 13',
    color: 'hsl(var(--chart-2))'
  },
  'Auriculares Bose QuietComfort 45': {
    label: 'Auriculares Bose QuietComfort 45',
    color: 'hsl(var(--chart-3))'
  },
  'Smartphone Samsung Galaxy S23': {
    label: 'Smartphone Samsung Galaxy S23',
    color: 'hsl(var(--chart-5))'
  }
};

export function PieGraph({
  mostComplainedProducts
}: MostComplainedProductsProps) {
  const data = useMemo(() => {
    return mostComplainedProducts.map((product) => ({
      category: product._id,
      count: product.count,
      fill: colors[product._id] || colors['Smartphone Samsung Galaxy S23'] // Default to a specific color if not found
    }));
  }, [mostComplainedProducts]);

  const totalProducts = useMemo(() => {
    return mostComplainedProducts.reduce(
      (acc: number, product: ProductDataType) => acc + product.count,
      0
    );
  }, [mostComplainedProducts]);

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
              dataKey="count"
              nameKey="category"
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
                          {totalProducts.toLocaleString()}
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
          Showing total products for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
