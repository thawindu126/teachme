import { type VariantProps, cva } from "class-variance-authority";
import { type ButtonHTMLAttributes, type DetailedHTMLProps, forwardRef, useMemo } from "react";
import { classNames } from "~/lib/classNames";

const buttonVariants = cva(
  "h-ft w-fit active:scale-95 inline-flex items-center justify-center font-medium transition-colors focus:outline-none disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary-500 text-white hover:bg-primary-700 rounded-[62px] disabled:bg-gray-400",
        secondary: "text-primary-500 hover:text-primary-700 disabled:text-gray-600",
      },
      size: {
        base: "px-8 py-2 text-base",
        sm: "px-6 py-2 text-sm",
        lg: "px-12 py-2 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "base",
    },
  }
);

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loadingText?: string;
}

export default forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, loading = false, loadingText, className, disabled, variant, size, ...props },
  ref
) {
  const mergedClasses = useMemo(
    () =>
      classNames(buttonVariants({ variant, size, className }), {
        "cursor-not-allowed transition duration-150 ease-in-out": loading,
      }),
    [className, loading, size, variant]
  );

  return (
    <button ref={ref} className={mergedClasses} disabled={disabled || loading} {...props}>
      {loading && (
        <svg
          className={classNames("h-5 w-5 animate-spin text-white", {
            "-ml-1 mr-3": !!loadingText,
          })}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
});
