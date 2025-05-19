import { useEffect, useState } from "react";
import { Task } from "../../../entities/task";
import getTasks from "../api/getTasks";
import { createPortal } from "react-dom";
import TaskFormModal from "../../modals/ui/TaskFormModal";
import './_tasks-block.scss'


const Tasks = ({ accessToken, onAddPixel, goalId, setTaskCompleted, taskCompleted, setTaskDeleted, taskDeleted}) => {

    const [taskFormOpen, setTaskFormOpen] = useState(false);

    const [tasks, setTasks] = useState([]);
    useEffect(() => {
      getTasks(setTasks, accessToken);
    }, [taskCompleted, accessToken]);

    const handleOpenTaskForm = () => {
      setTaskFormOpen(!taskFormOpen);
    }

    const refreshTasks = () => {
      getTasks(setTasks, accessToken);
    };

    return(
        <>
        {taskFormOpen &&
          createPortal(
          <TaskFormModal
            onClose={handleOpenTaskForm}
            goalId={goalId}
            accessToken={accessToken}
            refreshTasks={refreshTasks}
          />,
          document.body
        )}
          <section className="main-page__block block tasks-block">
            <div className="tasks-block__wrapper">
              <h2 className="tasks-block__title">Задачи к цели</h2>
              <ul className="tasks-block__list">
                  {
                    tasks?.map((task, index) => {
                      return(
                        <>
                          {
                            task.goalId === Number(goalId) &&
                            <li key={task.id} className="tasks-block__item">
                              <Task
                                accessToken={accessToken}
                                task={task}
                                title={task.taskName}
                                pixelCount={task.numberOfPixels}
                                status={task.status}
                                onAddPixel={() => onAddPixel(task.numberOfPixels)}
                                setTaskCompleted={setTaskCompleted}
                                setTaskDeleted={setTaskDeleted}
                                refreshTasks={refreshTasks}
                              />
                            </li>
                          }
                        </>
                      )
                    })
                  }
              </ul>
              <div className="tasks-block__button-wrapper">
                <button className="tasks-block__button tasks-block__button--text button" onClick={handleOpenTaskForm}></button>
              </div>
            </div>
          </section>
        </>
    )
}
export default Tasks;
