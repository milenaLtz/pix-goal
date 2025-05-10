import { Footer } from '../../../widgets/Footer';
import { User } from '../../../entities/user';
import { Introduction } from '../../../widgets/Introduction';
import { Goals } from '../../../widgets/Goals';
import { Header } from '../../../widgets/Header';
import ScrollToTop from '../../../app/ScrollToTop';
import { useState } from 'react';


const HomePage = ({accessToken}) => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(0);

  // localStorage.removeItem('pixels')
  return (
    <>
      <Header />
      <main className='main-page'>
        <Introduction page="home" greetings={`Дoбрый день, ${userName}`} description="Достигай свои цели здесь и сейчас!" />
        <User accessToken={accessToken} setUserName={setUserName} setUserId={setUserId}/>
        <Goals accessToken={accessToken} userId={userId} />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
export default HomePage;
