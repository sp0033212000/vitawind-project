import React, { useCallback } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import classNames from "classnames";

import { v4 as uuidV4 } from "uuid";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Cell, EditableRow, Row } from "./components/feature/Table";
import { isEmptyString, isNotSet } from "@utils/format.checker";

/**
 * @table key meaning
 * 工作項目 task
 * 預計完成時間 estimateAt
 * 說明 description
 * 實際完成時間 completedAt
 * 差異分析 varianceAnalysis
 */

export const defaultProjectValues: Partial<Project> = {
  task: "",
  estimateAt: "",
  description: "",
  completedAt: "",
  varianceAnalysis: "",
};

interface FormValues {
  projectName: string;
  data: Project[];
}
const App = () => {
  const { control, register, reset, watch } = useForm<FormValues>({
    defaultValues: { projectName: "none", data: [] },
  });
  const { append, fields, remove, insert } = useFieldArray({
    control,
    name: "data",
  });

  const watchProjectName = watch("projectName");

  const createProject = useCallback(() => {
    const projectName = prompt("請輸入專案名稱");
    if (isNotSet(projectName) || isEmptyString(projectName)) return;

    reset({ projectName, data: [] });
  }, []);

  const resetRow = useCallback((index: number, resetValue: Project) => {
    remove(index);
    insert(index, resetValue);
  }, []);

  return (
    <React.Fragment>
      <main className={classNames("w-full", "p-6")}>
        <div className={classNames("mb-4", "flex")}>
          <div
            className={classNames(
              "w-56",
              "border",
              "rounded-xl",
              "h-12",
              "mr-4",
              "px-4",
              "py-2"
            )}
          >
            <select
              className={classNames("w-full", "h-full", "outline-none")}
              {...register("projectName")}
            >
              <option value="none" disabled>
                請選擇 Project
              </option>
            </select>
          </div>
          <button
            onClick={createProject}
            className={classNames(
              "bg-blue-400",
              "h-12",
              "w-24",
              "rounded-xl",
              "text-white",
              "font-bold"
            )}
          >
            Create
          </button>
        </div>
        <h1 className={classNames("text-4xl", "mb-4", "underline")}>
          {watchProjectName}
        </h1>
        <div
          className={classNames(
            "border",
            "border-solid",
            "border-blue-400",
            "rounded-lg",
            "overflow-scroll"
          )}
        >
          <table className={classNames("table-auto", "w-full")}>
            <thead
              className={classNames(
                "divide-blue-400",
                "divide-y",
                "bg-blue-400",
                "text-white"
              )}
            >
              <Row>
                <Cell as={"th"}>
                  <button
                    className={classNames("text-2xl")}
                    onClick={() =>
                      append({
                        id: uuidV4(),
                        newTask: false,
                        ...defaultProjectValues,
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </button>
                </Cell>
                <Cell as={"th"}>工作項目</Cell>
                <Cell as={"th"}>預計完成時間</Cell>
                <Cell as={"th"}>說明</Cell>
                <Cell as={"th"}>實際完成時間</Cell>
                <Cell as={"th"}>差異分析</Cell>
              </Row>
            </thead>
            <tbody className={classNames("divide-blue-400", "divide-y")}>
              {fields.map((field, index) => {
                return (
                  <EditableRow
                    key={field.id}
                    index={index}
                    register={register}
                    remove={remove}
                    isNew={field.newTask}
                    reset={resetRow}
                    defaultValues={{ ...field, ...watch("data")?.[index] }}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </React.Fragment>
  );
};

export default App;
