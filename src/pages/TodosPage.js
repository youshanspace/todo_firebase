import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { syncAddTodo, syncDeleteTodo, syncUpdateTodo } from '../store';
import { database } from '../firebase/firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import InputForm from '../components/InputForm';
import TodoList from '../components/TodoList';
import Header from '../components/Header';
import LoadingPage from './LoadingPage';

function TodosPage() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const isReloading = useSelector((state) => state.todos.isReloading);

  useEffect(() => {
    // login
    if (isLogin) {
      const q = query(collection(database, 'todos'), orderBy('createdTime'));
      const unsuscribe = onSnapshot(q, (snapshot) => {
        for (let change of snapshot.docChanges()) {
          let changeType = change.type;
          switch (changeType) {
            case 'added': {
              let { title, createdTime, completed } = {
                ...change.doc.data(),
              };
              const todo = {
                id: change.doc.id,
                title,
                completed,
                createdTime,
              };
              dispatch(syncAddTodo(todo));
              break;
            }
            case 'modified':
              let { title, createdTime, completed } = {
                ...change.doc.data(),
              };
              const todo = {
                id: change.doc.id,
                title,
                completed,
                createdTime,
              };
              dispatch(syncUpdateTodo(todo));
              break;
            case 'removed':
              dispatch(syncDeleteTodo(change.doc.id));
              break;
            default:
              break;
          }
        }
      });
      return () => unsuscribe();
    }
  }, [isLogin, dispatch]);

  if (isReloading || isLoading) {
    return <LoadingPage />;
  } else {
    return (
      <>
        <Header />
        <InputForm />
        <TodoList />
      </>
    );
  }
}

export default TodosPage;
