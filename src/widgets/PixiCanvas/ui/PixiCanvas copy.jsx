// import { useEffect, useRef, useState, useImperativeHandle, forwardRef, useCallback } from "react";
// import * as PIXI from 'pixi.js';
// import { v4 as uuidv4 } from 'uuid';
// // import { replace } from "react-router-dom";
// import getPixels from "../api/getPixels";

// const PixiCanvas = forwardRef(({ goalId, setPixelEntity, goalColor, canvasSizeX, canvasSizeY, onOpenModal, onCloseModal, onUpdatePixelColor }, canvasRef) => {

//   console.log(goalId);
//   const gridSize = 10;

//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//     useEffect(() => {
//       const handleResize = () => {
//         setIsMobile(window.innerWidth < 768);
//       };
//       window.addEventListener('resize', handleResize);
//       return () => {
//         window.removeEventListener('resize', handleResize);
//       }
//     }, []);

//   const pixiContainer = useRef(null);
//   const appRef = useRef(null);
//   const pixelRefs = useRef({});
//   const [pixels, setPixels] = useState([]);
//   // const [backendPixels, setBackendPixels] = useState('');
//   const [selectedPixel, setSelectedPixel] = useState(null);

//   useEffect(() => {
//     getPixels(setPixels, goalId, setPixelEntity);
//   }, [goalId, setPixelEntity]);

//   // console.log(backendPixels)
//   console.log(pixels, localStorage.getItem('pixels'))

//   const drawGrid = (stage, gridSize) => {
//     const grid = new PIXI.Graphics();
//     grid.lineStyle(1, 0xeeeeee, 1);

//     for (let x = 0; x < appRef.current.screen.width; x += gridSize) {
//       grid.moveTo(x, 0);
//       grid.lineTo(x, appRef.current.screen.height);
//     }

//     for (let y = 0; y < appRef.current.screen.height; y += gridSize) {
//       grid.moveTo(0, y);
//       grid.lineTo(appRef.current.screen.width, y);
//     }

//     stage.addChild(grid);
//   };

//   const handlePixelClick = useCallback((id) => {
//     // const savedPixels = JSON.parse(localStorage.getItem('pixels')) || [];
//     const savedPixels = pixels || JSON.parse(localStorage.getItem('pixels'));
//     const pixelData = savedPixels.find(pixel => pixel.id === id);
//     console.log('Открыть модальное окно для пикселя с ID:', id);
//     if (pixelData) {
//       setSelectedPixel(pixelData);
//     }
//     onOpenModal(pixelData);
//   },[onOpenModal, pixels]);


//   const onSelectPixel = useCallback((event, id) => {
//     event.stopPropagation();
//     setSelectedPixel(id);
//     handlePixelClick(id);
//   },[handlePixelClick]);

//   const onDragEnd = useCallback((event, id) => {
//     const pixel = event.currentTarget;
//     pixel.dragging = false;
//     pixel.dragData = null;

//     setPixels((prev) => {
//       const updatedPixels = prev.map((p) =>
//         p.id === id ? { ...p, x: pixel.x, y: pixel.y } : p
//       );
//       localStorage.setItem('pixels', JSON.stringify(updatedPixels));
//       return updatedPixels;
//     });

//     handlePixelClick(id);
//   },[handlePixelClick]);





//   const addPixel = useCallback((stage, x, y, color = '#DBD4E6', id = uuidv4()) => {
//     // if (pixelRefs.current[id]) {
//     //   console.warn(`Pixel with id ${id} already exists, skipping add.`);
//     //   return;
//     // }
//     // const existingPixel = pixels.find(pixel => pixel.id === id);
//     // if (existingPixel) {
//     //   // setPixels(prev => {
//     //   //   const updatedPixels = prev.map(p => (p.id === id ? { ...p, x, y, color } : p));
//     //   //   localStorage.setItem('pixels', JSON.stringify(updatedPixels));
//     //   //   return updatedPixels;
//     //   // });
//     //   return;
//     // }

//     const pixel = new PIXI.Graphics();
//     pixel.beginFill(PIXI.utils.string2hex(color));
//     pixel.drawRect(0, 0, 20, 20);
//     pixel.endFill();
//     pixel.position.set(x, y);
//     pixel.interactive = true;
//     pixel.cursor = 'pointer';

//     pixel.on('pointerdown', (event) => onSelectPixel(event, id));
//     pixel.on('pointerdown', onDragStart);
//     pixel.on('pointerup', (event) => onDragEnd(event, id));
//     pixel.on('pointerupoutside', (event) => onDragEnd(event, id));
//     pixel.on('pointermove', onDragMove);

//     pixelRefs.current[id] = pixel;
//     stage.addChild(pixel);

//     setPixels((prev) => {
//       const existingPixel = prev.find(p => p.id === id);
//       if (!existingPixel) {
//         const newPixel = { id, x: pixel.x, y: pixel.y, color };
//         const updatedPixels = [...prev, newPixel];
//         localStorage.setItem('pixels', JSON.stringify(updatedPixels));
//         return updatedPixels;
//       }
//       return prev;
//     });
//   }, [onDragEnd, onSelectPixel]);






//   useEffect(() => {
//     if (appRef.current) return;

//     const width = isMobile ? 300 : (canvasSizeX * gridSize);
//     const height = isMobile ? 250 : (canvasSizeY * gridSize);
//     const bgColor = goalColor?.replace('#', '0x');

//     const app = new PIXI.Application({
//       width,
//       height,
//       backgroundColor: parseInt(bgColor),
//     });

//     pixiContainer.current.appendChild(app.view);
//     appRef.current = app;

//     drawGrid(app.stage, gridSize);

//     // const savedPixels = JSON.parse(localStorage.getItem('pixels')) || [];
//     // let savedPixels = [];
//     // if(pixels.length !== 0) {
//     //   savedPixels = pixels;
//     //   setPixels(savedPixels);
//     // }

//     // console.log('pixels in useEffect', pixels)
//     // pixels?.forEach((pixel) => {
//     //   addPixel(app.stage, pixel.x, pixel.y, pixel.color, pixel.id);
//     // });

//     return () => {
//       if (appRef.current) {
//         appRef.current.destroy(true);
//         appRef.current = null;
//       }
//     };
//   // eslint-disable-next-line
//   }, [goalColor, canvasSizeX, canvasSizeY, isMobile]);


//   useEffect(() => {
//     if (!appRef.current) return;

//     const stage = appRef.current.stage;
//     // const currentIds = Object.keys(pixelRefs.current);
//     // const newIds = pixels?.map(p => p.id);

//     console.log('pixels in second useEffect', pixels, localStorage.getItem('pixels'))
//     Object.values(pixelRefs.current).forEach(pixel => {
//       stage.removeChild(pixel);
//       pixel.destroy(); // важно уничтожить графику в памяти
//     });

//     pixelRefs.current = {}; // очищаем рефы

//     // Добавляем новые пиксели
//     pixels?.forEach((pixel) => {
//       addPixel(stage, pixel.x, pixel.y, pixel.color, pixel.id);
//     });

//     // // Удаляем пиксели, которых больше нет
//     // currentIds.forEach(id => {
//     //   if (!newIds.includes(id)) {
//     //     stage.removeChild(pixelRefs.current[id]);
//     //     delete pixelRefs.current[id];
//     //   }
//     // });

//     // Добавляем новые пиксели
//     // pixels?.forEach(pixel => {
//     //   if (!pixelRefs.current[pixel.id]) {
//     //     addPixel(stage, pixel.x, pixel.y, pixel.color, pixel.id);
//     //   } else {
//     //     // Обновляем позицию и цвет существующего пикселя
//     //     const existingPixel = pixelRefs.current[pixel.id];
//     //     existingPixel.position.set(pixel.x, pixel.y);

//     //     existingPixel.clear();
//     //     existingPixel.beginFill(PIXI.utils.string2hex(pixel.color));
//     //     existingPixel.drawRect(0, 0, 20, 20);
//     //     existingPixel.endFill();
//     //   }
//     // });

//   }, [pixels, addPixel]);








//   useImperativeHandle(canvasRef, () => ({
//     addPixel: (x, y, color) => {
//       if (!appRef.current) {
//         console.error('PIXI Application not initialized');
//         return;
//       }
//       addPixel(appRef.current.stage, x, y, color);
//     },
//     updatePixelColor: (pixelId, newColor) => {
//       console.log('New color:', newColor);
//       const updatedPixels = pixels.map((pixel) =>
//         pixel.id === pixelId ? { ...pixel, color: newColor } : pixel
//       );
//       setPixels(updatedPixels);
//       localStorage.setItem('pixels', JSON.stringify(updatedPixels));
//       const app = appRef.current;
//       const graphics = appRef.current.stage.children.find(
//         (child) => child.pixelId === pixelId
//       );

//       const pixelGraphic = pixelRefs.current[pixelId];
//       if (pixelGraphic) {
//         pixelGraphic.clear();
//         pixelGraphic.beginFill(PIXI.utils.string2hex(newColor));
//         pixelGraphic.drawRect(0, 0, 20, 20);
//         pixelGraphic.endFill();
//       } else {
//         console.log('Pixel graphic not found for pixelId:', pixelId);
//       }
//     },
//   }));

//   // const onSelectPixel = (event, id) => {
//   //   event.stopPropagation();
//   //   setSelectedPixel(id);
//   //   handlePixelClick(id);
//   // };

//   const onDragStart = (event) => {
//     const pixel = event.currentTarget;
//     pixel.dragData = event.data;
//     pixel.dragging = true;
//   };

//   // const onDragEnd = (event, id) => {
//   //   const pixel = event.currentTarget;
//   //   pixel.dragging = false;
//   //   pixel.dragData = null;

//   //   setPixels((prev) => {
//   //     const updatedPixels = prev.map((p) =>
//   //       p.id === id ? { ...p, x: pixel.x, y: pixel.y } : p
//   //     );
//   //     localStorage.setItem('pixels', JSON.stringify(updatedPixels));
//   //     return updatedPixels;
//   //   });

//   //   handlePixelClick(id);
//   // };

//   const onDragMove = (event) => {
//     const pixel = event.currentTarget;
//     if (pixel.dragging) {
//       const newPosition = pixel.dragData.getLocalPosition(pixel.parent);

//       if (newPosition.x < 0 || newPosition.x > appRef.current.renderer.width - gridSize ||
//         newPosition.y < 0 || newPosition.y > appRef.current.renderer.height - gridSize) {
//         return;
//       }

//       pixel.x = Math.round(newPosition.x / gridSize) * gridSize;
//       pixel.y = Math.round(newPosition.y / gridSize) * gridSize;
//     }
//   };
//   // console.log(selectedPixel)

//   const downloadCanvasImage = () => {
//     if (!appRef.current) {
//       console.error('PIXI app is not initialized');
//       return;
//     }

//     const canvas = appRef.current.view;
//     const dataURL = canvas.toDataURL('image/png');

//     const link = document.createElement('a');
//     link.href = dataURL;
//     link.download = 'my-canvas.png';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };


//   // useEffect(() => {
//   //   if (appRef.current) {
//   //     // Clear all existing pixels
//   //     appRef.current.stage.removeChildren();

//   //     // Redraw all pixels with updated colors
//   //     pixels.forEach((pixel) => {
//   //       addPixel(appRef.current.stage, pixel.x, pixel.y, pixel.color, pixel.id);
//   //     });
//   //   }
//   // }, [pixels]);

//   // console.log(localStorage.getItem('pixels', JSON.stringify()))
//   return (
//     <>
//       <div className="canvas-container">
//         <div className="pixi-canvas block" ref={pixiContainer}></div>
//       </div>
//       <div>
//       {/* <button onClick={downloadCanvasImage}>download</button> */}
//         {/* <div className="pixi-canvas__button-wrapper">
//               <button className="pixi-canvas__button button" onClick={zoomIn}>+</button>
//               <button className="pixi-canvas__button button" onClick={zoomOut}>-</button>
//             </div> */}
//       </div>

//     </>
//   )
// });

// export default PixiCanvas;
