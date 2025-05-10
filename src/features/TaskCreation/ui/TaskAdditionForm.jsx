import Input from '../../../shared/ui/Input/ui/Input';
import { useEffect, useState } from 'react';
import addTask from '../api/addTask';
import './_task-form.scss';
import { v4 as uuidv4 } from 'uuid';

const TaskAdditionForm = ({ goalId, onClose }) => {

  const [response, setResponse] = useState('');
  const [taskData, setTaskData] = useState({
    goalId: Number(goalId),
    taskName: "",
    taskDescription: "",
    dateOfStart: "",
    dateOfEnd: "",
    taskImage: "",
    numberOfPixels: "",
    taskStatus: "0",
    status: "PLANNED"
  })

  const generatePixels = (count) => {
    const pixels = [];
    for (let i = 0; i < count; i++) {
      pixels.push({
        id: uuidv4(),
        x: 0,
        y: 0,
        color: "#DBD4E6",
        taskId: null
      });
    }
    return JSON.stringify(pixels);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  };

  const createTask = (evt) => {
    evt.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const pixelsCount = parseInt(taskData.numberOfPixels) || 0;
    const generatedPixels = generatePixels(pixelsCount);

    const taskWithPixels = {
      ...taskData,
      taskImage: generatedPixels
    };

    addTask(setResponse, taskWithPixels);
  };

  useEffect(() => {
    if(response === 'task addition successful') {
      onClose()
    }
  })

  console.log(JSON.stringify(taskData), response)

  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};
    if (!taskData.taskName.trim()) newErrors.taskName = "Название задачи обязательно";
    if (!taskData.dateOfStart) newErrors.dateOfStart = "Дата начала обязательна";
    if (!taskData.dateOfEnd) newErrors.dateOfEnd = "Дата конца обязательна";

    if (taskData.dateOfStart && taskData.dateOfEnd) {
      const start = new Date(taskData.dateOfStart);
      const end = new Date(taskData.dateOfEnd);
      if (start > end) {
        newErrors.dateOfStart = "Дата начала не может быть позже даты конца";
        newErrors.dateOfEnd = "Дата конца должна быть позже начала";
      }
    }

    const pixels = parseInt(taskData.numberOfPixels);
    if (!taskData.numberOfPixels) {
      newErrors.numberOfPixels = "Укажите количество пикселей";
    } else if (isNaN(pixels) || pixels <= 0) {
      newErrors.numberOfPixels = "Введите положительное число";
    }

    return newErrors;
  };

  return(
    <>
      <form className="goal-form" onSubmit={(evt) => createTask(evt)}>
      <div className='goal-form__input-wrapper'>
        <label className='goal-form__label'>Название задачи*</label>
        <Input
          name="taskName"
          type="text"
          placeholder="Введите название цели"
          value={taskData.taskName}
          onChange={handleInputChange}
          errorMessage={errors.taskName ? true : false}
        />
        {errors.taskName && <p className="goal-form__error">{errors.taskName}</p>}
      </div>
      <div className='goal-form__input-wrapper goal-form__input-wrapper--flex'>
        <div className='goal-form__inner-input-wrapper goal-form__inner-input-wrapper--date'>
        <label className='goal-form__label'>Дата начала*</label>
        <Input
          name="dateOfStart"
          type="date"
          value={taskData.dateOfStart}
          onChange={handleInputChange}
          errorMessage={errors.dateOfStart ? true : false}
        />
        {errors.dateOfStart && <p className="goal-form__error">{errors.dateOfStart}</p>}
        </div>
        <div  className='goal-form__inner-input-wrapper goal-form__inner-input-wrapper--date'>
        <label className='goal-form__label'>Дата конца*</label>
        <Input
          name="dateOfEnd"
          type="date"
          value={taskData.dateOfEnd}
          onChange={handleInputChange}
          errorMessage={errors.dateOfEnd ? true : false}
        />
        {errors.dateOfEnd && <p className="goal-form__error">{errors.dateOfEnd}</p>}
        </div>
      </div>
      <div className='goal-form__input-wrapper'>
        <label className='goal-form__label'>Описание цели</label>
        <textarea
          className="goal-form__textarea"
          name="taskDescription"
          type="text"
          placeholder="Введите описание цели"
          value={taskData.taskDescription}
          onChange={handleInputChange}
        />
      </div>
      <div className='goal-form__input-wrapper'>
        <label className='goal-form__label'>Количество пикселей*</label>
        <Input
          name="numberOfPixels"
          type="text"
          placeholder="Введите описание цели"
          value={taskData.numberOfPixels}
          onChange={handleInputChange}
          errorMessage={errors.numberOfPixels ? true : false}
        />
        {errors.numberOfPixels && <p className="goal-form__error">{errors.numberOfPixels}</p>}
      </div>
      <button className="button button--secondary" type="submit">Создать задачу</button>
      </form>
    </>
  )
}
export default TaskAdditionForm;
