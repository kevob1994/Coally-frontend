import { ButtonHTMLAttributes, ReactNode } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger";
}

export function Button({
  icon,
  loading = false,
  variant = "primary",
  children,
  ...props
}: IButtonProps): JSX.Element {
  const baseStyles =
    "p-5 h-10 w-full inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all";

  const variantStyles = {
    primary: "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${props.className} ${
    props.disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  return (
    <button
      {...props}
      className={buttonStyles}
      disabled={loading || props.disabled}
    >
      {loading ? (
        <span className='loader' />
      ) : (
        <>
          {icon && <span className='mr-2'>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
