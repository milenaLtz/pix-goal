import avatar from '../shared/icons/icons8-avatar-96 1.svg';
import cake from '../shared/icons/illustration/cake.svg'

const IntroductionBlock = (props) => {

  return(
    <>
      <section className='main-page__introduction introduction'>
        {
          props.page === 'goal' ? (
            <img className='introduction__image' src={cake} alt='аватар пользователя' width={135} height={115}/>
          ) : (
            <img className='introduction__image' src={avatar} alt='аватар пользователя' width={135} height={115}/>
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
export default IntroductionBlock;
