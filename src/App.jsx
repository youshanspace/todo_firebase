import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { fetchTodos, resetTodos, setUser } from './store';

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem('token');
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // login
        if (!token && isLogin) {
          localStorage.setItem('token', new Date().toISOString());
          dispatch(fetchTodos());
          navigate('/todos');
        } else if (token && !isLogin) {
          // reload
          dispatch(
            setUser({
              uid: user.uid,
              name: user.displayName,
              imgURL: user.photoURL,
              email: user.email,
            }),
          );
          dispatch(resetTodos());
          dispatch(fetchTodos());
        }
      } else {
        // logout
        localStorage.clear();
        navigate('/', { replace: true });
      }
    });
    return () => unsuscribe();
  }, [isLogin, dispatch, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
