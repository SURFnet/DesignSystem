// Client re-export of the design-system primitives.
//
// `@surfnet/react` ships as a single bundle that evaluates `createContext` at
// module load and is NOT marked `'use client'`, so importing it directly from a
// Server Component throws. Re-exporting through this `'use client'` module turns
// the components into client references: Server Components can render them (with
// serialisable props) without the package being evaluated on the server.
//
// Remove this shim once the library preserves its own `'use client'` boundaries.
'use client';

export {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@surfnet/react';
