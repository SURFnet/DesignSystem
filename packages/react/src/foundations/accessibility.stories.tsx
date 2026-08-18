import { DownloadSimpleIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ACCESSIBILITY_LAYERS,
  ACCESSIBILITY_PAGE_INTRO,
  ACCESSIBILITY_SECTIONS,
  ACCESSIBILITY_SKILL_FILE,
  ACCESSIBILITY_SKILL_INSTALL,
  ACCESSIBILITY_SKILL_SUMMARY,
} from '@surfnet/curve-storybook-config';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';

function AccessibilityGuide() {
  return (
    <article className="max-w-3xl text-foreground">
      <h1 className="text-2xl font-semibold tracking-tight">Accessibility</h1>
      <p className="mt-3 max-w-prose text-muted-foreground">{ACCESSIBILITY_PAGE_INTRO}</p>

      <Card className="mt-8">
        <CardHeader>
          <h2 className="font-heading text-base leading-normal font-medium">
            Agent skill for coding assistants
          </h2>
          <CardDescription>
            A markdown skill you can drop into Cursor, Claude Code, or another coding agent. It
            teaches the agent to apply semantic HTML, accessible names, heading structure, keyboard
            access, skip links, and focus styles whenever it writes or reviews UI.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {ACCESSIBILITY_SKILL_SUMMARY.map((paragraph) => (
            <p key={paragraph} className="text-sm text-muted-foreground">
              {paragraph}
            </p>
          ))}
          <table className="w-full text-sm">
            <caption className="sr-only">Where to install the downloaded skill file</caption>
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-4 font-medium" scope="col">
                  Tool
                </th>
                <th className="py-2 font-medium" scope="col">
                  Save as
                </th>
              </tr>
            </thead>
            <tbody>
              {ACCESSIBILITY_SKILL_INSTALL.map((row) => (
                <tr key={row.tool} className="border-b border-border last:border-b-0">
                  <th className="py-2 pr-4 font-normal" scope="row">
                    {row.tool}
                  </th>
                  <td className="py-2 font-mono text-xs">{row.path}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            <Button
              render={
                <a
                  href={ACCESSIBILITY_SKILL_FILE.href}
                  download={ACCESSIBILITY_SKILL_FILE.filename}
                />
              }
            >
              <DownloadSimpleIcon data-icon="inline-start" />
              Download the accessibility skill
            </Button>
          </p>
        </CardContent>
      </Card>

      <section className="mt-12" aria-labelledby="layers-heading">
        <h2 id="layers-heading" className="text-lg font-semibold">
          A layered process
        </h2>
        <p className="mt-2 max-w-prose text-sm text-muted-foreground">
          No single tool covers accessibility. Stack a cheap check at write-time, a linter on save,
          axe in Storybook and CI, and a short keyboard pass before you ship.
        </p>
        <table className="mt-5 w-full text-sm">
          <caption className="sr-only">
            Accessibility checks by layer of the developer process
          </caption>
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-4 font-medium" scope="col">
                Layer
              </th>
              <th className="py-2 pr-4 font-medium" scope="col">
                When
              </th>
              <th className="py-2 font-medium" scope="col">
                What it catches
              </th>
            </tr>
          </thead>
          <tbody>
            {ACCESSIBILITY_LAYERS.map((row) => (
              <tr key={row.layer} className="border-b border-border align-top last:border-b-0">
                <th className="py-2 pr-4 font-medium" scope="row">
                  {row.layer}
                </th>
                <td className="py-2 pr-4 text-muted-foreground">{row.when}</td>
                <td className="py-2 text-muted-foreground">{row.catches}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {ACCESSIBILITY_SECTIONS.map((section) => (
        <section key={section.id} className="mt-12" aria-labelledby={`${section.id}-heading`}>
          <h2 id={`${section.id}-heading`} className="text-lg font-semibold">
            {section.title}
          </h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-2 max-w-prose text-sm text-muted-foreground">
              {paragraph}
            </p>
          ))}
          {section.bullets ? (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {section.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {section.links ? (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
              {section.links.map((link) => (
                <li key={link.href}>
                  <a
                    className="text-link underline-offset-4 hover:underline"
                    href={link.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </article>
  );
}

const meta = {
  title: 'Foundations/Accessibility',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'How to weave accessibility into everyday development: a downloadable agent skill, ' +
          'Storybook’s a11y addon, linting, automated tests, CI, and the manual checks those ' +
          'tools cannot replace.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/** Process guide plus a downloadable agent skill for Cursor, Claude Code, and similar tools. */
export const Guide: Story = {
  render: () => <AccessibilityGuide />,
};
