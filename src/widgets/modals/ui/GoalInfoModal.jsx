const GoalInfoModal = (props) => {
  console.log(props.cavasSizeX)
  return(
    <>
      <div className="modal">
        <div className="modal__container">
          <img src={props.image} alt=""/>
          <h2 className="modal__title">{props.title}</h2>
          <button className="modal__button-close" onClick={props.onClose}></button>
          <div className="modal__content-wrapper">
            <div>
              <p>Описание цели</p>
              <p>{props.description}</p>
            </div>
            <div>
              <p>Цвет канваса</p>
              <p>{props.color}</p>
            </div>
            <div>
              <p>Ширина канваса</p>
              <p>{String(props.canvasSizeX)}</p>
            </div>
            <div>
              <p>Высота канваса</p>
              <p>{String(props.canvasSizeY)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default GoalInfoModal;
