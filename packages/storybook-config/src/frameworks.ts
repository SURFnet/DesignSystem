export type Framework = 'react' | 'angular';

export interface FrameworkTarget {
  id: Framework;
  title: string;
  url: string;
}

// The Storybook deployments to switch between, keyed by framework id.
export const FRAMEWORKS: FrameworkTarget[] = [
  { id: 'react', title: 'React', url: 'http://localhost:6006' },
  { id: 'angular', title: 'Angular', url: 'http://localhost:6007' },
];
