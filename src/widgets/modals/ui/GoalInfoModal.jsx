import { useState } from "react";
import Input from "../../../shared/ui/Input/ui/Input";
import updateGoal from "../api/updateGoal";


const GoalInfoModal = (props) => {
  // eslint-disable-next-line
  const [response, setResponse] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [goalData, setGoalData] = useState({
    id: props.goal.id,
    userId: props.goal.userId,
    goalName: props.goal.goalName,
    goalDescription: props.goal.goalDescription,
    dateOfStart: props.goal.dateOfStart,
    dateOfAchievement: props.goal.dateOfAchievement,
    deadlineDate: props.goal.deadlineDate,
    goalColor: props.color,
    canvasSizeX: props.canvasSizeX,
    canvasSizeY: props.canvasSizeY,
    goalImage: props.goal.goalImage,
    status: props.goal.status,
    pixelsInTotal: props.goal.pixelsInTotal,
    freePixels: props.goal.freePixels
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageSelect = (image) => {
    setGoalData((prevData) => ({
      ...prevData,
      goalImage: image,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await updateGoal(goalData, props.accessToken, setResponse);

      props.onClose();
      // props.onUpdate(goalData);
    } catch (error) {
      console.error('Ошибка при обновлении цели:', error);
    }
  };

  return(
    <>
      <div className="modal">
        <div className="modal__container">
          {
            isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="modal__edit-image">
                <img src={props.image} alt="" width={80} height={80} />
                <ul className='goal-form__button-list'>
                  {['books', 'flower-park', 'flower', 'heart2', 'money'].map((image, index) => (
                    <li key={index}>
                      <button className={`goal-form__image-button goal-form__image-button--${image}`} type="button" onClick={() => handleImageSelect(image)}>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal__title-edit">
                <Input
                  name="goalName"
                  value={goalData.goalName}
                  onChange={handleInputChange}
                />
              </div>

              <button className="modal__button-close" onClick={props.onClose}></button>

              <div className="modal__content-wrapper">
                <div className="modal__content-item">
                  <p className="modal__item-title">Описание цели</p>
                  <textarea
                    className="modal__textarea"
                    name="goalDescription"
                    value={goalData.goalDescription}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal__content-item">
                  <p className="modal__item-title">Цвет канваса</p>
                  <Input
                    type="color"
                    name="goalColor"
                    value={goalData.goalColor}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal__content-item">
                  <p className="modal__item-title">Ширина канваса</p>
                  <Input
                    type="number"
                    name="canvasSizeX"
                    value={goalData.canvasSizeX}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal__content-item">
                  <p className="modal__item-title">Высота канваса</p>
                  <Input
                    type="number"
                    name="canvasSizeY"
                    value={goalData.canvasSizeY}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="modal__actions">
                <button
                  type="button"
                  className="modal__button button button--secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="modal__button button button--secondary"
                >
                  Сохранить
                </button>
              </div>
            </form>
            ) : (
            <>
              <img src={props.image} alt="" width={80} height={80} style={{marginBottom: "30px", borderRadius: "5px"}}/>
              <h2 className="modal__title">{props.title}</h2>
              <button className="modal__button-close" onClick={props.onClose}></button>
              <div className="modal__content-wrapper">
                <div className="modal__content-item">
                  <p className="modal__item-title">Описание цели</p>
                  <p className="modal__item-value">{props.goal.goalDescription}</p>
                </div>
                <div className="modal__content-item">
                  <p className="modal__item-title">Цвет канваса</p>
                  <p className="modal__item-value">{props.goal.goalColor}</p>
                </div>
                <div className="modal__content-item">
                  <p className="modal__item-title">Ширина канваса</p>
                  <p className="modal__item-value">{String(props.goal.canvasSizeX)}</p>
                </div>
                <div className="modal__content-item">
                  <p className="modal__item-title">Высота канваса</p>
                  <p className="modal__item-value">{String(props.goal.canvasSizeY)}</p>
                </div>
              </div>
              <button
                className="modal__button button button--secondary"
                onClick={() => setIsEditing(true)}
              >
                Редактировать
              </button>
            </>
            )
          }
        </div>
      </div>
    </>
  )
}
export default GoalInfoModal;
