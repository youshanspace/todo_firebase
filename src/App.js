import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { fetchTodos, setNextPath, setUser } from './store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TodosPage from './pages/TodosPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    let token = localStorage.getItem('token');
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // login
        if (!token && isLogin) {
          localStorage.setItem('token', new Date().toISOString());
          dispatch(fetchTodos());
          dispatch(setNextPath('/todos'));
        } else if (token && !isLogin) {
          // reload
          dispatch(setNextPath('/reload'));
          dispatch(
            setUser({
              uid: user.uid,
              name: user.displayName,
              imgURL: user.photoURL,
              email: user.email,
            }),
          );
          dispatch(fetchTodos());
        }
      } else {
        // logout
        localStorage.clear();
        dispatch(setNextPath('/'));
      }
    });
    return () => unsuscribe();
  }, [isLogin]);

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
