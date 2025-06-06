import { Link } from "react-router-dom";
import { useState } from "react";
import { DeleteModal, InfoModal } from '../../../widgets/modals';
import { createPortal } from "react-dom";
import deleteGoal from "../api/deleteGoal";
import getPixelWord from "../../task/utils/getPixelWord";
import './_goal-card.scss';


const Goal = (props) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [response, setResponse] = useState('');
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteGoal = () => {
    deleteGoal(setResponse, props.id, props.accessToken);
    setDeleteModalOpen(false);
    setInfoModalOpen(true);
  };

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
              props.refreshGoals();
              setInfoModalOpen(false)
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
      <Link to={"/goalPage/" + props.id} target="_blank" className="goal-card__link" onClick={localStorage.removeItem('pixels')}>
      <section className="card goal-card">
        <img
          className="goal-card__image"
          src={props.image}
          alt="иллюстрация к цели"
        />
        <div className="goal-card__content-wrapper">
          <div className="goal-card__info-wrapper">
              <h3>{props.title}</h3>
            <p className="goal-card__progress">
              {props.freePixels} {getPixelWord(props.freePixels)} свободны
            </p>
          </div>
          <button
            className="goal-card__button goal-card__button--delete"
            onClick={handleDeleteModalOpen}
          ></button>
        </div>
      </section>
      </Link>
    </>
  );
};
export default Goal;
