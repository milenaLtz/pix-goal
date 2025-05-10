import { Link } from "react-router-dom";
import './_main.scss';

const MainPage = () => {
  return(
    <>
      <div className="main">
        <header className="main__header">
          <Link className="main__link" to='/'>
            <h1>PixGoal</h1>
          </Link>
          <div className="main__link-wrapper">
          <Link className="main__link--auth button button--primary" to='/sign-in'>Войти</Link>
          <Link className="main__link--auth button button--primary" to='/sign-up'>Зарегистироваться</Link>
          </div>
        </header>
        <main className="main__body">
          <div className="main__body-wrapper">
            <p className="main__introduction">Превратите ежедневные успехи в Ваше уникальное произведение искусства</p>
            <p className="main__description">Создавайте
            новый проект и начинайте заполнять холст пикселями за каждую выполненую задачу</p>
          </div>
        </main>
        <div className="main__deco1"></div>
        <div className="main__deco2"></div>
        <div className="main__deco3"></div>
      </div>
    </>
  )
}
export default MainPage;
