import { useState } from "react";
import Input from "../../../shared/ui/Input/ui/Input";
import updateTask from "../api/updateTask";

const TaskInfoModal = (props) => {
  // eslint-disable-next-line
  const [response, setResponse] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [taskData, setTaskData] = useState({
    id: props.task.id,
    goalId: props.task.goalId,
    taskName: props.task.taskName,
    taskDescription: props.task.taskDescription,
    dateOfStart: props.task.dateOfStart,
    dateOfEnd: props.task.dateOfEnd,
    status: props.task.status,
    taskImage: props.task.taskImage,
    numberOfPixels: props.task.numberOfPixels
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: new Date(value).toISOString()
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(taskData, props.accessToken, setResponse);

      props.refreshTasks();
      props.onClose();
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error);
    }
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };


  return(
    <>
      <div className="modal">
        <div className="modal__container">
          {
            isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="modal__edit-header">
                  <div  className="modal__title-edit modal__title-edit--task">
                    <Input
                      name="taskName"
                      value={taskData.taskName}
                      onChange={handleInputChange}
                      placeholder="Название задачи"
                    />
                  </div>
                  <button
                    type="button"
                    className="modal__button-close"
                    onClick={props.onClose}
                  >
                  </button>
                </div>

                <div className="modal__content-wrapper">
                  <div className="modal__content-item">
                    <p className="modal__item-title">Описание задачи</p>
                    <textarea
                      className="modal__textarea"
                      name="taskDescription"
                      value={taskData.taskDescription}
                      onChange={handleInputChange}
                      placeholder="Описание задачи"
                    />
                  </div>

                  <div className="modal__content-item">
                    <p className="modal__item-title">Количество пикселей</p>
                    <Input
                      type="number"
                      name="numberOfPixels"
                      value={taskData.numberOfPixels}
                      onChange={handleInputChange}
                      min="1"
                    />
                  </div>

                  <div className="modal__content-item">
                    <p className="modal__item-title">Дата начала</p>
                    <Input
                      type="date"
                      name="dateOfStart"
                      value={formatDateForInput(taskData.dateOfStart)}
                      onChange={handleDateChange}
                    />
                  </div>

                  <div className="modal__content-item">
                    <p className="modal__item-title">Дата окончания</p>
                    <Input
                      type="date"
                      name="dateOfEnd"
                      value={formatDateForInput(taskData.dateOfEnd)}
                      onChange={handleDateChange}
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
                <h2 className="modal__title">{props.task.taskName}</h2>
                <button className="modal__button-close" onClick={props.onClose}></button>
                <div className="modal__content-wrapper">
                    <div className="modal__content-item">
                      <p className="modal__item-title">Описание задачи</p>
                      <p className="modal__item-value">{props.task.taskName}</p>
                    </div>
                    <div className="modal__content-item">
                      <p className="modal__item-title">Количество пикселей</p>
                      <p className="modal__item-value">{props.task.numberOfPixels}</p>
                    </div>
                    <div className="modal__content-item">
                      <p className="modal__item-title">Дата начала</p>
                      <p className="modal__item-value">{new Date(props.task.dateOfStart).toLocaleDateString()}</p>
                    </div>
                    <div className="modal__content-item">
                      <p className="modal__item-title">Дата конца</p>
                      <p className="modal__item-value">{new Date(props.task.dateOfEnd).toLocaleDateString()}</p>
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
export default TaskInfoModal;
