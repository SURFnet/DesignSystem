import type { ReactNode } from 'react';
import '@surfnet/react/styles.css';

export const metadata = {
  title: 'SURF Design System - Web',
  description: 'Minimal Next.js app consuming @surfnet/react.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
