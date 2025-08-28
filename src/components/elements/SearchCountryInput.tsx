import { memo, type ChangeEvent, type JSX } from 'react';
import type { SearchCountryInputProps } from '../../types/elements/inputs';

function SearchCountryInput({
  value,
  onChange,
  placeholder = 'Search country',
  className,
}: SearchCountryInputProps): JSX.Element {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value);
  };

  return (
    <input
      type="text"
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}

export default memo(SearchCountryInput);
