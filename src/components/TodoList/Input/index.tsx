import React, { FC, ReactElement, useRef } from "react";
import { ITodo } from "../typings";

interface IProps {
  addTodo: (todo: ITodo) => void;
  todoList: ITodo[];
}

const TDInput: FC<IProps> = ({ addTodo, todoList }): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);

  const addItem = (): void => {
    const val: string = inputRef.current!.value.trim();

    if (val.length) {
      const isExist = todoList.find(item => item.content === val);

      if (isExist) {
        window.alert("代办项已存在");
        return;
      }

      addTodo({
        id: new Date().getTime(),
        content: val,
        completed: false,
      });

      inputRef.current!.value = "";
    }
  };

  return (
    <div>
      <input type="text" placeholder="please input todos" ref={inputRef} />
      <button onClick={addItem}>add todo</button>
    </div>
  );
};

/**
 * todo: {
 *    id: new Date().getTime()
 *    content: string
 *    completed: boolean
 * }
 */

export default TDInput;
