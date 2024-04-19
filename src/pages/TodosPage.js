import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
  resetTodos,
  syncAddTodo,
  syncDeleteTodo,
  syncUpdateTodo,
} from '../store';
import { database } from '../firebase/firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import InputForm from '../components/InputForm';
import TodoList from '../components/TodoList';
import Header from '../components/Header';
import LoadingPage from './LoadingPage';

function TodosPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  const isLogin = useSelector((state) => state.user.isLogin);
  const nextPath = useSelector((state) => state.user.nextPath);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const isReloading = useSelector((state) => state.todos.isReloading);

  useEffect(() => {
    // login && path is /todos
    if (isLogin && location.pathname === '/todos') {
      if (nextPath === '/reload') {
        dispatch(resetTodos());
      }
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
    } else if (!isLogin && location.pathname === '/todos' && nextPath === '/') {
      navigate('/', { replace: true });
    }
  }, [isLogin]);

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
