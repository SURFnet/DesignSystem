import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { comboboxContract } from '@surfnet/curve-contracts';

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
  useComboboxAnchor,
} from './combobox';

const countries = [
  'Belgium',
  'Denmark',
  'Finland',
  'France',
  'Germany',
  'Iceland',
  'Netherlands',
  'Norway',
  'Sweden',
  'United Kingdom',
];

const frameworkGroups = [
  { value: 'Frontend', items: ['React', 'Angular', 'Vue', 'Svelte'] },
  { value: 'Backend', items: ['Express', 'NestJS', 'Django', 'Rails'] },
];

const languages = ['TypeScript', 'JavaScript', 'Python', 'Rust', 'Go'];

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    docs: {
      description: {
        component: comboboxContract.docs.description,
      },
    },
  },
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A searchable, filterable select — type to filter, with a trigger and clear button. */
export const Default: Story = {
  render: () => (
    <Combobox items={countries}>
      <ComboboxInput placeholder="Search a country…" showClear className="w-64" />
      <ComboboxContent>
        <ComboboxEmpty>No countries found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

/** Options organized into labelled, independently-filtered groups. */
export const Grouped: Story = {
  render: () => (
    <Combobox items={frameworkGroups}>
      <ComboboxInput placeholder="Search a framework…" className="w-64" />
      <ComboboxContent>
        <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
        <ComboboxList>
          {(group: (typeof frameworkGroups)[number], index: number) => (
            <React.Fragment key={group.value}>
              {index > 0 && <ComboboxSeparator />}
              <ComboboxGroup items={group.items}>
                <ComboboxLabel>{group.value}</ComboboxLabel>
                <ComboboxCollection>
                  {(item: string) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxGroup>
            </React.Fragment>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

/** Multi-select with removable chips, anchored to the chips row instead of the input. */
export const Multiple: Story = {
  render: function MultipleCombobox() {
    const anchor = useComboboxAnchor();
    return (
      <Combobox items={languages} multiple defaultValue={['TypeScript']}>
        <div ref={anchor}>
          <ComboboxChips>
            <ComboboxValue>
              {(value: string[]) => (
                <>
                  {value.map((language) => (
                    <ComboboxChip key={language}>{language}</ComboboxChip>
                  ))}
                  <ComboboxChipsInput placeholder="Add a language…" />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
        </div>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No languages found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    );
  },
};

/** Disabled state — the input, trigger, and clear button all ignore interaction. */
export const Disabled: Story = {
  render: () => (
    <Combobox items={countries} defaultValue="Netherlands" disabled>
      <ComboboxInput placeholder="Search a country…" showClear className="w-64" />
      <ComboboxContent>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};
