import { useState } from "react";
// import setTaskDone from "../api/setTaskDone";
// import getPixels from "../../../widgets/PixiCanvas/api/getPixels";
// import editPixels from "../../pixel/api/editPixels";

const Task = (props) => {
  const [isChecked, setIsChecked] = useState(false);
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

  // useEffect(() => {
  //   getPixels(setPixels, props.task?.goalId, setPixelEntity)
  // }, []);

  // const renewPixels = (pixelEntity) => {
  //   return {...pixelEntity, pixelData: localStorage.getItem('pixels')}
  // }
  // const newPixelData = renewPixels(pixelEntity);
  // console.log('newPixelData in Task',newPixelData);

  const handleCheckButtonClick = (evt) => {
    evt.preventDefault();
    setIsChecked(true);

    // await setTaskDone(props.task);

    if (props.onAddPixel) {
      props.onAddPixel();
    }

    // setTimeout(() => {
    //   editPixels(renewPixels(pixelEntity));
    // }, 5000);
    // setTaskDone(props.task);
    // editPixels(renewPixels(pixelEntity))
  };

  return(
      <>
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
            <button className="task__button task__button--delete"></button>
          </div>
        </div>
      </>
  )
}
export default Task;
