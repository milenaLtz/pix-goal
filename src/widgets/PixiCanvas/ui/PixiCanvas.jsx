import { useEffect, useRef, useState, useImperativeHandle, forwardRef, useCallback } from "react";
import * as PIXI from 'pixi.js';
import { v4 as uuidv4 } from 'uuid';
import getPixels from "../api/getPixels";

const PixiCanvas = forwardRef(({ goalId, setPixelEntity, goalColor, canvasSizeX, canvasSizeY, onOpenModal, showModal, setSelectedPixel, selectedPixel, taskCompleted, taskDeleted}, ref) => {

  // console.log(goalId);
  const gridSize = 10;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      }
    }, []);

  const pixiContainer = useRef(null);
  const appRef = useRef(null);
  const pixelRefs = useRef({});
  const [pixels, setPixels] = useState([]);
  // const [selectedPixel, setSelectedPixel] = useState(null);
  // console.log(selectedPixel)
  useEffect(() => {
    if(taskCompleted || taskDeleted) {
      getPixels(setPixels, goalId, setPixelEntity);
    }
    getPixels(setPixels, goalId, setPixelEntity);
  }, [goalId, setPixelEntity, taskCompleted, taskDeleted]);

  // console.log(pixels, localStorage.getItem('pixels'))

  const drawGrid = (stage, gridSize) => {
    const grid = new PIXI.Graphics();
    grid.lineStyle(1, 0xeeeeee, 1);

    for (let x = 0; x < appRef.current.screen.width; x += gridSize) {
      grid.moveTo(x, 0);
      grid.lineTo(x, appRef.current.screen.height);
    }

    for (let y = 0; y < appRef.current.screen.height; y += gridSize) {
      grid.moveTo(0, y);
      grid.lineTo(appRef.current.screen.width, y);
    }

    stage.addChild(grid);
  };

  const handlePixelClick = useCallback((id) => {
    // console.log('pixels before saved: ', pixels)
    // console.log('pixels before saved: ', localStorage.getItem('pixels'))
    const savedPixels = pixels || JSON.parse(localStorage.getItem('pixels'));
    // console.log('pixels saved: ', savedPixels)
    // console.log('pixels saved: ', localStorage.getItem('pixels'))
    const pixelData = savedPixels.find(pixel => pixel.id === id);
    // console.log('pixels data: ', pixelData)
    // console.log('pixels data: ', localStorage.getItem('pixels'))
    if (pixelData) {
      setSelectedPixel(pixelData);
      // console.log('pixels data 2: ', localStorage.getItem('pixels'))
    }

    if(showModal === false) {
      console.log('Открыть модальное окно для пикселя с ID:', id);
      onOpenModal(pixelData);
      setSelectedPixel(pixelData);
    }

  },[onOpenModal, showModal, pixels, setSelectedPixel]);


  const onDragStart = (event, id) => {
    const pixel = event.currentTarget;
    pixel.dragData = event.data;
    pixel.dragging = true;
    pixel.alpha = 0.5;
    // console.log('pixels data drag start: ', localStorage.getItem('pixels'))
  };

  const onDragMove = (event, id) => {
    const pixel = event.currentTarget;
    if (pixel.dragging) {
      const newPosition = pixel.dragData.getLocalPosition(pixel.parent);

      if (newPosition.x < 0 || newPosition.x > appRef.current.renderer.width - gridSize ||
        newPosition.y < 0 || newPosition.y > appRef.current.renderer.height - gridSize) {
        return;
      }

      pixel.x = Math.round(newPosition.x / gridSize) * gridSize;
      pixel.y = Math.round(newPosition.y / gridSize) * gridSize;
    }
    // console.log('pixels data drag move: ', localStorage.getItem('pixels'))
  };

  const onDragEnd = useCallback((event, id) => {
    const pixel = event.currentTarget;
    pixel.dragging = false;
    pixel.dragData = null;
    pixel.alpha = 1;

    const newPosition = { x: pixel.x, y: pixel.y };

    setPixels((prev) => {
      const updatedPixels = prev.map((p) =>
        p.id === id ? { ...p, ...newPosition } : p
      );
      // console.log('dragEnd pixels: ', updatedPixels, localStorage.getItem('pixels'))
      localStorage.setItem('pixels', JSON.stringify(updatedPixels));
      // console.log('dragEnd 2 pixels: ', updatedPixels, localStorage.getItem('pixels'))
      return updatedPixels;
    });
    // console.log('dragEnd 3 pixels: ', localStorage.getItem('pixels'))
    handlePixelClick(id);
    // console.log('dragEnd 4 pixels: ', localStorage.getItem('pixels'))
  },[handlePixelClick]);




  useEffect(() => {
    if (appRef.current) return;
    const width = isMobile ? 300 : (canvasSizeX * gridSize);
    const height = isMobile ? 250 : (canvasSizeY * gridSize);
    const bgColor = goalColor?.replace('#', '0x');

    const app = new PIXI.Application({
      width,
      height,
      backgroundColor: parseInt(bgColor),
    });

    pixiContainer.current.appendChild(app.view);
    appRef.current = app;

    drawGrid(app.stage, gridSize);

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true);
        appRef.current = null;
      }
    };
  // eslint-disable-next-line
  }, [goalColor, canvasSizeX, canvasSizeY, isMobile]);





  const addPixel = useCallback((stage, x = 0, y = 0, color = '#DBD4E6', id = uuidv4()) => {
    const pixel = new PIXI.Graphics();
    pixel.beginFill(PIXI.utils.string2hex(color));
    pixel.drawRect(0, 0, 20, 20);
    pixel.endFill();
    pixel.position.set(x, y);
    pixel.interactive = true;
    pixel.cursor = 'pointer';

    pixel.on('click',  () => handlePixelClick(id));
    pixel.on('pointerdown', (event) => onDragStart(event, id));
    pixel.on('pointerup', (event) => onDragEnd(event, id));
    pixel.on('pointerupoutside', (event) => onDragEnd(event, id));
    pixel.on('pointermove', (event) => onDragMove(event, id));

    // console.log('newPixel 1', pixel)
    pixelRefs.current[id] = pixel;
    // console.log('newPixel 2', pixel)
    stage.addChild(pixel);
    // console.log('newPixel 3', pixel)
    // console.log('add pixel pixels: ', localStorage.getItem('pixels'))
    setPixels((prev) => {
      const existingPixel = prev.find(p => p.id === id);
      if (!existingPixel) {
        console.log('newPixel', pixel)
        const newPixel = { id, x: pixel.x, y: pixel.y, color };
        const updatedPixels = [...prev, newPixel];
        console.log('new updatedPixel: ', updatedPixels)
        localStorage.setItem('pixels', JSON.stringify(updatedPixels));
        // console.log('add pixel 3 pixels: ', localStorage.getItem('pixels'))
        return updatedPixels;
      }
      return prev;
    });
    // console.log('add pixel 2 pixels: ', localStorage.getItem('pixels'))
    // eslint-disable-next-line
  }, [onDragEnd]);




  useEffect(() => {
    if (!appRef.current) return;

    const stage = appRef.current.stage;
    localStorage.setItem('pixels', JSON.stringify(pixels));
    // console.log('pixels in second useEffect', pixels, localStorage.getItem('pixels'))
    Object.values(pixelRefs.current).forEach(pixel => {
      stage.removeChild(pixel);
      pixel.destroy();
    });

    pixelRefs.current = {};

    pixels?.forEach((pixel) => {
      addPixel(stage, pixel.x, pixel.y, pixel.color, pixel.id);
    });

  }, [pixels, addPixel]);



  useImperativeHandle(ref, () => ({
    addPixel: (x, y, color) => {
      if (!appRef.current) {
        console.error('PIXI Application not initialized');
        return;
      }
      addPixel(appRef.current.stage, x, y, color);
    },
    updatePixelColor: (pixelId, newColor) => {
      // console.log('New color:', newColor);
      // console.log('pixels update color', pixels, localStorage.getItem('pixels'))
      const updatedPixels = pixels.map((pixel) =>
        pixel.id === pixelId ? { ...pixel, color: newColor } : pixel
      );
      setPixels(updatedPixels);
      // console.log('updatedPixels in updateing color: ',updatedPixels)
      localStorage.setItem('pixels', JSON.stringify(updatedPixels));
      // const app = appRef.current;
      // const graphics = appRef.current.stage.children.find(
      //   (child) => child.pixelId === pixelId
      // );

      const pixelGraphic = pixelRefs.current[pixelId];
      if (pixelGraphic) {
        pixelGraphic.clear();
        pixelGraphic.beginFill(PIXI.utils.string2hex(newColor));
        pixelGraphic.drawRect(0, 0, 20, 20);
        pixelGraphic.endFill();
      } else {
        console.log('Pixel graphic not found for pixelId:', pixelId);
      }
    },
  }));

  // console.log(selectedPixel)

  // const downloadCanvasImage = () => {
  //   if (!appRef.current) {
  //     console.error('PIXI app is not initialized');
  //     return;
  //   }

  //   const canvas = appRef.current.view;
  //   const dataURL = canvas.toDataURL('image/png');

  //   const link = document.createElement('a');
  //   link.href = dataURL;
  //   link.download = 'my-canvas.png';
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    <>
      <div className="canvas-container">
        <div className="pixi-canvas block" ref={pixiContainer}></div>
      </div>
      <div>
      </div>

    </>
  )
});

export default PixiCanvas;
