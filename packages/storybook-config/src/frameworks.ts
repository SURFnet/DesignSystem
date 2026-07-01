import { useEffect, useGlobals } from 'storybook/preview-api';

export type Framework = 'react' | 'angular';

export interface FrameworkTarget {
  id: Framework;
  title: string;
  localPort: number;
}

// The Storybook deployments to switch between, keyed by framework id.
export const FRAMEWORKS: FrameworkTarget[] = [
  { id: 'react', title: 'React', localPort: 6006 },
  { id: 'angular', title: 'Angular', localPort: 6007 },
];

// In dev, each Storybook runs on its own localhost port. Once deployed (e.g.
// GitHub Pages, see .github/workflows/deploy-storybook.yml), both Storybooks
// share one origin and live side by side under a `/<framework>/` path
// instead, so the peer's base URL has to be derived from the current one
// rather than hardcoded.
function resolveFrameworkBaseUrl(target: FrameworkTarget, current: Framework): string {
  const { hostname, protocol, origin, pathname } = window.location;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `${protocol}//${hostname}:${target.localPort}`;
  }

  const segment = `/${current}/`;
  const index = pathname.indexOf(segment);
  const prefix = index >= 0 ? pathname.slice(0, index) : '';
  return `${origin}${prefix}/${target.id}`;
}

// The toolbar `select` that lets you jump to another framework's Storybook.
export const frameworkGlobalTypes = {
  framework: {
    description: "Open this component in another framework's Storybook",
    toolbar: {
      title: 'Framework',
      icon: 'transfer',
      items: FRAMEWORKS.map((f) => ({ value: f.id, title: f.title })),
      dynamicTitle: true,
    },
  },
};

// Decorator backing the `framework` toolbar select. Story IDs are derived from
// `title` + the export name, and both packages use identical titles and story
// names, so the same id (e.g. `components-button--default`) resolves to the
// matching story in every framework — switching keeps you on the same view.
export function frameworkSwitcher(current: Framework) {
  return (StoryFn: () => unknown) => {
    const [{ framework, theme, mode }] = useGlobals();

    useEffect(() => {
      if (!framework || framework === current) return;
      const peer = FRAMEWORKS.find((f) => f.id === framework);
      if (!peer) return;

      // Read the story id from our own iframe URL (same-origin, so no
      // cross-port SecurityError) and rebuild the peer's manager URL.
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      const viewMode = params.get('viewMode') || 'story';

      // Carry the theme/mode globals across so the peer opens the same look.
      const globals = [theme && `theme:${theme}`, mode && `mode:${mode}`].filter(Boolean).join(';');

      const query = [id && `path=/${viewMode}/${id}`, globals && `globals=${globals}`]
        .filter(Boolean)
        .join('&');

      // Navigating the top window across ports/paths is allowed (only
      // *reading* a cross-origin location is blocked).
      const base = resolveFrameworkBaseUrl(peer, current);
      (window.top || window).location.href = `${base}/${query ? `?${query}` : ''}`;
    }, [framework]);

    return StoryFn();
  };
}
