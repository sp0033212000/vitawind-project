import React, { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileUpload,
  faPencilAlt,
  faTimesCircle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Input } from "@common/Fields";
import Button from "@common/Button";
import { UseFormRegister } from "react-hook-form";

export const Cell: React.FC<El<"th" | "td">> = ({
  children,
  as,
  className,
  ...props
}) => {
  return React.createElement(
    as,
    {
      ...props,
    },
    <div
      className={classNames(
        "flex",
        "items-center",
        "justify-center",
        "h-12",
        className
      )}
    >
      {children}
    </div>
  );
};

export const Row: React.FC<Omit<El<"tr">, "as">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <tr
      className={classNames(className, "divide-x", "divide-blue-400")}
      {...props}
    >
      {children}
    </tr>
  );
};

interface EditableRowProps {
  index: number;
  register: UseFormRegister<{ data: Project[] }>;
  remove: (index?: number | number[]) => void;
  isNew: boolean;
  reset: (index: number, values: Project) => void;
  defaultValues: Project;
}
export const EditableRow: React.FC<EditableRowProps> = ({
  index,
  register,
  remove,
  reset,
  defaultValues,
}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const cachedDefaultValues = useRef<Project>({ ...defaultValues });

  useEffect(() => {
    cachedDefaultValues.current = { ...defaultValues };
  }, [editing]);

  const cancelEdit = useCallback(() => {
    reset(index, { ...cachedDefaultValues.current });
    setEditing(false);
  }, []);

  return (
    <Row>
      <Cell as={"td"} className={classNames("w-24")}>
        <Button
          condition={!editing}
          onClick={() => setEditing(true)}
          className={classNames(
            "w-6",
            "h-6",
            "rounded-cl",
            "text-xs",
            "text-white",
            "bg-blue-500",
            "mr-4"
          )}
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </Button>
        <Button
          condition={!editing}
          onClick={() => remove(index)}
          className={classNames(
            "bg-gray-500",
            "w-6",
            "h-6",
            "rounded-cl",
            "text-xs",
            "text-white"
          )}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
        <Button
          condition={editing}
          onClick={() => setEditing(false)}
          className={classNames("text-green-500", "mr-4")}
        >
          <FontAwesomeIcon icon={faFileUpload} />
        </Button>
        <Button
          condition={editing}
          onClick={cancelEdit}
          className={classNames("text-red-500")}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </Button>
      </Cell>
      <Cell as={"td"}>
        <Input readOnly={!editing} register={register(`data.${index}.task`)} />
      </Cell>
      <Cell as={"td"}>
        <Input
          readOnly={!editing}
          register={register(`data.${index}.estimateAt`)}
          type={"date"}
        />
      </Cell>
      <Cell as={"td"}>
        <Input
          readOnly={!editing}
          register={register(`data.${index}.description`)}
        />
      </Cell>
      <Cell as={"td"}>
        <Input
          readOnly={!editing}
          register={register(`data.${index}.completedAt`)}
          type={"date"}
        />
      </Cell>
      <Cell as={"td"}>
        <Input
          readOnly={!editing}
          register={register(`data.${index}.varianceAnalysis`)}
        />
      </Cell>
    </Row>
  );
};
