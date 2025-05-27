import { useState, useEffect } from "react";
import setTaskDone from "../api/setTaskDone";
import editPixels from "../../pixel/api/editPixels";
import getPixelsForTask from "../api/getPixelsForTask";
import { createPortal } from "react-dom";
import { DeleteModal, InfoModal } from "../../../widgets/modals";
import deleteTask from "../api/deleteTask";
import getPixelWord from "../utils/getPixelWord";
import './_task.scss';
import TaskInfoModal from "../../../widgets/modals/ui/TaskInfoModal";

const Task = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [response, setResponse] = useState('');
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [isTaskInfoModalOpen, setIsTaskInfoModalOpen] = useState(false);


  const handleCheckButtonClick = async (event) => {
    event.preventDefault();

    if (isChecked || props.status === 'DONE') return;

    try {
      await setTaskDone(props.task, props.accessToken);
      setIsChecked(true);

      const currentPixels = await getPixelsForTask(props.task?.goalId, props.accessToken);

      const parsedCurrentPixels = currentPixels.pixelData
        ? JSON.parse(currentPixels.pixelData)
        : [];

      const taskPixels = props.task.taskImage
        ? JSON.parse(props.task.taskImage)
        : [];

      const mergedPixels = [
        ...parsedCurrentPixels,
        ...taskPixels.map(pixel => ({
          ...pixel,
          taskId: props.task.id
        }))
      ];

      await editPixels({
        id: currentPixels.id,
        goalId: props.task.goalId,
        pixelData: JSON.stringify(mergedPixels)
      }, props.accessToken);

      props.setTaskCompleted(true);

    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const toggleTaskInfoModal = () => {
    setIsTaskInfoModalOpen(!isTaskInfoModalOpen);
  }

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  }

  const handleDeleteTask = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const taskId = props.task.id;
      const currentGoalId = props.task.goalId;
      const currentPixels = await getPixelsForTask(currentGoalId, props.accessToken);
      console.log(currentPixels)
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

      await deleteTask(taskId, props.accessToken);

      await editPixels(modifiedPixels, props.accessToken);
      console.log(props.refreshTasks)
      // props.refreshTasks()
      setResponse('task deleted successful');
      console.log(response)
      console.log('task deleted')
      setDeleteModalOpen(false);
      console.log('modal closed')
      // setInfoModalOpen(true);
    } catch (error) {
      console.error('Error deleting task:', error);
      // response('task deletion failed');
      setResponse('task deletion failed');
      setDeleteModalOpen(false);
      setInfoModalOpen(true);
    }
  }

  useEffect(() => {
    if (response === 'task deleted successful' || response === 'task deletion failed') {
      setInfoModalOpen(true);
      console.log('info modal opened')
    }
  }, [response]);

  return(
      <>
      {deleteModalOpen &&
        createPortal(
          <DeleteModal
            message={`Вы действительно хотите удалить задачу: "${props.title}"?`}
            action={handleDeleteTask}
            closeModal={() => {
              props.setTaskDeleted(true);
              setDeleteModalOpen(false);
            }}
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
              props.setTaskDeleted(true);
              props.refreshTasks()
              setInfoModalOpen(false)
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
        {
          isTaskInfoModalOpen &&
          createPortal(
          <TaskInfoModal
            task={props.task}
            onClose={toggleTaskInfoModal}
            accessToken={props.accessToken}
            refreshTasks={props.refreshTasks}
          />,
          document.body
          )
        }
        <div className={`tasks-block__task task ${isChecked || props.status === 'DONE' ? "task--checked" : ""}`}>
          <div className="task__content-wrapper">
            <h3 className="task__title">{props.title}</h3>
            <p className="task__pixel-count"> {props.pixelCount} {getPixelWord(props.pixelCount)}</p>
          </div>
          <div className="task__button-wrapper">
            <button
              type="button"
              className={`task__button task__button--check ${isChecked || props.status === 'DONE' ? "task__button--checked" : ""}`}
              onClick={(event) => handleCheckButtonClick(event)}
              disabled={isChecked || props.status === 'DONE'}
            ></button>
            <button
              className={`task__button task__button--change ${isChecked || props.status === 'DONE' ? "task__button--no-change" : ""}`}
              disabled={isChecked || props.status === 'DONE'}
              onClick={toggleTaskInfoModal}
            ></button>
            <button
              className="task__button task__button--delete"
              onClick={(event) => handleDeleteModalOpen(event)}
            ></button>
          </div>
        </div>
      </>
  )
}
export default Task;
