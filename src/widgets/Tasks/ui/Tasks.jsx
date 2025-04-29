import { useEffect, useState } from "react";
import { Task } from "../../../entities/task";
import getTasks from "../api/getTasks";
import { createPortal } from "react-dom";
import TaskFormModal from "../../modals/ui/TaskFormModal";


const Tasks = ({onAddPixel, goalId}) => {

    const [taskFormOpen, setTaskFormOpen] = useState(false);

    const [tasks, setTasks] = useState([]);
    useEffect(() => {
      getTasks(setTasks)
    }, []);

    const handleOpenTaskForm = () => {
      setTaskFormOpen(!taskFormOpen);
    }

    return(
        <>
        {taskFormOpen &&
          createPortal(
          <TaskFormModal onClose={handleOpenTaskForm} goalId={goalId}/>,
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
                              <Task task={task} title={task.taskName} pixelCount={task.numberOfPixels} taskStatus={task.taskStatus} onAddPixel={() => onAddPixel(task.numberOfPixels)}/>
                            </li>
                          }
                        </>
                      )
                    })
                  }
              </ul>
              <div className="tasks-block__button-wrapper">
                <button className="tasks_block__button tasks_block__button--text button" onClick={handleOpenTaskForm}>+</button>
              </div>
            </div>
          </section>
        </>
    )
}
export default Tasks;
