import React, { FC } from "react";
import { ITodo } from "../typings";

interface IProps {
  todo: ITodo;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}
const TDItem: FC<IProps> = ({ toggleTodo, removeTodo, todo }) => {
  return (
    <div className="list-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
        {todo.content}
      </span>
      <button onClick={() => removeTodo(todo.id)}>delete</button>
    </div>
  );
};

export default TDItem;
