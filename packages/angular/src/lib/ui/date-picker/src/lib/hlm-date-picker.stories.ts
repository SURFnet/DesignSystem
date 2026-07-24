import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { datePickerContract } from '@surfnet/curve-contracts';

import { HlmButtonImports } from '../../../button/src';
import { HlmDatePicker, HlmDatePickerImports } from '..';

const meta: Meta<HlmDatePicker<Date>> = {
  title: 'Components/DatePicker',
  component: HlmDatePicker,
  decorators: [
    moduleMetadata({
      imports: [HlmDatePickerImports, HlmButtonImports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: datePickerContract.docs.description,
      },
    },
  },
  argTypes: {
    captionLayout: {
      control: 'select',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
      description: 'How the month/year caption is rendered in the calendar popover.',
      table: {
        defaultValue: { summary: 'label' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Determine if the date picker is disabled.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    autoCloseOnSelect: {
      control: 'boolean',
      description: 'If true, the date picker closes automatically once a date is selected.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    captionLayout: 'label',
    disabled: false,
    autoCloseOnSelect: false,
  },
};

export default meta;
type Story = StoryObj<HlmDatePicker<Date>>;

/** A single-date picker with a button trigger — tweak the caption, disabled and auto-close controls. */
export const Default: Story = {
  render: (args) => ({
    props: { ...args, date: undefined as Date | undefined },
    template: `
      <hlm-date-picker ${argsToTemplate(args)} [(date)]="date">
        <hlm-date-picker-trigger>Pick a date</hlm-date-picker-trigger>
      </hlm-date-picker>
    `,
  }),
};

/** Pre-filled with a selected date. */
export const WithValue: Story = {
  render: () => ({
    props: { date: new Date() as Date | undefined },
    template: `
      <hlm-date-picker [(date)]="date">
        <hlm-date-picker-trigger>Pick a date</hlm-date-picker-trigger>
      </hlm-date-picker>
    `,
  }),
};

/**
 * A text-input trigger instead of a button — type a date directly or use the
 * calendar/clear buttons. Built from `hlm-date-picker-input`.
 */
export const TextInputTrigger: Story = {
  render: () => ({
    props: { date: undefined as Date | undefined },
    template: `
      <div class="w-64">
        <hlm-date-picker [(date)]="date">
          <hlm-date-picker-input placeholder="Pick a date" />
        </hlm-date-picker>
      </div>
    `,
  }),
};

/** A contiguous range with a start and end date via `hlm-date-range-picker`. */
export const Range: Story = {
  render: () => ({
    props: { range: undefined as [Date, Date] | undefined },
    template: `
      <hlm-date-range-picker [(date)]="range">
        <hlm-date-picker-trigger class="w-72">Pick a date range</hlm-date-picker-trigger>
      </hlm-date-range-picker>
    `,
  }),
};

/** Multiple, individually toggled dates via `hlm-date-picker-multi`, capped to 3 selections. */
export const Multiple: Story = {
  render: () => ({
    props: { dates: [] as Date[] },
    template: `
      <hlm-date-picker-multi [(date)]="dates" [maxSelection]="3">
        <hlm-date-picker-trigger class="w-72">Pick up to 3 dates</hlm-date-picker-trigger>
      </hlm-date-picker-multi>
    `,
  }),
};

/** Bounded to a navigable `min`/`max` range — days outside it can't be selected. */
export const BoundedDates: Story = {
  render: () => {
    const today = new Date();
    const min = new Date(today);
    min.setDate(today.getDate() - 7);
    const max = new Date(today);
    max.setDate(today.getDate() + 14);

    return {
      props: { date: undefined as Date | undefined, min, max },
      template: `
        <hlm-date-picker [(date)]="date" [min]="min" [max]="max">
          <hlm-date-picker-trigger>Pick a date</hlm-date-picker-trigger>
        </hlm-date-picker>
      `,
    };
  },
};

/** Disabled state — the trigger is inert and the popover cannot be opened. */
export const Disabled: Story = {
  render: () => ({
    template: `
      <hlm-date-picker disabled>
        <hlm-date-picker-trigger>Pick a date</hlm-date-picker-trigger>
      </hlm-date-picker>
    `,
  }),
};

/**
 * Custom footer content projected via `[hlmDatePickerFooter]`, e.g. quick
 * actions to jump to today or clear the selection.
 */
export const WithFooterActions: Story = {
  render: () => ({
    props: { date: new Date() as Date | undefined, today: new Date() },
    template: `
      <hlm-date-picker [(date)]="date">
        <hlm-date-picker-trigger>Pick a date</hlm-date-picker-trigger>
        <div hlmDatePickerFooter class="flex justify-end gap-2 border-t p-2">
          <button hlmBtn size="sm" variant="ghost" (click)="date = undefined">Clear</button>
          <button hlmBtn size="sm" (click)="date = today">Today</button>
        </div>
      </hlm-date-picker>
    `,
  }),
};
