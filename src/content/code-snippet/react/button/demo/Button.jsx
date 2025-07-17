import { cva } from "./cva";

// WIP
export const button = cva("px-2 py-1 border rounded-md", {});

export const Button = (props) => {
  const classNames = button();

  return <button {...props} className={classNames} />;
};
