import { DeleteFilled } from "@ant-design/icons";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { firebaseDb } from "../firebase/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc
} from "firebase/firestore";

class TodoItem {
  id: string;
  constructor(public label: string, public isDone: boolean) {
    this.id = uuidv4();
  }
}

const Todo = () => {
  const [newTodo, setNewTodo] = React.useState("");
  const [todos, setTodos] = React.useState<TodoItem[]>([]);

  const todosCollectionRef = collection(firebaseDb, "todoItems");
  const getTodos = async () => {
    const data = await getDocs(todosCollectionRef);
    const todosData = data.docs.map((doc) => {
      const document = doc.data() as TodoItem;
      return {
        ...doc.data(),
        id: doc.id,
        label: document.label,
        isDone: document.isDone,
      };
    });
    setTodos(todosData);
  };

  React.useEffect(() => {
    getTodos();
  }, []);

  const styles = {
    inputContainer: {
      display: "flex",
      alignItems: "center",
    } as React.CSSProperties,
    todoInputBox: { marginRight: 5, fontSize: 20 } as React.CSSProperties,
    addBtn: { fontSize: 14, padding: 5 } as React.CSSProperties,
  };

  const eHandlers = {
    onAddTodo: async () => {
      await addDoc(todosCollectionRef, { ...new TodoItem(newTodo, false) });
      getTodos();
    },
    onSetIsDone: async (id: string, isDone: boolean) => {
      const newFields = { isDone };
      const todoItem = doc(firebaseDb, "todoItems", id);
      await updateDoc(todoItem, newFields);
      getTodos();
    },
    onDelete: async (id: string) => {
      const todoItem = doc(firebaseDb, 'todoItems', id)
      await deleteDoc(todoItem)
      getTodos()
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
