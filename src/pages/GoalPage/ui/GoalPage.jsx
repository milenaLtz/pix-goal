import { useParams } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { Pixel } from '../../../entities/pixel';
import { Goals } from '../../../widgets/Goals';
import { Tasks } from '../../../widgets/Tasks';
import { PixiCanvas } from '../../../widgets/PixiCanvas';
import { Introduction } from '../../../widgets/Introduction';
import { Header } from '../../../widgets/Header';
import getGoal from '../../../entities/goal/api/getGoal';
import ScrollToTop from '../../../app/ScrollToTop';
import getUsers from '../../../entities/user/api/getUsers';


const GoalPage = ({accessToken}) => {
  useEffect(() => {
    localStorage.removeItem('pixels');
  }, []);
  const {id} = useParams();
  const [goal, setGoal] = useState({});
  const [pixelEntity, setPixelEntity] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedPixel, setSelectedPixel] = useState(null);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [taskDeleted, setTaskDeleted] = useState(false);
  const canvasRef = useRef(null);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const currentUserEmail = localStorage.getItem('currentUserEmail');
  //eslint-disable-next-line
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(0);
  useEffect(() => {
    getUsers((fetchedUsers) => {
      setUsers(fetchedUsers);

      const currentUser = fetchedUsers.find(u => u.email === currentUserEmail);
      if (currentUser) {
        setUserId(currentUser.id);
      }
    }, accessToken);
  }, [currentUserEmail, accessToken]);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    getGoal(setGoal, id, accessToken);
  }, [id, accessToken])


  const handleOpenModal = (pixel) => {
    // setSelectedPixel(pixel);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPixel(null);
    // window.location.reload();
  };

  const handleAddPixel = (pixelCount) => {
    if (canvasRef.current) {
      for (let i = 0; i < pixelCount; i++) {
        canvasRef.current.addPixel();
      }
    }
  };

  const handleUpdatePixelColor = (pixelId, newColor) => {
    if (canvasRef.current) {
      canvasRef.current.updatePixelColor(pixelId, newColor);
    }
  };

  return(
      <>
        <Header/>
        <div className='main-page__wrapper'>
          <main className='main-page'>
            <Introduction
              page="goal"
              goal={goal}
              greetings={goal.goalName}
              description={goal.description}
              image={goal.goalImage}
              color={goal.goalColor}
              canvasSizeX={goal.canvasSizeX}
              canvasSizeY={goal.canvasSizeY}
              accessToken={accessToken}
            />
            <PixiCanvas
              accessToken={accessToken}
              goalId={id}
              setPixelEntity={setPixelEntity}
              goalColor={goal.goalColor}
              canvasSizeX={goal.canvasSizeX}
              canvasSizeY={goal.canvasSizeY}
              onOpenModal={handleOpenModal}
              onCloseModal={handleCloseModal}
              showModal={showModal}
              setSelectedPixel={setSelectedPixel}
              selectedPixel={selectedPixel}
              taskCompleted={taskCompleted}
              taskDeleted={taskDeleted}
              ref={canvasRef}
            />
            {showModal && (screenSize.width < 1200 || screenSize.height < 650)  && (
              <Pixel
                accessToken={accessToken}
                pixelEntity={pixelEntity}
                setPixelEntity={setPixelEntity}
                selectedPixel={selectedPixel}
                closeModal={handleCloseModal}
                onUpdatePixelColor={handleUpdatePixelColor}
              />
            )}
            <Tasks
              accessToken={accessToken}
              onAddPixel={handleAddPixel}
              goalId={id}
              setTaskCompleted={setTaskCompleted}
              taskCompleted={taskCompleted}
              setTaskDeleted={setTaskDeleted}
              taskDeleted={taskDeleted}
            />
            <Goals userId={userId} accessToken={accessToken} />
          </main>
          {showModal && screenSize.height >= 650 && screenSize.width >= 1200 && (
            <Pixel
              accessToken={accessToken}
              pixelEntity={pixelEntity}
              setPixelEntity={setPixelEntity}
              selectedPixel={selectedPixel}
              closeModal={handleCloseModal}
              onUpdatePixelColor={handleUpdatePixelColor}
            />
          )}
        </div>
        <ScrollToTop/>
      </>
  )
}
export default GoalPage;
