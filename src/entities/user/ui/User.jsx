import { useState, useEffect } from "react";
import './_user-block.scss'
import getUsers from "../api/getUsers";
import UserChangeInfoModal from "../../../widgets/modals/ui/UserChangeInfoModal";


const User = (props) => {
  const [user, setUser] = useState([]);
  const currentUserEmail = localStorage.getItem('currentUserEmail');
  const [currentUser, setCurrentUser] = useState({});
  const [isUserChangeInfoModal, setIsUserChangeInfoModal] = useState(false);
  const [userChangeResponse, setUserChangeResponse] = useState('');
  console.log(userChangeResponse)

  useEffect(() => {
    getUsers((fetchedUsers) => {
      setUser(fetchedUsers);

      const currentUser = fetchedUsers.find(u => u.email === currentUserEmail);
      if (currentUser) {
        setCurrentUser(currentUser);
        props.setUserName(currentUser.userName);
        props.setUserId(currentUser.id);
      }
    }, props.accessToken);
  }, [currentUserEmail, props]);

  useEffect(() => {
    if(user.length !== 0) {
      props.setUserName(currentUser.userName)
      props.setUserId(currentUser.id)
    }
  })

  const toggleUserChangeInfoModal = () => {
    setIsUserChangeInfoModal(!isUserChangeInfoModal);
  };

  const refreshUser = () => {
  return new Promise((resolve) => {
    getUsers((fetchedUsers) => {
      setUser(fetchedUsers);

      const currentUser = fetchedUsers.find(u => u.email === currentUserEmail);
      if (currentUser) {
        setCurrentUser(currentUser);
        props.setUserName(currentUser.userName);
        props.setUserId(currentUser.id);
      }
      resolve();
    }, props.accessToken);
  });
}

  console.log(currentUser.id)

  return(
      <>
        {
          isUserChangeInfoModal &&
          <UserChangeInfoModal
            user={currentUser}
            onClose={toggleUserChangeInfoModal}
            accessToken={props.accessToken}
            setUserChangeResponse={setUserChangeResponse}
            refreshUser={refreshUser}
          />
        }
        <section className="main-page__block block user-block">
          <div className="user-block__wrapper">
            <dl className="user-block__list">
              <div className="user-block__item">
                <dt className="user-block__item-title">Имя пользоателя</dt>
                {
                  user.length >=1 && <dd className="user-block__item-description">{currentUser.userName} {currentUser.userSurname}</dd>
                }
              </div>
              <div className="user-block__item">
                <dt className="user-block__item-title">Электронная почта</dt>
                {
                  user.length >=1 && <dd className="user-block__item-description">{currentUser.email}</dd>
                }
              </div>
              <div className="user-block__item">
                <dt className="user-block__item-title">Количество целей</dt>
                {
                  user.length >=1 && <dd className="user-block__item-description">{currentUser.goalNumber}</dd>
                }
              </div>
              <div className="user-block__item">
                <dt className="user-block__item-title">Общий процент достижения</dt>
                {
                  user.length >=1 && <dd className="user-block__item-description">{currentUser.goalNumber / currentUser.goalNumber * 100}%</dd>
                }
              </div>
              <div className="user-block__item">
                <dt className="user-block__item-title">Достигнутые цели</dt>
                {
                  user.length >=1 && <dd className="user-block__item-description">{currentUser.goalNumber}</dd>
                }
              </div>
              <div>
                <button
                  className="user-block__button button button--primary"
                  onClick={toggleUserChangeInfoModal}
                >Изменить</button>
              </div>
            </dl>
          </div>
        </section>
      </>
  )
}
export default User;
