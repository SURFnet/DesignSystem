import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  MICROCOPY_KINDS,
  getMicrocopyGroups,
  splitInlineCode,
  type MicrocopyRow,
} from '@surfnet/curve-storybook-config/microcopy';

import { DatePicker } from '@/components/ui/date-picker';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { CurveMicrocopyProvider, type MicrocopyLocale } from '@/lib/microcopy';

function Inline({ text }: { text: string }) {
  return (
    <>
      {splitInlineCode(text).map((part, index) =>
        part.code ? (
          <code key={index} className="font-mono text-xs">
            {part.text}
          </code>
        ) : (
          part.text
        ),
      )}
    </>
  );
}

const cell: React.CSSProperties = {
  padding: '0.5rem 0.75rem 0.5rem 0',
  verticalAlign: 'top',
  textAlign: 'left',
};

function Row({ row }: { row: MicrocopyRow }) {
  return (
    <tr className="border-b border-border">
      <td style={cell}>
        <div className="font-mono text-sm">{row.key}</div>
        <div className="text-xs text-muted-foreground">
          {MICROCOPY_KINDS[row.kind]}
          {row.example ? ' · example of a format' : ''}
        </div>
      </td>
      <td style={cell} className="text-sm">
        <Inline text={row.description} />
      </td>
      <td style={cell} className="text-sm" lang="en">
        “{row.en}”
      </td>
      <td style={cell} className="text-sm" lang="nl">
        “{row.nl}”
      </td>
      <td style={cell} className="text-xs">
        {row.react ? (
          <>
            <code className="font-mono">{row.react.where}</code>
            <div className="text-muted-foreground">
              {row.react.change ? <Inline text={row.react.change} /> : 'Language only'}
            </div>
          </>
        ) : (
          <span className="text-muted-foreground">Not in React</span>
        )}
      </td>
    </tr>
  );
}

function MicrocopyTable() {
  return (
    <div className="max-w-5xl text-foreground">
      {getMicrocopyGroups().map((group) => (
        <section key={group.component} className="mb-12">
          <h3 className="text-lg font-semibold text-foreground">{group.component}</h3>
          <table className="w-full" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th style={{ ...cell, width: '22%' }}>Key</th>
                <th style={{ ...cell, width: '28%' }}>Beschrijving</th>
                <th style={{ ...cell, width: '16%' }}>English (default)</th>
                <th style={{ ...cell, width: '16%' }}>Nederlands</th>
                <th style={{ ...cell, width: '18%' }}>Waar pas je de tekst aan</th>
              </tr>
            </thead>
            <tbody>
              {group.rows.map((row) => (
                <Row key={row.key} row={row} />
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
}

function Sample({ locale }: { locale: MicrocopyLocale }) {
  return (
    <CurveMicrocopyProvider locale={locale}>
      <section className="flex flex-col gap-4" lang={locale}>
        <h3 className="text-lg font-semibold">{locale === 'en' ? 'English' : 'Nederlands'}</h3>
        <Field optional className="w-72">
          <FieldLabel htmlFor={`name-${locale}`}>Name</FieldLabel>
          <Input id={`name-${locale}`} />
        </Field>
        <DatePicker />
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </CurveMicrocopyProvider>
  );
}

const meta = {
  title: 'Foundations/Microcopy',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Every text Curve’s components show or read out by default, from `@surfnet/curve-microcopy`. ' +
          'English is the default; wrap your app in `<CurveMicrocopyProvider locale="nl">` for Dutch, ' +
          'and pass `messages` to replace single texts. A prop on a component still wins.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/** All texts per component, in English and Dutch, and how to change a single one. */
export const AllTexts: Story = {
  render: () => <MicrocopyTable />,
};

/** The same components with `CurveMicrocopyProvider locale="en"` and `locale="nl"`. */
export const Languages: Story = {
  render: () => (
    <div className="flex flex-wrap gap-10">
      <Sample locale="en" />
      <Sample locale="nl" />
    </div>
  ),
};
