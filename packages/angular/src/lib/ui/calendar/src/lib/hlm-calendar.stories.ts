import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { calendarContract } from '@surfnet/curve-contracts';

import { HlmButtonImports } from '../../../button/src';
import { HlmPopoverImports } from '../../../popover/src';

import { HlmCalendar, HlmCalendarImports } from '..';

const meta: Meta<HlmCalendar<Date>> = {
  title: 'Components/Calendar',
  component: HlmCalendar,
  decorators: [
    moduleMetadata({
      imports: [HlmCalendarImports, HlmButtonImports, HlmPopoverImports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: calendarContract.docs.description,
      },
    },
  },
  argTypes: {
    captionLayout: {
      control: 'select',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
      description: 'How the month/year caption is rendered — a plain label or dropdown selectors.',
      table: {
        defaultValue: { summary: 'label' },
      },
    },
  },
  args: {
    captionLayout: 'label',
  },
};

export default meta;
type Story = StoryObj<HlmCalendar<Date>>;

/** A single-date calendar bound to the `date` two-way model — tweak the caption control. */
export const Default: Story = {
  render: (args) => ({
    props: { ...args, date: new Date() },
    template: `<hlm-calendar ${argsToTemplate(args)} [(date)]="date" />`,
  }),
};

/** Multiple, individually toggled dates via `hlm-calendar-multi`. */
export const Multiple: Story = {
  render: () => ({
    props: { dates: [] as Date[] },
    template: `<hlm-calendar-multi [(date)]="dates" />`,
  }),
};

/** A contiguous range with a start and end date via `hlm-calendar-range`. */
export const Range: Story = {
  render: () => ({
    props: { start: undefined as Date | undefined, end: undefined as Date | undefined },
    template: `<hlm-calendar-range [(startDate)]="start" [(endDate)]="end" />`,
  }),
};

/** Dropdown month/year selectors instead of a static caption — useful for jumping across years. */
export const DropdownCaption: Story = {
  render: () => ({
    props: { date: new Date() },
    template: `<hlm-calendar captionLayout="dropdown" [(date)]="date" />`,
  }),
};

/** Weekends disabled via `dateDisabled` — disabled days cannot be selected. */
export const DisabledDates: Story = {
  render: () => ({
    props: {
      date: undefined as Date | undefined,
      isWeekend: (d: Date) => d.getDay() === 0 || d.getDay() === 6,
    },
    template: `<hlm-calendar [(date)]="date" [dateDisabled]="isWeekend" />`,
  }),
};

/** Highlighted dates alongside a bounded `min`/`max` navigable range. */
export const HighlightedAndBounded: Story = {
  render: () => {
    const today = new Date();
    const highlight = new Date(today);
    highlight.setDate(today.getDate() + 3);
    const min = new Date(today);
    min.setDate(today.getDate() - 7);
    const max = new Date(today);
    max.setDate(today.getDate() + 14);

    return {
      props: {
        date: undefined as Date | undefined,
        highlights: [highlight],
        min,
        max,
      },
      template: `<hlm-calendar [(date)]="date" [highlightDays]="highlights" [min]="min" [max]="max" />`,
    };
  },
};

/**
 * Composed inside a Popover trigger — the same pattern the `HlmDatePicker` component
 * uses internally, built here directly from `hlm-calendar` and the popover primitives.
 */
export const InPopover: Story = {
  render: () => ({
    props: { date: undefined as Date | undefined },
    template: `
      <hlm-popover>
        <button hlmBtn hlmPopoverTrigger variant="outline" class="w-56 justify-start font-normal">
          {{ date ? date.toLocaleDateString() : 'Pick a date' }}
        </button>
        <hlm-popover-content class="w-fit p-0" *hlmPopoverPortal>
          <hlm-calendar calendarClass="rounded-none border-0" [(date)]="date" />
        </hlm-popover-content>
      </hlm-popover>
    `,
  }),
};
