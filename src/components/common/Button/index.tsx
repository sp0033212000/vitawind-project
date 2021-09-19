import React from "react";
import classNames from "classnames";

const Button: React.FC<JE<"button">> = ({
  condition,
  className,
  children,
  ...props
}) => {
  if (!condition) return null;

  return (
    <button className={classNames(className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
