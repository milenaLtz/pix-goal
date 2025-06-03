import './_introduction.scss';
import avatar from '../../../shared/icons/default-avatar.svg';
import getPixelIcon from '../../../shared/utils/getPixelIcon';
import { useState } from 'react';
import GoalInfoModal from '../../modals/ui/GoalInfoModal';

const Introduction = (props) => {

  const [isGoalInfoModalOpen, setIsGoalInfoModalOpen] = useState();

  const toggleGoalInfoModal = () => {
    setIsGoalInfoModalOpen(!isGoalInfoModalOpen);
  }

  return(
    <>
      {
        isGoalInfoModalOpen &&
        <GoalInfoModal
          goal={props.goal}
          title={props.greetings}
          description={props.description}
          image={getPixelIcon(props.image)}
          onClose={toggleGoalInfoModal}
          color={props.color}
          canvasSizeX={props.canvasSizeX}
          canvasSizeY={props.canvasSizeY}
          accessToken={props.accessToken}
        />
      }
      <section className='main-page__introduction introduction'>
        {
          props.page === 'goal' ? (
            <img className='introduction__image' src={getPixelIcon(props.image)} alt='аватар пользователя'/>
          ) : (
            <img className='introduction__image' src={avatar} alt='аватар пользователя'/>
          )
        }
        <div className='introduction__content-wrapper'>
          <h1 className='introduction__title'>{props.greetings}</h1>
          {
            props.page === 'goal' ? (
              <div className='introduction__description-wrapper'>
                <p className='introduction__description'>Подробная информация</p>
                <button className='introduction__description-button' onClick={toggleGoalInfoModal}></button>
              </div>
            ) : (
              <p className='introduction__description'>{props.description}</p>
            )
          }
        </div>
      </section>
    </>
  )
}
export default Introduction;
