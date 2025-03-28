import { useState, useEffect } from "react";
import './_user-block.scss'
import getUsers from "../api/getUsers";


const User = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUsers(setUser);
  }, []);

  console.log(user[2])

  return(
      <>
        <section className="main-page__block block user-block">
          <div className="user-block__wrapper">
            <dl className="user-block__list">
              <div className="user-block__item">
                <dt className="user-block__item-title">Имя пользоателя</dt>
                {
                  user.length >=1 && <dd className="user-block__item-description">{user[2].userName} {user[2].userSurname}</dd>
                }
              </div>
              <div className="user-block__item">
                <dt className="user-block__item-title">Электронная почта</dt>
                {
                  user.length >=1 && <dd className="user-block__item-description">{user[2].email}</dd>
                }
              </div>
              <div className="user-block__item">
                <dt className="user-block__item-title">Количество целей</dt>
                {
                  user.length >=1 && <dd className="user-block__item-description">{user[2].goalNumber}</dd>
                }
              </div>
              <div className="user-block__item">
                <dt className="user-block__item-title">Общий процент достижения</dt>
                {
                  user.length >=1 && <dd className="user-block__item-description">{user[2].goalNumber / user[2].goalNumber * 100}%</dd>
                }
              </div>
              <div className="user-block__item">
                <dt className="user-block__item-title">Достигнутые цели</dt>
                {
                  user.length >=1 && <dd className="user-block__item-description">{user[2].goalNumber}</dd>
                }
              </div>
              <div>
                <button className="user-block__button button button--secondary">Изменить</button>
              </div>
            </dl>
          </div>
        </section>
      </>
  )
}
export default User;
