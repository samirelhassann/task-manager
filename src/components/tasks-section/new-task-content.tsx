/* eslint-disable jsx-a11y/no-autofocus */
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";

import { TasksContext } from "@/contexts/task-context";

export default function NewTaskContent() {
  const { addTask } = useContext(TasksContext);

  const [addingActive, setAddingActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && addingActive) {
        inputRef.current?.blur();
      } else if (event.key === "Enter" && addingActive) {
        event.preventDefault();

        addTask({
          id: crypto.randomUUID(),
          title: inputValue,
          date: new Date(),
          pausedDate: new Date(),
          status: "paused",
        });

        setInputValue("");
        setAddingActive(false);
      }
    };

    if (addingActive) {
      inputRef.current?.focus();
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [addingActive, inputValue, addTask]); // Inclui inputValue e addTask nas dependências do useEffect

  const handleClickAddButton = () => {
    setAddingActive(true);
  };

  const handleOnBlurInput = () => {
    setInputValue("");
    setAddingActive(false);
  };

  const hanldeInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    setInputValue(value);
  };

  return (
    <div className="flex flex-col">
      <button
        type="button"
        className="rounded-lg text-zinc-600 w-fit hover:text-purple-500 data-[invisible=true]:hidden"
        data-invisible={addingActive}
        onClick={handleClickAddButton}
      >
        + Add new task
      </button>

      <input
        ref={inputRef}
        className="text-xl font-semibold text-purple-500 bg-transparent outline-none caret-purple-500 invisible data-[visible=true]:visible "
        type="text"
        value={inputValue}
        data-visible={addingActive}
        onChange={hanldeInputChange}
        onBlur={handleOnBlurInput}
      />
    </div>
  );
}
