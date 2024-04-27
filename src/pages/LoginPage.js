import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { login } from '../store/userSlice';
import { PiNotePencilBold } from 'react-icons/pi';
import { useThunk } from '../hooks/use-thunk';

function LoginPage() {
  const [doLogin, isLoadingLogin, loadingLoginError] = useThunk(login);
  const navigate = useNavigate();
  let location = useLocation();
  const isLogin = useSelector((state) => state.user.isLogin);
  const nextPath = useSelector((state) => state.user.nextPath);

  useEffect(() => {
    let token = localStorage.getItem('token');
    // login -> to /todos
    if (isLogin && token && location.pathname === '/') {
      navigate('/todos');
    }
  }, [isLogin, nextPath]);

  const handleLogin = () => {
    doLogin();
  };

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

export default LoginPage;
