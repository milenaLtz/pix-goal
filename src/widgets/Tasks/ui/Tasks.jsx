import { Task } from "../../../entities/task";

const Tasks = ({onAddPixel}) => {


    // fetch tasks
    const tasks = [
      { id: 1, title: "Прочитать рецепты", pixelCount: 2 },
      { id: 2, title: "Составить список покупок", pixelCount: 1 },
      { id: 3, title: "Сходить в магазин", pixelCount: 3 },
      { id: 4, title: "Убраться на кухне", pixelCount: 5 },
      { id: 5, title: "Замешать тесто", pixelCount: 2 },
    ];

    return(
        <>
          <section className="main-page__block block tasks-block">
            <div className="tasks-block__wrapper">
              <h2 className="tasks-block__title">Задачи к цели</h2>
              <ul className="tasks-block__list">
                  {/* <div className="tasks-block__task task">
                    <h3 className="task__title">Прочитать рецепты</h3>
                    <p className="task__pixel-count">2 пикселя</p>
                    <div>
                      <button className="task__check-button"></button>
                      <button className="task__change-button"></button>
                      <button className="task__delete-button"></button>
                    </div>
                  </div> */}
                  {
                    tasks.map((task, index) => {
                      return(
                        <>
                          <li className="tasks-block__item">
                            <Task title={task.title} pixelCount={task.pixelCount} onAddPixel={() => onAddPixel(task.pixelCount)}/>
                          </li>
                        </>
                      )
                    })
                  }
              </ul>
              <div className="tasks-block__button-wrapper">
                <button className="tasks_block__button tasks_block__button--text button">+</button>
              </div>
            </div>
          </section>
        </>
    )
}
export default Tasks;
