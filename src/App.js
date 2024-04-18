import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { setIsReloading, setNextPath, setUser } from './store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TodosPage from './pages/TodosPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    const unscribe = onAuthStateChanged(auth, (user) => {
      // refresh: user should be login
      if (user && !isLogin && window.location.pathname === '/todos') {
        dispatch(setNextPath('/reload'));
        dispatch(
          setUser({
            uid: user.uid,
            name: user.displayName,
            imgURL: user.photoURL,
            email: user.email,
          })
        );
      } else if (user && isLogin) {
        // login
        dispatch(setNextPath('/todos'));
      } else if (!user) {
        // logout
        dispatch(setNextPath('/'));
      }
    });
    return () => {
      unscribe();
    };
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
