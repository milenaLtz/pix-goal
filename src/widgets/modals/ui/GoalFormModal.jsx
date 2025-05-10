import { GoalAdditionForm } from "../../../features/GoalCreation";


const GoalFormModal = (props) => {
  return (
    <>
      <div className="modal">
        <div className="modal__container">
          <h2 className="modal__title">Новая цель</h2>
          <button className="modal__button-close" onClick={props.onClose}></button>
          <GoalAdditionForm onClose={props.onClose} userId={props.userId} accessToken={props.accessToken}/>
        </div>
      </div>
    </>
  )
}
export default GoalFormModal;
