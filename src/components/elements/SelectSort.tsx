import { memo, type ChangeEvent, type JSX } from 'react';
import type { SortSelectProps } from '../../types/elements/select';

function SelectSort({
  id,
  options,
  value,
  onChange,
  className,
}: SortSelectProps): JSX.Element {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    onChange(event.target.value as typeof value);
  };
  return (
    <select id={id} value={value} className={className} onChange={handleChange}>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}

export default memo(SelectSort);
