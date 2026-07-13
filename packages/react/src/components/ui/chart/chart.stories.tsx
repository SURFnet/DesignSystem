import { DesktopIcon, DeviceMobileIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { chartContract } from '@surfnet/curve-contracts';
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from './chart';

const monthlyData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const deviceConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

const formatMonth = (value: string) => value.slice(0, 3);

const meta = {
  title: 'Components/Chart',
  component: ChartContainer,
  parameters: {
    docs: {
      description: {
        component: chartContract.docs.description,
      },
    },
  },
  // `config` and `children` have no sensible generic defaults (every story composes its own
  // Recharts tree), so every story below supplies its own `render` and ignores these args —
  // they only exist to satisfy `ChartContainer`'s required props for the story type.
  args: {
    config: deviceConfig,
    children: (
      <BarChart data={monthlyData}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    ),
  },
} satisfies Meta<typeof ChartContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * A bar chart composed from `ChartContainer`, `ChartTooltip`, and `ChartLegend` — the
 * component's primary, realistic usage. Colors come from the `config` map, which
 * `ChartContainer` turns into `--color-*` CSS variables scoped to the chart.
 */
export const Default: Story = {
  render: () => (
    <ChartContainer config={deviceConfig} className="w-full max-w-xl">
      <BarChart data={monthlyData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={formatMonth}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
};

/** A line chart, showing the same primitives compose with a different Recharts chart type. */
export const LineChartExample: Story = {
  render: () => (
    <ChartContainer config={deviceConfig} className="w-full max-w-xl">
      <LineChart data={monthlyData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={formatMonth}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line dataKey="desktop" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        <Line dataKey="mobile" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  ),
};

/**
 * `ChartLegendContent` falls back to a Phosphor icon per series instead of a color swatch
 * when the matching `config` entry declares one.
 */
export const WithIconLegend: Story = {
  render: () => {
    const config = {
      desktop: { label: 'Desktop', icon: DesktopIcon, color: 'var(--chart-1)' },
      mobile: { label: 'Mobile', icon: DeviceMobileIcon, color: 'var(--chart-2)' },
    } satisfies ChartConfig;

    return (
      <ChartContainer config={config} className="w-full max-w-xl">
        <BarChart data={monthlyData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={formatMonth}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    );
  },
};

/**
 * `ChartTooltipContent`'s `indicator` prop swaps the swatch next to each series in the
 * hover tooltip. Hover each chart to compare `dot` (default), `line`, and `dashed`.
 */
export const TooltipIndicators: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {(['dot', 'line', 'dashed'] as const).map((indicator) => (
        <div key={indicator} className="flex flex-col gap-2">
          <span className="text-sm font-medium capitalize">{indicator}</span>
          <ChartContainer config={deviceConfig} className="w-64">
            <BarChart data={monthlyData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={formatMonth}
              />
              <ChartTooltip content={<ChartTooltipContent indicator={indicator} />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      ))}
    </div>
  ),
};
