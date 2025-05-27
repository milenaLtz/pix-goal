import { Link, useNavigate } from "react-router-dom";
import avatar from '../../../shared/icons/default-avatar.svg';
import './_header.scss';


const Header = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('creationTokenDate');
      navigate('/sign-in');
      window.location.reload();
  }


    return(
        <>
            <header className="header">
                <div className="header-wrapper">
                    <div className="header__button-wrapper">
                      {/* <button className="header__button button button--sibe-bar-toggle"></button> */}
                      {/* <button className="header__button button">Создать</button> */}
                    </div>
                    <div className="header__user-info-wrapper">
                      <Link className="header__link" to="/homePage">
                        <img src={avatar} alt="sample" width={35} height={35}/>
                      </Link>
                      <button className="button" onClick={handleLogout}>Выйти</button>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Header;
