import { useThunk } from '../hooks/use-thunk';
import { login } from '../store/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { PiNotePencilBold } from 'react-icons/pi';

function LoginPage() {
  const [doLogin, isLoadingLogin, loadingLoginError] = useThunk(login);
  const isLogin = useSelector((state) => state.user.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem('token');
    // reload
    if (token && !isLogin) {
      navigate('/todos');
    }
  }, [isLogin, navigate]);

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
