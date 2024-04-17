import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { login } from '../store/userSlice';
import { PiNotePencilBold } from 'react-icons/pi';

function LoginPage() {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.data.uid);
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    // login -> to /todos
    if (uid && location.pathname === '/') {
      navigate('/todos');
    }
  }, [uid]);

  const handleLogin = () => {
    dispatch(login());
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
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
