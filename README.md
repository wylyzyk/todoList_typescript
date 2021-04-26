[github](https://github.com/wylyzyk/todolist_typescript)

## App 组件
  1. App 组件
  2. TodoList 组件
  3. 子组件
    - Input
    - List
      + Index
      + Item

## 使用`useReducer`管理todoList状态
## typing
```typescript
  // todo
  interface ITodo {
    id: number;
    content: string;
    completed: boolean;
  }
  // todoList
  interface IState {
    todoList: ITodo[]
  }
  // reducer action
  interface IAction {
    type: ACTION_TYPE;
    payload: ITODO | ITODO[] | number;
  }
  // action type
  enum ACTION_TYPE {
    ADD_TODO = "add_todo",
    REMOVE_TODO = "remove_todo",
    TOGGLE_TODO = "toggle_todo",
    INIT_TODO = "init_todo"
  }
```

## 数据保存, localStorage