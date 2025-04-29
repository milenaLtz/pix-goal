import { GoalAdditionForm } from "../../../features/GoalCreation";


const GoalFormModal = () => {
  return (
    <>
      <div className="modal">
        <div className="modal__container">
          <h2 className="modal__title">Новая цель</h2>
          <button className="modal__button-close"></button>
          <GoalAdditionForm/>
        </div>
      </div>
    </>
  )
}
export default GoalFormModal;
