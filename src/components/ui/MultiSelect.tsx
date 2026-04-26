import React from 'react';
// Headless UI Listbox is available if we need an interactive combobox later

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label?: string;
  options: Option[];
  value: string[];
  onChange: (values: string[]) => void;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({ label, options, value, onChange }) => {
  const toggle = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter(v => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <div className="border rounded-lg p-2">
        <div className="flex flex-wrap gap-2">
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggle(opt.value)}
              className={`px-3 py-1 rounded-full text-sm ${value.includes(opt.value) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
              aria-pressed={value.includes(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
