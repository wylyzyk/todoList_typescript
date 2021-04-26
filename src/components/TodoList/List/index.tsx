import React, { FC } from "react";
import { ITodo } from "../typings";
import TDItem from "./Item";

interface IProps {
  todoList: ITodo[];
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TDList: FC<IProps> = ({ todoList, toggleTodo, removeTodo }) => {
  return (
    <div className="todo-list">
      {todoList &&
        todoList.map((todo: ITodo) => {
          return (
            <TDItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
            />
          );
        })}
    </div>
  );
};

export default TDList;
