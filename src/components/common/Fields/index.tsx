import React from "react";
import classNames from "classnames";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props extends JE<"input"> {
  register: UseFormRegisterReturn;
}
export const Input: React.FC<Props> = ({ register, className, ...props }) => {
  return (
    <input
      className={classNames(
        "border-b",
        "border-gray-400",
        "mx-2",
        "outline-none",
        "read-only:border-b-0",
        className
      )}
      {...props}
      {...register}
    />
  );
};
