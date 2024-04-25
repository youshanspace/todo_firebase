import { createContext, useCallback, useState } from 'react';
import { database } from '../firebase/firebase';
import { onSnapshot, collection, doc, setDoc, updateDoc, deleteDoc, query } from 'firebase/firestore';

const ApisContext = createContext();

function Provider({ children }) {
  const [todos, setTodos] = useState([]);

  const fetchTodos = useCallback(() => {
    const q = query(collection(database, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ id: doc.id, ...doc.data() });
      });
      setTodos(todosArr);
    });

    return () => unsubscribe();
  }, []);

  const createTodo = async (title) => {
    try {
      const customId = Date.now().toString();
      const newTodo = { title, completed: false };
      await setDoc(doc(database, 'todos', customId), newTodo);
    } catch (e) {
      console.error('Error creating new todo: ', e);
    }
  };

  const editTodo = async (newTodo) => {
    try {
      const todoRef = doc(database, 'todos', newTodo.id);
      const updatedTodo = {
        title: newTodo.title,
        completed: newTodo.completed,
      };
      await updateDoc(todoRef, updatedTodo);
    } catch (e) {
      console.error('Error editing new todo: ', e);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(database, 'todos', id));
    } catch (e) {
      console.error('Error deleting new todo: ', e);
    }
  };

  const contextObj = {
    todos,
    fetchTodos,
    createTodo,
    editTodo,
    deleteTodo,
  };

  return <ApisContext.Provider value={contextObj}>{children}</ApisContext.Provider>;
}

export default ApisContext;
export { Provider };
