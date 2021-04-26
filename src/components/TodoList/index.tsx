import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import TDInput from "./Input";
import TDList from "./List";
import { ITodo, IState, IAction, ACTION_TYPE } from "./typings";

// const initialState = {
//   todoList: [],
// };

// 惰性初始化 state, 只有当 reducer 执行时, 才会进行初始化, 作为useReducer第三个参数传递, 第二个参数作为初始化的值
function init(initTodoList: ITodo[]): IState {
  return {
    todoList: initTodoList,
  };
}

function todoReducer(state: IState, action: IAction): IState {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPE.INIT_TODO:
      return {
        ...state,
        todoList: payload as ITodo[],
      };
    case ACTION_TYPE.ADD_TODO:
      return {
        ...state,
        todoList: [payload as ITodo, ...state.todoList],
      };
    case ACTION_TYPE.REMOVE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter(todo => todo.id !== payload),
      };
    case ACTION_TYPE.TOGGLE_TODO:
      return {
        ...state,
        todoList: state.todoList.map(todo => {
          return todo.id === payload
            ? {
                ...todo,
                completed: !todo.completed,
              }
            : {
                ...todo,
              };
        }),
      };
    default:
      return state;
  }
}

const TodoList: FC = (): ReactElement => {
  // const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [state, dispatch] = useReducer(todoReducer, [], init);

  useEffect(() => {
    // console.log(state.todoList);
    const todoList = JSON.parse(localStorage.getItem("todoList") || "[]");
    dispatch({ type: ACTION_TYPE.INIT_TODO, payload: todoList });
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(state.todoList));
  }, [state.todoList]);

  const addTodo = useCallback((todo: ITodo): void => {
    // setTodoList(todoList => [todo, ...todoList]);
    dispatch({ type: ACTION_TYPE.ADD_TODO, payload: todo });
  }, []);

  const toggleTodo = useCallback((id: number): void => {
    dispatch({ type: ACTION_TYPE.TOGGLE_TODO, payload: id });
  }, []);

  const removeTodo = useCallback((id: number): void => {
    dispatch({ type: ACTION_TYPE.REMOVE_TODO, payload: id });
  }, []);

  return (
    <div>
      <TDInput addTodo={addTodo} todoList={state.todoList} />
      <TDList
        todoList={state.todoList}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
      />
    </div>
  );
};

export default TodoList;
