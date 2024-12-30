import { InputHTMLAttributes, ReactNode, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ErrorMessage } from "./error-message";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: string | null;
}

export function Input({
  label,
  icon,
  type,
  error,
  ...props
}: IInputProps): JSX.Element {
  const classColors = error
    ? "outline-red-500 focus-visible:outline-red-500 focus:outline-red-500 border-red-500"
    : "outline-gray-800 focus-visible:outline-gray-800 focus:outline-gray-800 border-gray-300";

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`relative w-full ${label && "mt-3"}`}>
      {label ? (
        <label className='text-left mb-1 block  px-1.5 text-sm font-medium text-black'>
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
          <input
            {...props}
            className={` block h-14 w-full rounded-lg border  p-2.5 text-base text-gray-900 focus:border-2 ${
              icon && "pl-10"
            } ${classColors}`}
            type={showPassword ? "text" : type}
          />
          {type === "password" ? (
            <div
              className='absolute inset-y-0 right-0 flex items-center pr-3.5'
              onClick={handleTogglePassword}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleTogglePassword();
                }
              }}
              role='button'
              tabIndex={0}
            >
              <div className='h-4 w-4 text-gray-500'>
                {showPassword ? (
                  <AiOutlineEye size='16px' />
                ) : (
                  <AiOutlineEyeInvisible size='16px' />
                )}
              </div>
            </div>
          ) : null}
        </div>
        {error ? (
          <div className='mt-1'>
            <ErrorMessage message={error} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
