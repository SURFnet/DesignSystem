'use client';

import * as ResizablePrimitive from 'react-resizable-panels';
import type { ResizableDirectionName } from '@surfnet/curve-contracts';

import { cn } from '@/lib/utils';

import styles from './resizable.module.css';

function ResizablePanelGroup({
  className,
  orientation,
  ...props
}: Omit<ResizablePrimitive.GroupProps, 'orientation'> & {
  orientation?: ResizableDirectionName;
}) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      orientation={orientation}
      className={cn(styles.group, className)}
      {...props}
    />
  );
}

function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: ResizablePrimitive.SeparatorProps & {
  withHandle?: boolean;
}) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(styles.handle, className)}
      {...props}
    >
      {withHandle ? <div className={styles.handleGrip} /> : null}
    </ResizablePrimitive.Separator>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
