interface IPillProps {
  value: boolean;
  label: string;
}

export function Pill({ value, label }: IPillProps): JSX.Element {
  return (
    <span
      className={`
        text-xs font-medium me-2 px-2.5 py-0.5 rounded-full
        ${
          value
            ? "bg-green-500 text-white "
            : "bg-red-500 text-white"
        }
      `}
    >
      {label}
    </span>
  );
}
