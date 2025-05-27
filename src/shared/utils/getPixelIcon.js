import cake from '../icons/illustration/cake.svg';
import cat from '../icons/illustration/cat.svg';
import car from '../icons/illustration/car.svg';
import rabbit from '../icons/illustration/rabbit.svg';
import heart from '../icons/illustration/heart.svg';
import flower from '../icons/illustration/flower.jpg';
import flowerPark from '../icons/illustration/flower-park.jpg';
import books from '../icons/illustration/books.png';
import money from '../icons/illustration/money.jpg';
import heart2 from '../icons/illustration/heart2.png';

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
    case 'flower':
      return flower;
    case 'flower-park':
      return flowerPark;
    case 'books':
      return books;
    case 'money':
      return money;
    case 'heart2':
      return heart2;
    default:
      return cat;
  }
};
export default getPixelIcon;
