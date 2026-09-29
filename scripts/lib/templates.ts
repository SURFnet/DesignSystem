/**
 * File templates for `pnpm new:component` and `pnpm import:component`. Each returns a starting point that
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

// ── Home-grown (new:component) ────────────────────────────────────────────────────
//
// No upstream CLI: the generator writes a small working component instead, in
// the shape of curve-data-table. Each contract axis becomes a typed prop that
// sets a data-* attribute, with an empty CSS rule per value to fill in.

/** `variants` → `variant`, `mediaVariants` → `mediaVariant`. */
function axisProp(axis: string): string {
  return axis.endsWith('s') ? axis.slice(0, -1) : axis;
}

/** `mediaVariant` → `media-variant` */
function kebab(s: string): string {
  return s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}

function axisTypesImport(name: string, axes: Axes): string {
  const types = Object.keys(axes).map((a) => axisTypeName(name, a));
  return types.length
    ? `import type { ${types.join(', ')} } from '@surfnet/curve-contracts';\n`
    : '';
}

function axisCssRules(selector: string, axes: Axes): string {
  return Object.entries(axes)
    .flatMap(([axis, values]) =>
      values.map(
        (v) =>
          `\n${selector}[data-${kebab(axisProp(axis))}='${v}'] {\n  /* ${axisProp(axis)}: ${v} */\n}\n`,
      ),
    )
    .join('');
}

/** Story args/argTypes for each axis, sourced from the contract. */
function axisStoryMeta(name: string, axes: Axes): string {
  const c = `${camel(name)}Contract`;
  const entries = Object.keys(axes);
  if (!entries.length) return '';
  const argTypes = entries.map(
    (axis) => `    ${axisProp(axis)}: {
      control: 'radio',
      options: ${c}.props.${axis},
      description: 'TODO: describe the ${axisProp(axis)} prop.',
      table: { defaultValue: { summary: ${c}.defaults.${axis} } },
    },`,
  );
  const args = entries.map((axis) => `    ${axisProp(axis)}: ${c}.defaults.${axis},`);
  return `  argTypes: {\n${argTypes.join('\n')}\n  },\n  args: {\n${args.join('\n')}\n  },\n`;
}

export function reactCustomComponent(name: string, axes: Axes): string {
  const P = pascal(name);
  const entries = Object.entries(axes);
  const destructure = entries.map(([axis, values]) => `  ${axisProp(axis)} = ${q(values[0]!)},`);
  const propTypes = entries.map(([axis]) => `${axisProp(axis)}?: ${axisTypeName(name, axis)}`);
  const dataAttrs = entries.map(
    ([axis]) => `      data-${kebab(axisProp(axis))}={${axisProp(axis)}}`,
  );
  return `import * as React from 'react';
${axisTypesImport(name, axes)}
import { cn } from '@/lib/utils';

import styles from './${name}.module.css';

function ${P}({
  className,
${destructure.join('\n')}
  ...props
}: React.ComponentProps<'div'>${propTypes.length ? ` & { ${propTypes.join('; ')} }` : ''}) {
  return (
    <div
      data-slot="${name}"
${dataAttrs.join('\n')}
      className={cn(styles.root, className)}
      {...props}
    />
  );
}

export { ${P} };
`;
}

export function reactCustomModuleCss(name: string, axes: Axes): string {
  return `/* ${pascal(name)} — home-grown Curve component. Use Curve tokens (var(--primary), …). */
.root {
  display: block;
}
${axisCssRules('.root', axes)}`;
}

export function reactCustomStory(name: string, axes: Axes): string {
  const P = pascal(name);
  const c = `${camel(name)}Contract`;
  const axisStories = Object.keys(axes).map(
    (axis) => `
/** Every ${axisProp(axis)} from the contract. */
export const ${pascal(axis)}: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {${c}.props.${axis}.map((value) => (
        <${P} key={value} ${axisProp(axis)}={value}>
          {value}
        </${P}>
      ))}
    </div>
  ),
};
`,
  );
  return `import type { Meta, StoryObj } from '@storybook/react-vite';
import { ${c} } from '@surfnet/curve-contracts';

import { ${P} } from './${name}';

const meta = {
  title: 'Components/${P}',
  component: ${P},
  parameters: {
    docs: {
      description: {
        component: ${c}.docs.description,
      },
    },
  },
${axisStoryMeta(name, axes)}} satisfies Meta<typeof ${P}>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Playground: every control above is live here. */
export const Default: Story = {
  render: (args) => <${P} {...args}>${P}</${P}>,
};
${axisStories.join('')}`;
}

export function angularCustomComponent(name: string, axes: Axes): string {
  const P = pascal(name);
  const entries = Object.entries(axes);
  const hostAttrs = entries.map(
    ([axis]) => `    '[attr.data-${kebab(axisProp(axis))}]': '${axisProp(axis)}()',`,
  );
  const inputs = entries.map(
    ([axis, values]) =>
      `  public readonly ${axisProp(axis)} = input<${axisTypeName(name, axis)}>(${q(values[0]!)});`,
  );
  return `import { ChangeDetectionStrategy, Component${entries.length ? ', input' : ''} } from '@angular/core';
${axisTypesImport(name, axes)}
@Component({
  selector: '${name}',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: '${name}',
    'data-slot': '${name}',
${hostAttrs.join('\n')}
  },
  template: '<ng-content />',
})
export class ${P}Component {
${inputs.join('\n')}
}
`;
}

export function angularCustomIndex(name: string): string {
  const P = pascal(name);
  return `import { ${P}Component } from './lib/${name}';

export * from './lib/${name}';

export const ${P}Imports = [${P}Component] as const;
`;
}

export function angularCustomCss(name: string, axes: Axes): string {
  return `/* ${pascal(name)} — home-grown Curve component. Mirror the React module's rules. */
.${name} {
  display: block;
}
${axisCssRules(`.${name}`, axes)}`;
}

export function angularCustomStory(name: string, axes: Axes): string {
  const P = pascal(name);
  const c = `${camel(name)}Contract`;
  const axisStories = Object.keys(axes).map(
    (axis) => `
/** Every ${axisProp(axis)} from the contract. */
export const ${pascal(axis)}: Story = {
  render: () => ({
    props: { values: ${c}.props.${axis} },
    template: \`
      <div class="flex flex-col gap-4">
        @for (value of values; track value) {
          <${name} [${axisProp(axis)}]="value">{{ value }}</${name}>
        }
      </div>
    \`,
  }),
};
`,
  );
  return `import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { ${c} } from '@surfnet/curve-contracts';
import { ${P}Component, ${P}Imports } from '..';

const meta: Meta<${P}Component> = {
  title: 'Components/${P}',
  component: ${P}Component,
  decorators: [
    moduleMetadata({
      imports: [${P}Imports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: ${c}.docs.description,
      },
    },
  },
${axisStoryMeta(name, axes)}};

export default meta;
type Story = StoryObj<${P}Component>;

/** Playground: every control above is live here. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: \`<${name} \${argsToTemplate(args)}>${P}</${name}>\`,
  }),
};
${axisStories.join('')}`;
}
