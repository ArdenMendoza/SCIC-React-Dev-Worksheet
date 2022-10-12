import { DeleteFilled } from "@ant-design/icons";
import {
  addDoc,
  collection,
  deleteDoc,
  doc, getDocs,
  updateDoc
} from "firebase/firestore";
import React, { useContext } from "react";
import GoogleButton from "react-google-button";
import { AuthContext } from "../firebase/AuthContext";
import { firebaseDb } from "../firebase/firebase-config";

class TodoItem {
  id?: string;
  constructor(
    public label: string,
    public isDone: boolean,
    public owner: string
  ) {}
}

const Todo = () => {
  const [newTodo, setNewTodo] = React.useState("");
  const [todos, setTodos] = React.useState<TodoItem[]>([]);

  const todosCollectionRef = collection(firebaseDb, "todoItems");

  const { user, googleSignIn, googleSignOut } = useContext(AuthContext);

  const getTodos = async () => {
    const data = await getDocs(todosCollectionRef);
    const todosData = data.docs
      .filter((f) => (f.data() as TodoItem).owner === user?.email)
      .map((doc) => {
        const document = doc.data() as TodoItem;
        return {
          ...doc.data(),
          id: doc.id,
          label: document.label,
          isDone: document.isDone,
          owner: document.owner,
        };
      });
    setTodos(todosData);
  };

  React.useEffect(() => {
    user && getTodos();
  }, [user]);

  const styles = {
    inputContainer: {
      display: "flex",
      alignItems: "center",
    } as React.CSSProperties,
    todoInputBox: { marginRight: 5, fontSize: 20 } as React.CSSProperties,
    addBtn: { fontSize: 14, padding: 5 } as React.CSSProperties,
    centerAlign: {
      margin: "20px 0px 20px 0px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      columnGap: 10,
    } as React.CSSProperties,
  };

  const eHandlers = {
    handleGoogleSignin: async () => {
      try {
        const signInResponse = await googleSignIn();
        console.log((signInResponse as any).user);
      } catch (error) {
        console.log({ error });
      }
    },
    handleGoogleSignOut: async () => {
      try {
        await googleSignOut();
      } catch (error) {
        console.log({ error });
      }
    },
    onAddTodo: async () => {
      setNewTodo("");
      user?.email &&
        (await addDoc(todosCollectionRef, {
          ...new TodoItem(newTodo, false, user.email),
        }));
      getTodos();
    },
    onSetIsDone: async (id: string, isDone: boolean) => {
      const newFields = { isDone };
      const todoItem = doc(firebaseDb, "todoItems", id);
      await updateDoc(todoItem, newFields);
      getTodos();
    },
    onDelete: async (id: string) => {
      const todoItem = doc(firebaseDb, "todoItems", id);
      await deleteDoc(todoItem);
      getTodos();
    },
  };

  return user ? (
    <div>
      <div style={styles.centerAlign}>
        <div>{`Welcome ${(user as any).displayName}! `}</div>
      </div>
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
          item={{ id: m.id, label: m.label, isDone: m.isDone, owner: m.owner }}
          onClick={(id, isDone) => eHandlers.onSetIsDone(id, isDone)}
          onDelete={(id) => eHandlers.onDelete(id)}
        />
      ))}
      <div style={styles.centerAlign}>
        <button style={styles.addBtn} onClick={eHandlers.handleGoogleSignOut}>
          {"Sign Out"}
        </button>
      </div>
    </div>
  ) : (
    <div style={{ display: "flex", flexDirection: "column", rowGap: 20 }}>
      <div>{"Login to start using Todo List App"}</div>
      <GoogleButton onClick={eHandlers.handleGoogleSignin} />
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
          onChange={(e) => id && onClick(id, e.currentTarget.checked)}
        />
        <span style={isDone ? styles.isDone : {}}>{label}</span>
      </div>
      <DeleteFilled onClick={() => id && onDelete(id)} />
    </div>
  );
};

export default Todo;
