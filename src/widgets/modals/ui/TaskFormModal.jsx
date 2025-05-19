import TaskAdditionForm from "../../../features/TaskCreation/ui/TaskAdditionForm";


const TaskFormModal = ({ onClose, goalId, accessToken, refreshTasks }) => {
  return(
    <>
      <div className="modal">
        <div className="modal__container">
          <h2 className="modal__title">Новая задача</h2>
          <button className="modal__button-close" onClick={onClose}></button>
          <TaskAdditionForm
            goalId={goalId}
            onClose={onClose}
            accessToken={accessToken}
            refreshTasks={refreshTasks}
          />
        </div>
      </div>
    </>
  )
}
export default TaskFormModal;
