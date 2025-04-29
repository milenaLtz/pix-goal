import TaskAdditionForm from "../../../features/TaskCreation/ui/TaskAdditionForm";


const TaskFormModal = ({ onClose, goalId }) => {
  return(
    <>
      <div className="modal">
        <div className="modal__container">
          <h2 className="modal__title">Новая задача</h2>
          <button className="modal__button-close"></button>
          <TaskAdditionForm goalId={goalId}/>
        </div>
      </div>
    </>
  )
}
export default TaskFormModal;
