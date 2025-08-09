import { useEffect, useState } from 'react';
import styles from './StatusBarHero.module.scss';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

type Props = {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  stayVisibleMs?: number;
};

export function StatusBarHero({
                                isLoading,
                                isFetching,
                                isError,
                                error,
                                stayVisibleMs = 1500,
                              }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: number | undefined;

    if (isLoading || isFetching || isError) {
      setVisible(true);
    } else {
      timer = window.setTimeout(() => setVisible(false), stayVisibleMs);
    }

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [isLoading, isFetching, isError, stayVisibleMs]);

  if (!visible) return null;

  let text = '';
  let cls = styles.status;

  if (isLoading) {
    text = '🔄 Loading hero...';
  } else if (isFetching) {
    text = '🔃 Refreshing hero...';
  } else if (isError) {
    let msg = '❌ Unknown error';
    if (error && typeof error === 'object') {
      if ('data' in error) {
        const d = error.data as unknown;
        if (typeof d === 'string') msg = d;
        else if (d && typeof d === 'object' && 'message' in d) {
          const maybe = (d as Record<string, unknown>).message;
          if (typeof maybe === 'string') msg = maybe;
        }
      } else if ('message' in error && typeof error.message === 'string') {
        msg = error.message;
      }
    }
    text = `Error: ${msg}`;
    cls = `${styles.status} ${styles.error}`;
  } else {
    text = '✅ Up to date';
    cls = `${styles.status} ${styles.success}`;
  }

  return (
    <div className={cls} role="status" aria-live="polite">
      {text}
    </div>
  );
}
