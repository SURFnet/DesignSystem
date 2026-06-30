import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  getTokenGroups,
  getTokenValue,
  getTypographyScale,
  type TokenEntry,
  type TokenGroupWithTokens,
} from '@surfnet/storybook-config';
import { createContext, useContext } from 'react';
import { useGlobals } from 'storybook/preview-api';

// A small checkerboard so translucent colours read correctly against it.
const checker: React.CSSProperties = {
  backgroundImage: 'repeating-conic-gradient(#cbd5e1 0% 25%, #ffffff 0% 50%)',
  backgroundSize: '12px 12px',
};

// The selected theme/mode is read once at the story level (where `useGlobals` is
// valid) and handed down via context. Token values come straight from the
// `@surfnet/tokens` map, so no DOM reads are needed; the swatch visuals still use
// `var(--token)` to reflect the live painted theme.
const ThemeContext = createContext<{ theme: string; mode: string }>({
  theme: 'default',
  mode: 'light',
});

function useTokenValue(name: string): string {
  const { theme, mode } = useContext(ThemeContext);
  return getTokenValue(theme, mode, name);
}

function ColorSwatch({ name, cssVar }: TokenEntry) {
  const value = useTokenValue(name);
  return (
    <div className="flex items-center gap-3">
      <div
        className="size-10 shrink-0 overflow-hidden rounded-md border border-border"
        style={checker}
      >
        <div className="size-full" style={{ backgroundColor: cssVar }} />
      </div>
      <div className="min-w-0">
        <div className="truncate font-mono text-sm">{name}</div>
        <div className="truncate font-mono text-xs text-muted-foreground">{value || '—'}</div>
      </div>
    </div>
  );
}

function RadiusSwatch({ name, cssVar }: TokenEntry) {
  const value = useTokenValue(name);
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="size-16 border-2 border-primary bg-muted" style={{ borderRadius: cssVar }} />
      <div className="font-mono text-xs">{name}</div>
      <div className="font-mono text-xs text-muted-foreground">{value}</div>
    </div>
  );
}

function RawRow({ name }: TokenEntry) {
  const value = useTokenValue(name);
  return (
    <div className="flex items-center justify-between gap-6 border-b border-border py-1.5 last:border-b-0">
      <span className="font-mono text-sm">{name}</span>
      <span className="shrink-0 font-mono text-xs text-muted-foreground">{value || '—'}</span>
    </div>
  );
}

function FontFamilyRow({ name, cssVar }: TokenEntry) {
  const value = useTokenValue(name);
  return (
    <div className="border-b border-border py-3 last:border-b-0">
      <div className="flex items-baseline justify-between gap-6">
        <span className="font-mono text-sm">{name}</span>
        <span className="shrink-0 font-mono text-xs text-muted-foreground">{value}</span>
      </div>
      <p className="mt-1 text-xl" style={{ fontFamily: cssVar }}>
        The quick brown fox jumps over the lazy dog
      </p>
    </div>
  );
}

function FontWeightRow({ name, cssVar }: TokenEntry) {
  const value = useTokenValue(name);
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-border py-2 last:border-b-0">
      <span className="text-lg" style={{ fontWeight: cssVar }}>
        {name.replace('font-weight-', '')}
      </span>
      <span className="shrink-0 font-mono text-xs text-muted-foreground">{value}</span>
    </div>
  );
}

function TypeScale() {
  const scale = getTypographyScale();
  return (
    <div>
      {scale.map(({ id, fontSizeName, lineHeightName }) => (
        <TypeRow key={id} id={id} fontSizeName={fontSizeName} lineHeightName={lineHeightName} />
      ))}
    </div>
  );
}

function TypeRow({
  id,
  fontSizeName,
  lineHeightName,
}: {
  id: string;
  fontSizeName: string;
  lineHeightName: string;
}) {
  const fontSize = useTokenValue(fontSizeName);
  const lineHeight = useTokenValue(lineHeightName);
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-border py-3 last:border-b-0">
      <span
        className="truncate"
        style={{ fontSize: `var(--${fontSizeName})`, lineHeight: `var(--${lineHeightName})` }}
      >
        {id} — Almost before we knew it
      </span>
      <span className="shrink-0 font-mono text-xs text-muted-foreground">
        {fontSize} / {lineHeight}
      </span>
    </div>
  );
}

function GroupBody({ group, tokens }: TokenGroupWithTokens) {
  switch (group.kind) {
    case 'color':
      return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tokens.map((t) => (
            <ColorSwatch key={t.name} {...t} />
          ))}
        </div>
      );
    case 'radius':
      return (
        <div className="flex flex-wrap gap-6">
          {tokens.map((t) => (
            <RadiusSwatch key={t.name} {...t} />
          ))}
        </div>
      );
    case 'font-family':
      return (
        <div>
          {tokens.map((t) => (
            <FontFamilyRow key={t.name} {...t} />
          ))}
        </div>
      );
    case 'font-weight':
      return (
        <div>
          {tokens.map((t) => (
            <FontWeightRow key={t.name} {...t} />
          ))}
        </div>
      );
    case 'font-size':
      return <TypeScale />;
    case 'raw':
    default:
      return (
        <div>
          {tokens.map((t) => (
            <RawRow key={t.name} {...t} />
          ))}
        </div>
      );
  }
}

function GroupSection(entry: TokenGroupWithTokens) {
  return (
    <section className="mb-12">
      <h3 className="text-lg font-semibold text-foreground">{entry.group.title}</h3>
      <p className="mb-5 max-w-prose text-sm text-muted-foreground">{entry.group.description}</p>
      <GroupBody {...entry} />
    </section>
  );
}

/** Render the named groups, in the order given, for the selected theme/mode. */
function Sections({ ids }: { ids: string[] }) {
  const byId = new Map(getTokenGroups().map((g) => [g.group.id, g]));
  return (
    <div className="max-w-5xl text-foreground">
      {ids
        .map((id) => byId.get(id))
        .filter((g): g is TokenGroupWithTokens => Boolean(g))
        .map((g) => (
          <GroupSection key={g.group.id} {...g} />
        ))}
    </div>
  );
}

/** Reads the toolbar globals (valid in a decorator) and feeds them to the swatches. */
function withThemeContext(Story: () => React.ReactElement) {
  const [{ theme, mode }] = useGlobals();
  return (
    <ThemeContext.Provider value={{ theme: theme ?? 'default', mode: mode ?? 'light' }}>
      <Story />
    </ThemeContext.Provider>
  );
}

const meta = {
  title: 'Foundations/Design Tokens',
  decorators: [withThemeContext],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The design tokens shipped by `@surfnet/tokens`. Use the **Theme** and **Mode** ' +
          'toolbar selectors to see each token’s resolved value in any theme or in light / dark mode.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/** Semantic, chart, sidebar, alpha and internal colour tokens. */
export const Colors: Story = {
  render: () => <Sections ids={['semantic', 'chart', 'sidebar', 'alpha', 'custom']} />,
};

/** The type scale, font families and font weights. */
export const Typography: Story = {
  render: () => <Sections ids={['typography', 'font-family', 'font-weight']} />,
};

/** Corner radii, container widths and breakpoints. */
export const RadiusAndSpacing: Story = {
  render: () => <Sections ids={['radius', 'container', 'breakpoint']} />,
};

/** Shadow primitives and blur radii. */
export const ShadowsAndEffects: Story = {
  render: () => <Sections ids={['shadow', 'blur']} />,
};
