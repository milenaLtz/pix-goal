import { useParams } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { Pixel } from '../../../entities/pixel';
import { Goals } from '../../../widgets/Goals';
import { Tasks } from '../../../widgets/Tasks';
import { PixiCanvas } from '../../../widgets/PixiCanvas';
import { Introduction } from '../../../widgets/Introduction';
import { Header } from '../../../widgets/Header';
import { Footer } from '../../../widgets/Footer';
import getGoal from '../../../entities/goal/api/getGoal';
import ScrollToTop from '../../../app/ScrollToTop';


const GoalPage = () => {
  const {id} = useParams();
  const [goal, setGoal] = useState({});
  const [pixelEntity, setPixelEntity] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedPixel, setSelectedPixel] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    getGoal(setGoal, id);
  }, [id])


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
            <Introduction page="goal" greetings={goal.goalName} description={goal.goalDescription}/>
            <PixiCanvas
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
            ref={canvasRef}
            />
            <Tasks onAddPixel={handleAddPixel} goalId={id}/>
            <Goals/>
          </main>
          {showModal && (
            <Pixel
            pixelEntity={pixelEntity}
            setPixelEntity={setPixelEntity}
            selectedPixel={selectedPixel}
            closeModal={handleCloseModal}
            onUpdatePixelColor={handleUpdatePixelColor}
            />
          )}
        </div>
        <Footer/>
        <ScrollToTop/>
      </>
  )
}
export default GoalPage;
