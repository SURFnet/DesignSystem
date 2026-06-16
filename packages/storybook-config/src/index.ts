import { useEffect, useGlobals } from 'storybook/preview-api';

import { FRAMEWORKS, type Framework } from './frameworks.js';

export { FRAMEWORKS };
export type { Framework, FrameworkTarget } from './frameworks.js';

// Shared preview parameters so every framework's Storybook renders stories the
// same way.
export const sharedParameters = {
  layout: 'centered',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
};

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
    const [{ framework }] = useGlobals();

    useEffect(() => {
      if (!framework || framework === current) return;
      const peer = FRAMEWORKS.find((f) => f.id === framework);
      if (!peer) return;

      // Read the story id from our own iframe URL (same-origin, so no
      // cross-port SecurityError) and rebuild the peer's manager URL.
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      const viewMode = params.get('viewMode') || 'story';
      const path = id ? `?path=/${viewMode}/${id}` : '';

      // Navigating the top window across ports is allowed (only *reading* a
      // cross-origin location is blocked).
      (window.top || window).location.href = `${peer.url}/${path}`;
    }, [framework]);

    return StoryFn();
  };
}
