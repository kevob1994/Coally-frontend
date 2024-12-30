
interface SelectOption {
  value: string;
  label: string;
}

interface ISelectComponentProps {
  id: string;
  label: string;
  options: SelectOption[];
  selectedValue?: string;
  onChange: (value: string) => void;
}

export function Select({
  id,
  label,
  options,
  selectedValue,
  onChange,
}: ISelectComponentProps): JSX.Element {
  return (
    <div>
      <label
        htmlFor={id}
        className='block mb-2 text-sm font-medium text-gray-900 '
      >
        {label}
      </label>
      <select
        id={id}
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
