import './_introduction.scss';
import avatar from '../../../shared/icons/default-avatar.svg';
import cat from '../../../shared/icons/illustration//cat.svg';

const Introduction = (props) => {

  return(
    <>
      <section className='main-page__introduction introduction'>
        {
          props.page === 'goal' ? (
            <img className='introduction__image' src={cat} alt='аватар пользователя'/>
          ) : (
            <img className='introduction__image' src={avatar} alt='аватар пользователя'/>
          )
        }
        <div className='introduction__content-wrapper'>
          <h1 className='introduction__title'>{props.greetings}</h1>
          {
            props.page === 'goal' ? (
              <div className='introduction__description-wrapper'>
                <p className='introduction__description'>{props.description}</p>
                <button className='introduction__description-button'></button>
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
