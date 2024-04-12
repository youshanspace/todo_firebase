import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {fetchTodos, addTodoToStore, updateTodoToStore, removeTodoFromStore} from "./store";
import {database} from "./firebase/firebase";
import {collection, query, onSnapshot} from "firebase/firestore";
import InputForm from "./components/InputForm";
import TodoList from "./components/TodoList";

function App() {
  const dispatch = useDispatch();
  const firstFetch = useSelector(state => state.todos.firstFetch);

  useEffect(() => {
    const q = query(collection(database, "todos"));
    onSnapshot(q, (snapshot) => {
      for(let change of snapshot.docChanges()) {
        let changeType = change.type;
        switch(changeType) {
          case 'added':
            if(firstFetch) {
              dispatch(fetchTodos());
            } else {
              let { title, createdTime, completed } = { ...change.doc.data() }
              const todo = { id: change.doc.id, title, completed, createdTime };
              dispatch(addTodoToStore(todo));
            }
            break;
          case 'modified':
            let { title, createdTime, completed } = { ...change.doc.data() }
            const todo = { id: change.doc.id, title, completed, createdTime };
            dispatch(updateTodoToStore(todo));
            break;
          case 'removed':
            dispatch(removeTodoFromStore(change.doc.id));
            break;
          default:
            break;
        }
        
      }
    });
  }, [dispatch, firstFetch])

  return (
    <>
      <InputForm />
      <TodoList />
    </>
  );
}

export default App;
