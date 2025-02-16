import { toast, ToastOptions } from "react-toastify";

interface IToastProps extends ToastOptions {
  message: string;
}

const Toast = ({ message, ...options }: IToastProps) => {
  return toast(message, {
    ...options,
    autoClose: 1000,
  });
};

export default Toast;
