import React, { useEffect, useState } from 'react';
import styles from './StatusBar.module.scss';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

interface Props {
  isLoading: boolean;
  isFetching: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  hasNoResults: boolean;
  stayVisibleMs?: number;
}

function extractErrorMessage(error: FetchBaseQueryError | SerializedError | undefined): string {
  if (!error) return 'Unknown error';

  if ('data' in error) {
    const data = error.data;
    if (typeof data === 'string') return data;
    if (typeof data === 'object' && data !== null && 'message' in data) {
      const msg = (data as Record<string, unknown>).message;
      if (typeof msg === 'string') return msg;
    }
  }

  if ('message' in error && typeof error.message === 'string') {
    return error.message;
  }

  return 'Unknown error';
}

export const StatusBar: React.FC<Props> = ({
                                             isLoading,
                                             isFetching,
                                             error,
                                             hasNoResults,
                                             stayVisibleMs = 2000,
                                           }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: number | undefined;

    if (isLoading || isFetching || error || hasNoResults) {
      setVisible(true);
    } else {
      timer = window.setTimeout(() => {
        setVisible(false);
      }, stayVisibleMs);
    }

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [isLoading, isFetching, error, hasNoResults, stayVisibleMs]);

  if (!visible) return null;

  let text = '';
  let cls = styles.status;

  if (isLoading) {
    text = '🔄 Loading heroes...';
  } else if (isFetching) {
    text = '🔃 Refreshing data...';
  } else if (error) {
    text = `❌ Error: ${extractErrorMessage(error)}`;
    cls = `${styles.status} ${styles.error}`;
  } else if (hasNoResults) {
    text = '🙈 No heroes found.';
    cls = `${styles.status} ${styles.empty}`;
  } else {
    text = '✅ Data loaded.';
    cls = `${styles.status} ${styles.success}`;
  }

  return (
    <div className={cls} role="status" aria-live="polite">
      {text}
    </div>
  );
};
