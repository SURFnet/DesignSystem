import * as React from 'react';
import type { MessageAlignName } from '@surfnet/curve-contracts';

import { cn } from '@/lib/utils';

import styles from './message.module.css';

function MessageGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="message-group" className={cn(styles.group, className)} {...props} />;
}

function Message({
  className,
  align = 'start',
  ...props
}: React.ComponentProps<'div'> & { align?: MessageAlignName }) {
  return (
    <div
      data-slot="message"
      data-align={align}
      className={cn(styles.message, className)}
      {...props}
    />
  );
}

function MessageAvatar({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="message-avatar" className={cn(styles.avatar, className)} {...props} />;
}

function MessageContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="message-content" className={cn(styles.content, className)} {...props} />;
}

function MessageHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="message-header" className={cn(styles.header, className)} {...props} />;
}

function MessageFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="message-footer" className={cn(styles.footer, className)} {...props} />;
}

export { MessageGroup, Message, MessageAvatar, MessageContent, MessageFooter, MessageHeader };
