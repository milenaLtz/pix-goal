import { useState, useEffect } from "react";
import editPixels from "../api/editPixels";

const Pixel = (props) => {
  const [color, setColor] = useState(props.selectedPixel.color);

  useEffect(() => {
    setColor(props.selectedPixel.color);
  }, [props.selectedPixel.color]);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    props.onUpdatePixelColor(props.selectedPixel.id, newColor);
  };


  const editPixelData = (evt) => {
    evt.preventDefault();

    const storedPixels = localStorage.getItem('pixels');

    if (!storedPixels) return;

    const updatedPixelEntity = {
      ...props.pixelEntity,
      pixelData: storedPixels
    };

    editPixels(updatedPixelEntity);

    props.setPixelEntity(updatedPixelEntity);
    props.closeModal();
  }

  // console.log(props.pixelEntity)

  return(
    <>
      <div className="pixel-modal">
        <div className="pixel-modal__content">
          <div className="pixel-modal__content-wrapper">
            <div className="pixel-modal__task-info task-info">
              <h2 className="task-info__title">Прочитать рецепты</h2>
              <dl className="task-info__list">
                <div className="task-info__item">
                  <dt className="task-info__topic">Описание</dt>
                  <dd className="task-info__description">Надо прочитать рецепты про испечение маффинов и капкейков. Лучше всего рецепты из разных источников. </dd>
                </div>
                <div className="task-info__item">
                  <dt className="task-info__topic">Сделано за</dt>
                  <dd className="task-info__description">5 д 7 ч 35 м</dd>
                </div>
                <div className="task-info__item">
                  <dt className="task-info__topic">Дата начала</dt>
                  <dd className="task-info__description">12.04.2024</dd>
                </div>
                <div className="task-info__item">
                  <dt className="task-info__topic">Дата испольнения</dt>
                  <dd className="task-info__description">17.04.2024</dd>
                </div>
              </dl>
            </div>
            <div className="pixel-modal__pixel-info pixel-info">
              <div className="pixel-info__wrapper">
                <h2 className="pixel-info__title">Информация о пикселе</h2>
                <dl className="pixel-info__list">
                  <div className="pixel-info__item">
                    <dt className="pixel-info__topic">Точка горизонтали</dt>
                    <dd className="pixel-info__description">{props.selectedPixel.x}</dd>
                  </div>
                  <div className="pixel-info__item">
                    <dt className="pixel-info__topic">Точка вертикали</dt>
                    <dd className="pixel-info__description">{props.selectedPixel.y}</dd>
                  </div>
                  <div className="pixel-info__item">
                    <dt className="pixel-info__topic">Измените цвет пикселя</dt>
                    <input
                      type="color"
                      value={color}
                      onChange={handleColorChange}
                    />
                  </div>
                </dl>
              </div>
            </div>
            <div className="pixel-modal__pixel-button-wrapper">
              <button type="button" className="pixel-modal__pixel-button button button--secondary" onClick={(evt) => editPixelData(evt)}>Сохранить</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Pixel;
