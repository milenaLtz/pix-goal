import { useState } from "react";
import Input from "../../../shared/ui/Input/ui/Input";
import updateUser from "../api/updateUser";

const UserChangeInfoModal = (props) => {

  // const [reponse, setResponse] = useState('');
  const [userData, setUserData] = useState({
    id: props.user.id,
    userName: props.user.userName,
    userSurname: props.user.userSurname,
    email: props.user.email,
    password: props.user.password,
    goalNumber: props.user.goalNumber
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(userData, props.accessToken, props.setUserChangeResponse);
      await props.refreshUser();
      props.onClose();
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error);
    }
  };

  return(
    <>
      <div className="modal">
        <div className="modal__container">
          <button className="modal__button-close" onClick={props.onClose}></button>
          <form onSubmit={handleSubmit}>
            <div className="modal__content-wrapper modal__content-wrapper--user">
              <div className="modal__content-item">
                <p className="modal__item-title">Имя</p>
                <Input
                  name="userName"
                  value={userData.userName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal__content-item">
                <p className="modal__item-title">Фамилия</p>
                <Input
                  name="userSurname"
                  value={userData.userSurname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal__content-item">
                <p className="modal__item-title">Почта</p>
                <Input
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="modal__actions">
              <button
                type="submit"
                className="modal__button button button--secondary"
              >
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default UserChangeInfoModal;
