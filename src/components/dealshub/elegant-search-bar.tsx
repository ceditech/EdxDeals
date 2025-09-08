'use client';

import React from 'react';
import { Search as SearchIcon, X as XIcon } from 'lucide-react';

type ElegantSearchBarProps = {
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
  id?: string;
};

export default function ElegantSearchBar({
  placeholder = 'Find a deal, product or brand...',
  defaultValue = '',
  onChange,
  onSubmit,
  className = '',
  id,
}: ElegantSearchBarProps) {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e.target.value);
  };

  const clear = () => {
    setValue('');
    onChange?.('');
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form
      role="search"
      aria-label="Deals search"
      onSubmit={submit}
      className={[
        'relative w-full md:max-w-[450px] lg:max-w-[500px]',
        'mx-0 md:mx-0',
        className,
      ].join(' ')}
      id={id}
    >
      {/* Input with glassmorphism */}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search deals by name, product, or brand"
        className={[
          'w-full',
          'bg-white/80 backdrop-blur-sm',
          'border border-gray-200',
          'shadow-md',
          'rounded-full',
          'py-3 md:py-3.5',
          'pl-11 pr-10',
          'text-base md:text-lg',
          'placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-blue-400',
          'transition-all',
        ].join(' ')}
      />

      {/* Left search icon */}
      <span
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        aria-hidden="true"
      >
        <SearchIcon size={18} />
      </span>

      {/* Clear button (X) */}
      {value ? (
        <button
          type="button"
          onClick={clear}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Clear search"
          title="Clear"
        >
          <XIcon size={16} />
        </button>
      ) : null}
    </form>
  );
}