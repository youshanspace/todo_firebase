import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice';
import { PiNotePencilBold, PiCaretLeftBold, PiCaretDownBold } from 'react-icons/pi';
import { FaRegUser } from 'react-icons/fa6';
import { BiLogoGmail } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import userImgURL from '../images/user.png';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const refElement = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    const handler = (e) => {
      if (!refElement.current) return;
      if (!refElement.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler);
  }, []);

  const handlePanelOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header-container">
      <h1>
        <PiNotePencilBold /> Todos
      </h1>
      <div className="dropdown-container" ref={refElement} onClick={handlePanelOpen}>
        <figure>
          <img src={user.imgURL || userImgURL} alt="user profile" />
        </figure>
        <span className="arrow-button">{isOpen ? <PiCaretDownBold /> : <PiCaretLeftBold />}</span>
        <div className={isOpen ? 'panel' : 'hide'}>
          <div className="panel-name">
            <FaRegUser /> {user.name}
          </div>
          <div className="panel-email">
            <BiLogoGmail /> {user.email}
          </div>
          <div className="panel-logout" onClick={handleLogout}>
            <FiLogOut /> Logout
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
