import React from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";

interface Props {}
const Modal: React.FC<Props> = ({ children }) => {
  return createPortal(
    <div
      className={classNames(
        "w-screen",
        "h-screen",
        "flex",
        "items-center",
        "justify-center",
        "bg-black",
        "bg-opacity-60"
      )}
    >
      {children}
    </div>,
    document.querySelector("body")!
  );
};

export default Modal;
