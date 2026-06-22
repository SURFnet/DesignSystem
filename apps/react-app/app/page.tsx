import { Button } from '@surfnet/react';

// Each theme is a CSS class shipped by @surfnet/tokens (via @surfnet/react/styles.css).
// The tokens are CSS custom properties, so scoping a theme to any wrapper element is
// enough. `null` is the default (`:root`) theme.
const THEMES: { label: string; className: string | null }[] = [
  { label: 'Default', className: null },
  { label: 'shadcn default', className: 'theme-shadcn-default' },
  { label: 'SURF green', className: 'theme-surf-green' },
  { label: 'SURF orange', className: 'theme-surf-orange' },
  { label: 'SURF yellow', className: 'theme-surf-yellow' },
  { label: 'SURF purple', className: 'theme-surf-purple' },
  { label: 'SURF purple / orange', className: 'theme-surf-purple-orange' },
  { label: 'SURF blue / purple', className: 'theme-surf-blue-purple' },
  { label: 'SURF blue / turquoise', className: 'theme-surf-blue-turquoise' },
  { label: 'Groenvermogen', className: 'theme-groenvermogen-nkph2' },
  { label: 'Studielink', className: 'theme-studielink-aii' },
];

const VARIANTS = ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const;

function Swatch({ scheme }: { scheme: 'light' | 'dark' }) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-background p-4 text-foreground">
      {VARIANTS.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
      <span className="ms-auto text-xs text-muted-foreground">{scheme}</span>
    </div>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-semibold">@surfnet/react — Button across themes</h1>
      <p className="mb-8 text-muted-foreground">
        Every theme rendered in light and dark. Layout styled with Tailwind in the app; tokens come
        from @surfnet/tokens.
      </p>

      <div className="flex flex-col gap-8">
        {THEMES.map(({ label, className }) => {
          const light = className ?? '';
          const dark = className ? `dark ${className}` : 'dark';
          return (
            <section key={label}>
              <h2 className="mb-3 text-sm font-semibold">{label}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className={light || undefined}>
                  <Swatch scheme="light" />
                </div>
                <div className={dark}>
                  <Swatch scheme="dark" />
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
