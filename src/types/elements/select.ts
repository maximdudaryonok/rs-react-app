import type { SortOrder } from '../table';

export type Option = {
  value: string;
  label: string;
};

export type YearSelectProps = {
  id: string;
  value?: string | number;
  options: number[];
  onChange: (value: string) => void;
  className?: string;
};

export type SortSelectProps = {
  id: string;
  options: Option[];
  value: SortOrder;
  onChange: (value: SortOrder) => void;
  className?: string;
};
