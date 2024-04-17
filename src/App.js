import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from './firebase/firebase';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TodosPage from './pages/TodosPage';
import ErrorPage from './pages/ErrorPage';
import { fetchTodos, resetState, setLogin } from './store';

function App() {
  const dispatch = useDispatch();
  const firstFetch = useSelector((state) => state.todos.firstFetch);

  useEffect(() => {
    const unscribe = onAuthStateChanged(auth, (user) => {
      // refresh
      if (user && !firstFetch) {
        dispatch(resetState());
        dispatch(
          setLogin({
            uid: user.uid,
            name: user.displayName,
            imgURL: user.photoURL,
            email: user.email,
          })
        );
      }
    });
    return unscribe;
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <LoginPage /> },
        { path: '/todos', element: <TodosPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
