import { CarObject } from './interfaces';

const names = ['Lady', 'Miley', 'Charli', 'Katy', 'Britney', 'Kylie', 'Dua', 'Christina', 'Nelly', 'Ariana'];
const models = ['Gaga', 'Cyrus', 'XCX', 'Perry', 'Spears', 'Minogue', 'Lipa', 'Aguilera', 'Furtado', 'Grande'];

const getRandomName: () => string = () => `${names[Math.floor(Math.random() * names.length)]} ${models[Math.floor(Math.random() * models.length)]}`;

const getRandomColor: () => string = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getRandomCars: () => CarObject[] = () => [...new Array(100)].map(() => ({
  name: getRandomName(), color: getRandomColor(),
}));

export default {
  getRandomCars,
};
