import Input from '../../../shared/ui/Input/ui/Input';
import { useState } from 'react';
import addTask from '../api/addTask';
import './_goal-form.scss';

const TaskAdditionForm = ({ goalId }) => {

  const [response, setResponse] = useState('');
  const [taskData, setTaskData] = useState({
    goalId: Number(goalId),
    taskName: "",
    taskDescription: "",
    dateOfStart: "",
    dateOfEnd: "",
    taskImage: "",
    numberOfPixels: "",
    taskStatus: "0"
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  };

  const createGoal = () => {
    addTask(setResponse, taskData);
  };

  console.log(JSON.stringify(taskData), response)

  return(
    <>
      <form className="goal-form" onSubmit={createGoal}>
      <div className='goal-form__input-wrapper'>
        <label className='goal-form__label'>Название задачи*</label>
        <Input
          className="goal-form__input"
          name="taskName"
          type="text"
          placeholder="Введите название цели"
          value={taskData.taskName}
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
          name="dateOfEnd"
          type="date"
          value={taskData.dateOfEnd}
          onChange={handleInputChange}
        />
        </div>
      </div>
      <div className='goal-form__input-wrapper'>
        <label className='goal-form__label'>Описание цели</label>
        <Input
          className="goal-form__input"
          name="taskDescription"
          type="text"
          placeholder="Введите описание цели"
          value={taskData.taskDescription}
          onChange={handleInputChange}
        />
      </div>
      <div className='goal-form__input-wrapper'>
        <label className='goal-form__label'>Количество пикселей</label>
        <Input
          className="goal-form__input"
          name="numberOfPixels"
          type="text"
          placeholder="Введите описание цели"
          value={taskData.numberOfPixels}
          onChange={handleInputChange}
        />
      </div>
      <button className="button button--secondary" type="submit">Создать цель</button>
      </form>
    </>
  )
}
export default TaskAdditionForm;
