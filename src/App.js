import {useEffect} from "react";
import {useDispatch} from 'react-redux';
import {fetchTodos} from "./store/todosSlice";
import {database} from "./firebase/firebase";
import {collection, query, onSnapshot} from "firebase/firestore";
import InputForm from "./components/InputForm";
import TodoList from "./components/TodoList";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(database, "todos"));
    onSnapshot(q, (snapshot) => {
      dispatch(fetchTodos());
    });
  }, [dispatch])

  return (
    <>
      <InputForm />
      <TodoList />
    </>
  );
}

export default App;
