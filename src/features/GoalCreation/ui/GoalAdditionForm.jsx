import Input from '../../../shared/ui/Input/ui/Input';
import { useEffect, useState } from 'react';
import addGoal from '../api/addGoal';
import './_goal-form.scss';
import addPixelData from '../api/addPixelData';

const GoalAdditionForm = (props) => {

  const [response, setResponse] = useState('');
  const [goalData, setgoalData] = useState({
    userId: props.userId,
    goalName: "",
    goalDescription: "",
    dateOfStart: "",
    dateOfAchievement: "",
    deadlineDate: "",
    goalImage: "",
    goalColor: "",
    canvasSizeX: 0,
    canvasSizeY: 0,
    status: "PLANNED",
    pixelsInTotal: 0,
    freePixels: 0
  })
  const [pixelData, setPixelData] = useState({
    pixelData: "",
    goalId: 0
  })
  const [responsePixels, setResponsePixels] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setgoalData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  };

  const handleImageSelect = (image) => {
    setgoalData((prevData) => ({
      ...prevData,
      goalImage: image,
    }));
  };

  const createGoal = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    addGoal(setResponse, goalData, setPixelData, props.accessToken);
  };

  useEffect(() => {
    if (response === 'goal addition successful' && pixelData.goalId !== 0) {
      addPixelData(pixelData, setResponsePixels, props.accessToken);
      props.onClose();
    }
  }, [pixelData, response, props])

  console.log(goalData, response, pixelData, responsePixels)

  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};
    if (!goalData.goalName.trim()) newErrors.goalName = "Название цели обязательно";
    if (!goalData.goalImage) newErrors.goalImage = "Выберите изображение";
    if (!goalData.goalColor) newErrors.goalColor = "Выберите цвет";
    if (goalData.canvasSizeX <= 0) newErrors.canvasSizeX = "Введите корректный размер X";
    if (goalData.canvasSizeY <= 0) newErrors.canvasSizeY = "Введите корректный размер Y";
    if (!goalData.dateOfStart) newErrors.dateOfStart = "Укажите дату начала";
    if (!goalData.deadlineDate) newErrors.deadlineDate = "Укажите дату конца";

    if (goalData.dateOfStart && goalData.deadlineDate) {
      const start = new Date(goalData.dateOfStart);
      const end = new Date(goalData.deadlineDate);
      if (start > end) {
        newErrors.dateOfStart = "Дата начала не может быть позже даты конца";
        newErrors.deadlineDate = "Дата конца должна быть позже даты начала";
      }
    }

    return newErrors;
  };


  return (
    <>
      <form className="goal-form" onSubmit={createGoal}>
        <div className='goal-form__input-wrapper'>
          <label className='goal-form__label'>Название цели*</label>
          <Input
            className="goal-form__input"
            name="goalName"
            type="text"
            placeholder="Введите название цели"
            value={goalData.goalName}
            onChange={handleInputChange}
            errorMessage={errors.goalName ? true : false}
          />
          {errors.goalName && <p className="goal-form__error">{errors.goalName}</p>}
        </div>
        <div className='goal-form__input-wrapper goal-form__input-wrapper--flex'>
          <div className='goal-form__inner-input-wrapper goal-form__inner-input-wrapper--date'>
            <label className='goal-form__label'>Дата начала*</label>
            <Input
              name="dateOfStart"
              type="date"
              value={goalData.dateOfStart}
              onChange={handleInputChange}
              errorMessage={errors.dateOfStart ? true : false}
            />
             {errors.dateOfStart && <p className="goal-form__error">{errors.dateOfStart}</p>}
          </div>
          <div className='goal-form__inner-input-wrapper goal-form__inner-input-wrapper--date'>
            <label className='goal-form__label'>Дата конца*</label>
            <Input
              name="deadlineDate"
              type="date"
              value={goalData.deadlineDate}
              onChange={handleInputChange}
              errorMessage={errors.deadlineDate ? true : false}
            />
             {errors.deadlineDate && <p className="goal-form__error">{errors.deadlineDate}</p>}
          </div>
        </div>
        <div className='goal-form__input-wrapper goal-form__input-wrapper--flex-sizes'>
          <label className='goal-form__label'>Размер канваса*</label>
          <div className='goal-form__inner-input-wrapper'>
            <Input
              name="canvasSizeX"
              type="number"
              placeholder="X"
              value={goalData.canvasSizeX}
              onChange={handleInputChange}
              errorMessage={errors.canvasSizeX ? true : false}
            />
            <Input
              name="canvasSizeY"
              type="number"
              placeholder="Y"
              value={goalData.canvasSizeY}
              onChange={handleInputChange}
              errorMessage={errors.canvasSizeY ? true : false}
            />
          </div>
          {(errors.canvasSizeX || errors.canvasSizeY) && (
            <p className="goal-form__error">
              {errors.canvasSizeX || errors.canvasSizeY}
            </p>
          )}
        </div>
        <div className='goal-form__input-wrapper'>
          <label className='goal-form__label'>Выбрать декоративное изображение*</label>
          <ul className='goal-form__button-list'>
            {['cat', 'rabbit', 'cake', 'heart', 'car'].map((image, index) => (
              <li key={index}>
                <button className={`goal-form__image-button goal-form__image-button--${image}`} type="button" onClick={() => handleImageSelect(image)}>
                </button>
              </li>
            ))}
          </ul>
          {errors.goalImage && <p className="goal-form__error">{errors.goalImage}</p>}
        </div>
        <div className='goal-form__input-wrapper'>
          <label className='goal-form__label'>Описание цели</label>
          <textarea
            className="goal-form__textarea"
            name="goalDescription"
            type="text"
            placeholder="Введите описание цели"
            value={goalData.goalDescription}
            onChange={handleInputChange}
          />
        </div>
        <div className='goal-form__input-wrapper'>
          <label className='goal-form__label'>Выбрать цвет цели*</label>
          <Input
            className="goal-form__input"
            name="goalColor"
            type="color"
            value={goalData.goalColor}
            onChange={handleInputChange}
            errorMessage={errors.goalColor ? true : false}
          />
          {errors.goalColor && <p className="goal-form__error">{errors.goalColor}</p>}
        </div>
        <button className="goal-form__button button button--secondary" type="submit">Создать цель</button>
      </form>
    </>
  )
}
export default GoalAdditionForm;
