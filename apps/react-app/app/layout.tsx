import type { ReactNode } from 'react';
// Component styles + design tokens + Tailwind preflight (compiled by the package)...
import '@surfnet/curve-react/styles.css';
// ...then the app's own Tailwind utilities, mapped to the same tokens.
import './globals.css';

export const metadata = {
  title: 'Curve - Web',
  description: 'Minimal Next.js app consuming @surfnet/curve-react.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
