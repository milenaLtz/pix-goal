import cat from '../../../shared/icons/illustration/cat.svg';
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Goal } from "../../../entities/goal";
import getGoals from '../api/getGoals';
import { GoalFormModal } from '../../modals';
import getPixelIcon from '../../../shared/utils/getPixelIcon';


const Goals = () => {

    const [goalFormOpen, setGoalFormOpen] = useState(false);

    const [goals, setGoals] = useState([]);
    useEffect(() => {
      getGoals(setGoals)
    }, []);

    // console.log(goals, goalFormOpen);

    const handleOpenGoalForm = () => {
      setGoalFormOpen(!goalFormOpen);
    }

    return(
        <>
        {goalFormOpen &&
          createPortal(
          <GoalFormModal onClose={handleOpenGoalForm}/>,
          document.body
        )}
          <section className="main-page__block block goals-block">
            <div className="goals-block__wrapper">
              <div className="goals-block__intro">
                <h2 className="goals-block__title">Цели на данный момент</h2>
                {/* <div className="goals-block__button-wrapper">
                  <button className="goals-block__button button"></button>
                  <button className="goals-block__button button"></button>
                </div> */}
              </div>
              <div className="goals-block__cards-wrapper">
                {goals.map(goal => {
                  return(
                    <Goal key={goal.id} id={goal.id} title={goal.goalName} freePixels={300} image={getPixelIcon(goal.goalImage || cat)}/>
                  )
                })}
              </div>
              <div className="goals-block__button-wrapper goals-block__button-wrapper--footer">
                <button className="goals-block__button goals-block__button--text button">Посмотреть все цели</button>
                <button className="goals-block__button goals-block__button--text button" onClick={handleOpenGoalForm}>+</button>
              </div>
            </div>
          </section>
        </>
    )
}
export default Goals;
