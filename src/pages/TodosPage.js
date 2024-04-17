import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
  fetchTodos,
  addTodoToStore,
  updateTodoToStore,
  removeTodoFromStore,
} from '../store';
import { database } from '../firebase/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import InputForm from '../components/InputForm';
import TodoList from '../components/TodoList';
import Header from '../components/Header';

function TodosPage() {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.data.uid);
  const firstFetch = useSelector((state) => state.todos.firstFetch);
  const isLoading = useSelector((state) => state.todos.firstFetch);
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    // login && path is /todos
    if (uid && location.pathname === '/todos') {
      const q = query(collection(database, 'todos'));
      onSnapshot(q, (snapshot) => {
        for (let change of snapshot.docChanges()) {
          let changeType = change.type;
          switch (changeType) {
            case 'added':
              if (firstFetch) {
                dispatch(fetchTodos());
              } else {
                let { title, createdTime, completed } = {
                  ...change.doc.data(),
                };
                const todo = {
                  id: change.doc.id,
                  title,
                  completed,
                  createdTime,
                };
                dispatch(addTodoToStore(todo));
              }
              break;
            case 'modified':
              let { title, createdTime, completed } = { ...change.doc.data() };
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
    } else if (!uid && location.pathname === '/todos') {
      // logout
      navigate('/', { replace: true });
    }
  }, [uid, firstFetch, navigate]);

  return (
    <>
      <Header />
      <InputForm />
      <TodoList />
    </>
  );
}

export default TodosPage;
