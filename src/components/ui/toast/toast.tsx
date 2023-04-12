import hotToast from "react-hot-toast";
import { classNames } from "~/lib/classNames";

export { Toaster } from "react-hot-toast";

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  visible: boolean;
}

function Toast({ visible, className, ...props }: ToastProps) {
  return (
    <div
      className={classNames(
        "min-h-16 mb-2 flex w-[350px] flex-col items-start gap-1 rounded-md bg-white px-6 py-4 shadow-lg",
        visible && "animate-in slide-in-from-bottom-5",
        className
      )}
      {...props}
    />
  );
}

type ToastTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

Toast.Title = function ToastTitle({ className, ...props }: ToastTitleProps) {
  return <p className={classNames("text-sm font-medium", className)} {...props} />;
};

type ToastDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

Toast.Description = function ToastDescription({ className, ...props }: ToastDescriptionProps) {
  return <p className={classNames("text-sm opacity-80", className)} {...props} />;
};

interface ToastOpts {
  title?: string;
  message: string;
  type?: "success" | "error" | "default";
  duration?: number;
}

export default function toast(opts: ToastOpts) {
  const { title, message, type = "default", duration = 3000 } = opts;

  return hotToast.custom(
    ({ visible }) => (
      <Toast
        visible={visible}
        className={classNames({
          "bg-red-600 text-white": type === "error",
          "bg-black text-white": type === "success",
        })}>
        <Toast.Title>{title}</Toast.Title>
        {message && <Toast.Description>{message}</Toast.Description>}
      </Toast>
    ),
    { duration }
  );
}
