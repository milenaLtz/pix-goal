import cat from '../../../shared/icons/illustration/cat.svg';
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Goal } from "../../../entities/goal";
import getGoals from '../api/getGoals';
import { GoalFormModal } from '../../modals';
import getPixelIcon from '../../../shared/utils/getPixelIcon';


const Goals = (props) => {
    const [goalFormOpen, setGoalFormOpen] = useState(false);
    const [showAllGoals, setShowAllGoals] = useState(false);


    const [goals, setGoals] = useState([]);
    useEffect(() => {
      getGoals(setGoals, props.accessToken, props.userId)
    }, [props.accessToken, props.userId]);

    console.log(goals, goalFormOpen);

    const handleOpenGoalForm = () => {
      setGoalFormOpen(!goalFormOpen);
    }

    return(
        <>
        {goalFormOpen &&
          createPortal(
          <GoalFormModal onClose={handleOpenGoalForm} userId={props.userId} accessToken={props.accessToken}/>,
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
                {(showAllGoals || goals.length < 4 ? goals : goals.slice(0, 4)).map((goal, index) =>
                  {
                    console.log(props.userId, goal.userId)
                    return (
                      <>
                      {
                        props.userId === goal.userId &&
                        <Goal
                          accessToken={props.accessToken}
                          key={index}
                          id={goal.id}
                          title={goal.goalName}
                          freePixels={goal.freePixels}
                          image={getPixelIcon(goal.goalImage || cat)}
                        />
                      }
                      </>
                    )

                  }
                )}
              </div>
              <div className="goals-block__button-wrapper goals-block__button-wrapper--footer">
                <button
                  className="goals-block__button goals-block__button--text button"
                  onClick={() => setShowAllGoals(!showAllGoals)}
                >
                  {showAllGoals ? "Скрыть цели" : "Посмотреть все цели"}
                </button>
                <button className="goals-block__button goals-block__button--text button" onClick={handleOpenGoalForm}></button>
              </div>
            </div>
          </section>
        </>
    )
}
export default Goals;
