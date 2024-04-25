import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { login } from '../store/userSlice';
import { PiNotePencilBold } from 'react-icons/pi';
import { fetchTodos } from '../store';
import { useThunk } from '../hooks/use-thunk';

function LoginPage() {
  const [doFetchTodos, isLoadingTodos, loadingTodosError] = useThunk(fetchTodos);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  const isLogin = useSelector((state) => state.user.isLogin);
  const nextPath = useSelector((state) => state.user.nextPath);

  useEffect(() => {
    // login -> to /todos
    if (isLogin && location.pathname === '/' && nextPath === '/todos') {
      navigate('/todos');
    }
  }, [isLogin, nextPath]);

  const handleLogin = () => {
    dispatch(login());
    doFetchTodos();
  };

  if (isLoadingTodos) {
    return <LoginPage />;
  } else {
    return (
      <div className="login-page">
        <div className="login-container">
          <h1>
            <PiNotePencilBold />
            Todos
          </h1>
          <div>
            <p>An todo web app.</p>
          </div>
          <button onClick={handleLogin}>Login with Google</button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
