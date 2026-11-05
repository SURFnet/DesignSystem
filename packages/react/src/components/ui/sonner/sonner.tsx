'use client';

import {
  CheckCircleIcon,
  InfoIcon,
  SpinnerIcon,
  WarningIcon,
  XCircleIcon,
} from '@phosphor-icons/react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

import styles from './sonner.module.css';

/**
 * Defaults follow WCAG 2.2.1 (Timing Adjustable): toasts stay 8 seconds and always have a
 * close button. Use `duration: Infinity` for messages the user must act on.
 */
const Toaster = ({ duration = 8000, closeButton = true, ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className={styles.toaster}
      duration={duration}
      closeButton={closeButton}
      icons={{
        success: <CheckCircleIcon className={styles.icon} />,
        info: <InfoIcon className={styles.icon} />,
        warning: <WarningIcon className={styles.icon} />,
        error: <XCircleIcon className={styles.icon} />,
        loading: <SpinnerIcon className={styles.iconSpin} />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
