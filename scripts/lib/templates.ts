/**
 * File templates for `pnpm new:component`. Each returns a starting point that
 * compiles and passes the conventions check; the TODOs mark what a person still
 * has to fill in.
 */

import { camel, pascal } from './repo';

/** An axis like `variants` → ['default', 'outline']. The first value is the default. */
export type Axes = Record<string, string[]>;

/** `variants` → `Variant`, `mediaVariants` → `MediaVariant`. */
function axisTypePart(axis: string): string {
  const singular = axis.endsWith('s') ? axis.slice(0, -1) : axis;
  return singular.charAt(0).toUpperCase() + singular.slice(1);
}

export function axisTypeName(name: string, axis: string): string {
  return `${pascal(name)}${axisTypePart(axis)}Name`;
}

const q = (s: string) => `'${s.replace(/'/g, "\\'")}'`;
const key = (s: string) => (/^[a-zA-Z_$][\w$]*$/.test(s) ? s : q(s));

// ── Contract ─────────────────────────────────────────────────────────────────

export function contract(name: string, description: string, axes: Axes): string {
  const id = `${camel(name)}Contract`;
  const entries = Object.entries(axes);

  if (entries.length === 0) {
    return `import { defineContract } from './define-contract.js';

export const ${id} = defineContract({
  docs: {
    description: ${q(description)},
  },
});
`;
  }

  const props = entries.map(([axis, values]) => `    ${axis}: [${values.map(q).join(', ')}],`);
  const defaults = entries.map(([axis, values]) => `    ${axis}: ${q(values[0]!)},`);
  const docs = entries.map(
    ([axis, values]) =>
      `    ${axis}: {\n${values.map((v) => `      ${key(v)}: 'TODO: describe for consumers.',`).join('\n')}\n    },`,
  );
  const types = entries.map(
    ([axis]) => `export type ${axisTypeName(name, axis)} = (typeof ${id}.props.${axis})[number];`,
  );

  return `import { defineContract } from './define-contract.js';

export const ${id} = defineContract({
  props: {
${props.join('\n')}
  },
  defaults: {
${defaults.join('\n')}
  },
  docs: {
    description: ${q(description)},
${docs.join('\n')}
  },
});

${types.join('\n')}
`;
}

export function contractExport(name: string, axes: Axes): string {
  const names = [
    `${camel(name)}Contract`,
    ...Object.keys(axes).map((a) => `type ${axisTypeName(name, a)}`),
  ];
  return `export { ${names.join(', ')} } from './${name}.js';`;
}

// ── React ────────────────────────────────────────────────────────────────────

export function reactBarrel(name: string): string {
  return `export * from './${name}';\n`;
}

export function reactModuleCss(name: string): string {
  return `/*
 * ${pascal(name)} styles. Port the Tailwind class strings from ${name}.tsx here,
 * using Curve tokens (var(--primary), calc(var(--spacing, 0.25rem) * 4), ...).
 * See packages/react/docs/css-modules-pilot.md.
 */
.root {
}
`;
}

export function reactStory(name: string): string {
  const P = pascal(name);
  return `import type { Meta, StoryObj } from '@storybook/react-vite';
import { ${camel(name)}Contract } from '@surfnet/curve-contracts';

import { ${P} } from './${name}';

const meta = {
  title: 'Components/${P}',
  component: ${P},
  parameters: {
    docs: {
      description: {
        component: ${camel(name)}Contract.docs.description,
      },
    },
  },
} satisfies Meta<typeof ${P}>;

export default meta;

type Story = StoryObj<typeof meta>;

// TODO: cover every variant, size and state (see button.stories.tsx).
export const Default: Story = {};
`;
}

// ── Angular ──────────────────────────────────────────────────────────────────

export function angularCss(name: string): string {
  return `/*
 * ${pascal(name)} — port the Tailwind class strings from the helm directives here
 * as curve-${name}[-part] classes, using Curve tokens. See the Angular section of
 * packages/react/docs/css-modules-pilot.md.
 */
.curve-${name} {
}
`;
}

export function angularStory(name: string): string {
  const P = pascal(name);
  return `import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ${camel(name)}Contract } from '@surfnet/curve-contracts';
import { Hlm${P}, Hlm${P}Imports } from '..';

const meta: Meta<Hlm${P}> = {
  title: 'Components/${P}',
  component: Hlm${P},
  decorators: [
    moduleMetadata({
      imports: [Hlm${P}Imports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: ${camel(name)}Contract.docs.description,
      },
    },
  },
};

export default meta;
type Story = StoryObj<Hlm${P}>;

// TODO: mirror the React stories one-to-one (same names, same coverage).
export const Default: Story = {
  render: () => ({
    template: \`<div hlm${P}>${P}</div>\`,
  }),
};
`;
}
