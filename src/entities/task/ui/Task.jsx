import { useState } from "react";
import setTaskDone from "../api/setTaskDone";
import editPixels from "../../pixel/api/editPixels";
import getPixelsForTask from "../api/getPixelsForTask";
import { createPortal } from "react-dom";
import { DeleteModal, InfoModal } from "../../../widgets/modals";
import deleteTask from "../api/deleteTask";

const Task = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [response, setResponse] = useState('');
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  // const [pixels, setPixels] = useState([]);
  // const [pixelEntity, setPixelEntity] = useState({});

  const getPixelWord = (count) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return "пикселей";
    }
    if (lastDigit === 1) {
        return "пиксель";
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
        return "пикселя";
    }
    return "пикселей";
  };

  const handleCheckButtonClick = async (evt) => {
    evt.preventDefault();

    if (isChecked || props.taskStatus === '1') return;

    try {
      await setTaskDone(props.task);
      setIsChecked(true);

      const currentPixels = await getPixelsForTask(props.task?.goalId);
      // console.log('currentpixels: ', currentPixels);
      const parsedCurrentPixels = currentPixels.pixelData
        ? JSON.parse(currentPixels.pixelData)
        : [];
      // console.log('parsedCurrentpixels: ', parsedCurrentPixels);
      const taskPixels = props.task.taskImage
        ? JSON.parse(props.task.taskImage)
        : [];
      // console.log('taskpixels: ', taskPixels);
      const mergedPixels = [
        ...parsedCurrentPixels,
        ...taskPixels.map(pixel => ({
          ...pixel,
          taskId: props.task.id
        }))
      ];
      // console.log('mergedPixels: ', mergedPixels);
      await editPixels({
        id: currentPixels.id,
        goalId: props.task.goalId,
        pixelData: JSON.stringify(mergedPixels)
      });

      // 6. Обновляем UI если нужно
      // if (props.onAddPixel) {
      //   props.onAddPixel();
      // }
      props.setTaskCompleted(true);

    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  }

  const handleDeleteTask = async (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    try {
      const taskId = props.task.id;
      const currentGoalId = props.task.goalId;
      const currentPixels = await getPixelsForTask(currentGoalId);

      const parsedCurrentPixels = currentPixels.pixelData
        ? JSON.parse(currentPixels.pixelData)
        : [];

      const filteredPixels = parsedCurrentPixels.filter(
        pixel => pixel.taskId !== taskId
      );

      const modifiedPixels = {
        id: currentPixels.id,
        goalId: props.task.goalId,
        pixelData: JSON.stringify(filteredPixels)
      };

      await deleteTask(setResponse, taskId);

      await editPixels(modifiedPixels);

      props.setTaskDeleted(true);
      setDeleteModalOpen(false);
      setInfoModalOpen(true);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }



  return(
      <>
      {deleteModalOpen &&
        createPortal(
          <DeleteModal
            message={`Вы действительно хотите удалить задачу: "${props.title}"?`}
            action={handleDeleteTask}
            closeModal={() => setDeleteModalOpen(false)}
          />,
          document.body
        )}
      {infoModalOpen &&
        response === 'task deleted successful' &&
        createPortal(
          <InfoModal
            message={`Все прошло отлично!
                      Задача "${props.title}"  была успешно удалена.`}
            result={response}
            closeModal={() => {
              setInfoModalOpen(false)
              window.location.reload();
            }}
          />,
          document.body
        )}
      {infoModalOpen &&
        response === 'task deletion failed' &&
        createPortal(
          <InfoModal
            message={`Что-то пошло не так... \n
                      Задача "${props.title}" не была удалена.
                      Попробуйте позже еще раз.`}
            result={response}
            closeModal={() => setInfoModalOpen(false)}
          />,
          document.body
        )}
        <div className={`tasks-block__task task ${isChecked || props.taskStatus === '1' ? "task--checked" : ""}`}>
          <div className="task__content-wrapper">
            <h3 className="task__title">{props.title}</h3>
            <p className="task__pixel-count"> {props.pixelCount} {getPixelWord(props.pixelCount)}</p>
          </div>
          <div className="task__button-wrapper">
            <button
              type="button"
              className={`task__button task__button--check ${isChecked || props.taskStatus === '1' ? "task__button--checked" : ""}`}
              onClick={(evt) => handleCheckButtonClick(evt)}
              disabled={isChecked || props.taskStatus === '1'}></button>
            <button className={`task__button task__button--change ${isChecked || props.taskStatus === '1' ? "task__button--no-change" : ""}`}></button>
            <button
              className="task__button task__button--delete"
              onClick={(evt) => handleDeleteModalOpen(evt)}
            ></button>
          </div>
        </div>
      </>
  )
}
export default Task;
