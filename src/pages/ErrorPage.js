import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className='error-page'>
      <div className='error-container'>
        <h1>404</h1>
        <h3>Page not found</h3>
        <p>
          The page you are looking for might be removed or is temporarily
          unavailable.
        </p>
        <button onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack /> Go Back
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
