'use client';

import { TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis
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
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { TopClaimedProduct } from '@/types/types-dashboard';

type ClaimedProductProps = {
  claimedProducts: TopClaimedProduct[];
  title: string;
  range: string;
  description: string;
};

const chartConfig = {
  cantidad: {
    label: 'Cantidad',
    color: 'hsl(var(--chart-2))'
  },
  label: {
    color: 'hsl(var(--chart-7))'
  }
} satisfies ChartConfig;

export function LateralGraph({
  claimedProducts,
  title,
  range,
  description
}: ClaimedProductProps) {
  const chartData2 = claimedProducts.map((product) => ({
    name: product._id.productName,
    cantidad: product.totalQuantity
  }));

  return (
    <Card className="lex flex-col gap-4">
      <CardHeader className="items-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{range}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 ">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData2}
            layout="vertical"
            margin={{
              right: 16
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="cantidad" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="cantidad"
              layout="vertical"
              fill="var(--color-cantidad)"
              radius={6}
            >
              <LabelList
                dataKey="name"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={10}
              />
              <LabelList
                dataKey="cantidad"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">{description}</div>
      </CardFooter>
    </Card>
  );
}
