const names = ['Lady', 'Miley', 'Charli', 'Katy', 'Britney', 'Kylie', 'Dua', 'Christina', 'Nelly', 'Ariana'];
const models = ['Gaga', 'Cyrus', 'XCX', 'Perry', 'Spears', 'Minogue', 'Lipa', 'Aguilera', 'Furtado', 'Grande'];

const getRandomName = () => `${names[Math.floor(Math.random() * names.length)]} ${models[Math.floor(Math.random() * models.length)]}`;

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

interface Car {
  name: string
  color: string
}

const getRandomCars: () => Car[] = () => [...new Array(100)].map(() => ({
  name: getRandomName(), color: getRandomColor(),
}));

export default {
  getRandomCars,
};
