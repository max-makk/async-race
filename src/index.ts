import './style.css';

import carService from './services/api';
import c from './utils/randomCars';

// carService.updateCar(5, { name: 'hel', color: 'hooo' }).then((res) => console.log(res));
// carService.startEngine(1).then((res) => console.log(res));
// carService.stopEngine(1).then((res) => console.log(res));
// carService.drive(1).then((res) => console.log(res));
// carService.getCars(1, 7).then((res) => console.log(res));

import App from './App';

const app = new App();

app.garage.init();

app.winners.hide();

app.addListeners();
