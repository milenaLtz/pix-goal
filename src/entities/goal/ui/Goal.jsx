import { Link } from "react-router-dom";
import { useState } from "react";
import { DeleteModal, InfoModal } from '../../../widgets/modals';
import { createPortal } from "react-dom";
// import getGoal from "../api/getGoal";
import deleteGoal from "../api/deleteGoal";

const Goal = (props) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [response, setResponse] = useState('');
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
    // console.log("deleteMode", deleteModalOpen);
  };

  const handleDeleteGoal = () => {
    deleteGoal(setResponse, props.id);
    setDeleteModalOpen(false);
    setInfoModalOpen(true);
  };

  // console.log(response, props.image);

  return (
    <>
      {deleteModalOpen &&
        createPortal(
          <DeleteModal
            message={`Вы действительно хотите удалить цель: "${props.title}"?`}
            action={handleDeleteGoal}
            closeModal={() => setDeleteModalOpen(false)}
          />,
          document.body
        )}
      {infoModalOpen &&
        response === 'goal deleted successful' &&
        createPortal(
          <InfoModal
            message={`Все прошло отлично!
                      Цель "${props.title}"  была успешно удалена.`}
            result={response}
            closeModal={() => {
              setInfoModalOpen(false)
              window.location.reload();
            }}
          />,
          document.body
        )}
      {infoModalOpen &&
        response === 'goal deletion failed' &&
        createPortal(
          <InfoModal
            message={`Что-то пошло не так... \n
                      Цель "${props.title}" не была удалена.
                      Попробуйте позже еще раз.`}
            result={response}
            closeModal={() => setInfoModalOpen(false)}
          />,
          document.body
        )}
      <section className="card goal-card">
        <img
          className="goal-card__image"
          src={props.image}
          alt="иллюстрация к цели"
        />
        <div className="goal-card__content-wrapper">
          <div className="goal-card__info-wrapper">
            <Link to={"/goalPage/" + props.id} className="goal-card__link" onClick={localStorage.removeItem('pixels')}>
              <h3>{props.title}</h3>
            </Link>
            <p className="goal-card__progress">
              {props.freePixels} пикселей свободны
            </p>
          </div>
          <button
            className="goal-card__button goal-card__button--delete"
            onClick={handleDeleteModalOpen}
          ></button>
        </div>
      </section>
    </>
  );
};
export default Goal;
