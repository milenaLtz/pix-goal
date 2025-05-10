import { useEffect, useRef, useState, useImperativeHandle, forwardRef, useCallback } from "react";
import * as PIXI from 'pixi.js';
import { v4 as uuidv4 } from 'uuid';
import getPixels from "../api/getPixels";

const PixiCanvas = forwardRef(({ accessToken, goalId, setPixelEntity, goalColor, canvasSizeX, canvasSizeY, onOpenModal, showModal, setSelectedPixel, selectedPixel, taskCompleted, taskDeleted}, ref) => {

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

  useEffect(() => {
    if(taskCompleted || taskDeleted) {
      getPixels(setPixels, goalId, setPixelEntity, accessToken);
    }
    getPixels(setPixels, goalId, setPixelEntity, accessToken);
  }, [goalId, setPixelEntity, taskCompleted, taskDeleted, accessToken]);


  const drawGrid = (stage, gridSize) => {
    const grid = new PIXI.Graphics();
    grid.lineStyle(1, 0xeeeeee, 1);

    const width = canvasSizeX * gridSize;
    const height = canvasSizeY * gridSize;

    for (let x = 0; x <= width; x += gridSize) {
      grid.moveTo(x, 0);
      grid.lineTo(x, height);
    }

    for (let y = 0; y <= height; y += gridSize) {
      grid.moveTo(0, y);
      grid.lineTo(width, y);
    }

    stage.addChild(grid);
  };

  const handlePixelClick = useCallback((id) => {
    const savedPixels = pixels || JSON.parse(localStorage.getItem('pixels'));
    const pixelData = savedPixels.find(pixel => pixel.id === id);
    if (pixelData) {
      setSelectedPixel(pixelData);
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

      localStorage.setItem('pixels', JSON.stringify(updatedPixels));

      return updatedPixels;
    });

    handlePixelClick(id);
  },[handlePixelClick]);



  useEffect(() => {
    if (appRef.current) return;
    const baseWidth = canvasSizeX * gridSize;
    const baseHeight = canvasSizeY * gridSize;
    const width = isMobile ? 300 : baseWidth;
    const height = isMobile ? Math.round(300 * (baseHeight / baseWidth)) : baseHeight;
    const scaleX = width / baseWidth;
    const scaleY = height / baseHeight;
    const scale = Math.min(scaleX, scaleY);
    const bgColor = goalColor?.replace('#', '0x');

    const app = new PIXI.Application({
      width,
      height,
      backgroundColor: parseInt(bgColor),
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    pixiContainer.current.appendChild(app.view);
    appRef.current = app;

    app.stage.scale.set(scale);

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


    pixelRefs.current[id] = pixel;
    stage.addChild(pixel);
    // eslint-disable-next-line
  }, [onDragEnd]);


  useEffect(() => {
    if (!appRef.current) return;

    const stage = appRef.current.stage;
    localStorage.setItem('pixels', JSON.stringify(pixels));

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
      const updatedPixels = pixels.map((pixel) =>
        pixel.id === pixelId ? { ...pixel, color: newColor } : pixel
      );
      setPixels(updatedPixels);

      localStorage.setItem('pixels', JSON.stringify(updatedPixels));

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
