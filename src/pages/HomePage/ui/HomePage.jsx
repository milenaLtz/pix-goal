import { Footer } from '../../../widgets/Footer';
import { User } from '../../../entities/user';
import { Introduction } from '../../../widgets/Introduction';
import { Goals } from '../../../widgets/Goals';
import { Header } from '../../../widgets/Header';


const HomePage = () => {

  localStorage.removeItem('pixels')
    return(
        <>
          <Header/>
          <main className='main-page'>
              <Introduction page="home" greetings="Добрый день, User" description="Достигай свои цели здесь и сейчас!"/>
              <User/>
              <Goals/>
          </main>
          <Footer/>
        </>
    )
}
export default HomePage;
