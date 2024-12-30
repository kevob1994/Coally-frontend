import { TextareaHTMLAttributes, ReactNode } from "react";
import { ErrorMessage } from "./error-message";

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  icon?: ReactNode;
  error?: string | null;
}

export function Textarea({
  label,
  icon,
  error,
  ...props
}: ITextareaProps): JSX.Element {
  const classColors = error
    ? "outline-red-500 focus-visible:outline-red-500 focus:outline-red-500 border-red-500"
    : "outline-customPrimary focus-visible:outline-customPrimary focus:outline-customPrimary border-gray-300";

  return (
    <div className={`relative w-full ${label && "mt-3"}`}>
      {label ? (
        <label className='text-left mb-1 block bg-white px-1.5 text-sm font-medium text-black'>
          {label}
        </label>
      ) : null}
      <div className='mb-5'>
        <div className='relative'>
          {icon ? (
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5'>
              <div className='h-4 w-4 text-gray-500'>{icon}</div>
            </div>
          ) : null}
          <textarea
            {...props}
            className={`block h-32 w-full rounded-lg border p-2.5 text-base text-gray-900 focus:border-2 ${
              icon && "pl-10"
            } ${classColors}`}
          />
        </div>
        {error ? <div className="mt-1"><ErrorMessage message={error} /></div> : null}
      </div>
    </div>
  );
}
