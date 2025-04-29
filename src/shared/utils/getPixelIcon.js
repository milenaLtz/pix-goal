import cake from '../icons/illustration/cake.svg';
import cat from '../icons/illustration/cat.svg';
import car from '../icons/illustration/car.svg';
import rabbit from '../icons/illustration/rabbit.svg';
import heart from '../icons/illustration/heart.svg';

const getPixelIcon = (iconName) => {
  switch (iconName) {
    case 'cake':
      return cake;
    case 'cat':
      return cat;
    case 'rabbit':
      return rabbit;
    case 'car':
      return car;
    case 'heart':
      return heart;
    default:
      return cat;
  }
};
export default getPixelIcon;
