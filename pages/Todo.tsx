import { DeleteFilled } from "@ant-design/icons";
import React from "react";
import { v4 as uuidv4 } from "uuid";

class TodoItem {
  id: string;
  constructor(public label: string, public isDone?: boolean) {
    this.id = uuidv4();
  }
}

const Todo = () => {
  const [newTodo, setNewTodo] = React.useState("");
  const [todos, setTodos] = React.useState<TodoItem[]>([]);

  const styles = {
    inputContainer: {
      display: "flex",
      alignItems: "center",
    } as React.CSSProperties,
    todoInputBox: { marginRight: 5, fontSize: 20 } as React.CSSProperties,
    addBtn: { fontSize: 14, padding: 5 } as React.CSSProperties,
  };

  const eHandlers = {
    onAddTodo: () => {
      setNewTodo("");
      setTodos([...todos, new TodoItem(newTodo)]);
    },
    onSetIsDone: (id: string, isDone: boolean) => {
      setTodos(
        todos.map((m) => {
          if (m.id === id) {
            m.isDone = isDone;
          }
          return m;
        })
      );
    },
    onDelete: (id: string) => {
      setTodos(todos.filter((f) => f.id !== id));
    },
  };

  return (
    <div>
      <div style={styles.inputContainer}>
        <input
          style={styles.todoInputBox}
          type={"text"}
          value={newTodo}
          onChange={(e) => setNewTodo(e.currentTarget.value)}
        />
        <button style={styles.addBtn} onClick={eHandlers.onAddTodo}>
          {"Add"}
        </button>
      </div>
      {todos.map((m) => (
        <ListItem
          item={{ id: m.id, label: m.label, isDone: m.isDone }}
          onClick={(id, isDone) => eHandlers.onSetIsDone(id, isDone)}
          onDelete={(id) => eHandlers.onDelete(id)}
        />
      ))}
    </div>
  );
};

const ListItem = (props: {
  item: TodoItem;
  onClick: (id: string, isDone: boolean) => void;
  onDelete: (id: string) => void;
}) => {
  const styles = {
    mainContainer: {
      display: "flex",
      margin: "10px 0px 10px 0px",
    } as React.CSSProperties,
    checkboxComponent: { flex: 1 } as React.CSSProperties,
    isDone: { textDecoration: "line-through" } as React.CSSProperties,
  };

  const {
    item: { id, label, isDone },
    onClick,
    onDelete,
  } = props;
  return (
    <div style={styles.mainContainer}>
      <div style={styles.checkboxComponent}>
        <input
          type={"checkbox"}
          checked={isDone}
          onChange={(e) => onClick(id, e.currentTarget.checked)}
        />
        <span style={isDone ? styles.isDone : {}}>{label}</span>
      </div>
      <DeleteFilled onClick={() => onDelete(id)} />
    </div>
  );
};

export default Todo;
