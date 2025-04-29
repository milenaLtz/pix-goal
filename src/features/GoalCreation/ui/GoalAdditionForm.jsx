import Input from '../../../shared/ui/Input/ui/Input';
import { useEffect, useState } from 'react';
import addGoal from '../api/addGoal';
import './_goal-form.scss';
import addPixelData from '../api/addPixelData';

const GoalAdditionForm = () => {

  const [response, setResponse] = useState('');
  const [taskData, setTaskData] = useState({
    userId: 5,
    goalName: "",
    goalDescription: "",
    dateOfStart: "",
    dateOfAchievement: "",
    deadlineDate: "",
    goalImage: "",
    goalColor: "",
    canvasSizeX: 0,
    canvasSizeY: 0,
    status: 0
  })
  const [pixelData, setPixelData] = useState({
    pixelData: "",
    goalId: 0
  })
  const [responsePixels, setResponsePixels] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  };

  const handleImageSelect = (image) => {
    setTaskData((prevData) => ({
      ...prevData,
      goalImage: image,
    }));
  };

  const handleColorChange = (color) => {
    setTaskData((prevData) => ({
      ...prevData,
      goalColor: color,
    }));
  };

  const createGoal = (evt) => {
    evt.preventDefault();
    addGoal(setResponse, taskData, setPixelData);
  };

  useEffect(() => {
    if(response === 'goal addition successful' && pixelData.goalId !== 0) {
      addPixelData(pixelData, setResponsePixels);
    }
  }, [pixelData, response])

  console.log(taskData, response, pixelData, responsePixels)

  return(
    <>
      <form className="goal-form" onSubmit={createGoal}>
      <div className='goal-form__input-wrapper'>
        <label className='goal-form__label'>Название цели*</label>
        <Input
          className="goal-form__input"
          name="goalName"
          type="text"
          placeholder="Введите название цели"
          value={taskData.goalName}
          onChange={handleInputChange}
        />
      </div>
      <div className='goal-form__input-wrapper goal-form__input-wrapper--flex'>
        <div className='goal-form__inner-input-wrapper goal-form__inner-input-wrapper--date'>
        <label className='goal-form__label'>Дата начала</label>
        <Input
          className="goal-form__input"
          name="dateOfStart"
          type="date"
          value={taskData.dateOfStart}
          onChange={handleInputChange}
        />
        </div>
        <div  className='goal-form__inner-input-wrapper goal-form__inner-input-wrapper--date'>
        <label className='goal-form__label'>Дата конца</label>
        <Input
          className="goal-form__input"
          name="deadlineDate"
          type="date"
          value={taskData.deadlineDate}
          onChange={handleInputChange}
        />
        </div>
      </div>
      <div className='goal-form__input-wrapper goal-form__input-wrapper--flex'>
        <label className='goal-form__label'>Размер канваса*</label>
        <div  className='goal-form__inner-input-wrapper'>
        <Input
          className="goal-form__input"
          name="canvasSizeX"
          type="number"
          placeholder="X"
          value={taskData.canvasSizeX}
          onChange={handleInputChange}
        />
        <Input
          className="goal-form__input"
          name="canvasSizeY"
          type="number"
          placeholder="Y"
          value={taskData.canvasSizeY}
          onChange={handleInputChange}
        />
        </div>
      </div>
      <div className='goal-form__input-wrapper'>
        <label className='goal-form__label'>Выбрать декоративное изображение*</label>
        <ul className='goal-form__button-list'>
          {['cat', 'rabbit', 'cake', 'heart', 'car'].map((image, index) => (
            <li key={index}>
              <button type="button" onClick={() => handleImageSelect(image)}>
                {image}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className='goal-form__input-wrapper'>
        <label className='goal-form__label'>Описание цели</label>
        <Input
          className="goal-form__input"
          name="goalDescription"
          type="text"
          placeholder="Введите описание цели"
          value={taskData.goalDescription}
          onChange={handleInputChange}
        />
      </div>
      <div className='goal-form__input-wrapper'>
        <label className='goal-form__label'>Выбрать цвет цели*</label>
        <input
          type="color"
          value={taskData.goalColor}
          onChange={(e) => handleColorChange(e.target.value)}
        />
      </div>
      <button className="button button--secondary" type="submit">Создать цель</button>
      </form>
    </>
  )
}
export default GoalAdditionForm;
