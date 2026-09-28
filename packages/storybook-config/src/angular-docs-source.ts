// Angular-only. `argsToTemplate()` (from `@storybook/angular`) always emits a
// property binding — `[variant]="variant"` — for every arg, because it has no
// way to know whether a value needs Angular expression evaluation or is just
// a static string. That's correct for the live canvas (bindings must be
// reactive so Controls can update it), but it makes the "Show code" snippet
// print brackets even for a plain enum like `variant` that carries no logic.
//
// This only rewrites the *displayed* source, via `docs.source.transform` —
// the story's real template still uses `argsToTemplate()` and stays reactive.
// It unwraps a passthrough binding `[key]="key"` into a plain attribute
// `key="value"`, and only for string-valued args (so `[disabled]="disabled"`
// and other non-string bindings, where the plain-attribute form would change
// meaning, are left untouched).
export function simplifyAngularDocsSource(
  source: string,
  args: Record<string, unknown> = {},
): string {
  return Object.entries(args).reduce((code, [key, value]) => {
    if (typeof value !== 'string') return code;
    const pattern = new RegExp(`\\[${key}\\]="${key}"`, 'g');
    const escaped = value.replace(/"/g, '&quot;');
    return code.replace(pattern, () => `${key}="${escaped}"`);
  }, source);
}
