import s from '../../services/api';
import r from '../../utils/randomCars';
import Car from '../Car/Car';
import displayNotify from '../../utils/notify';

import { CarBody } from '../../services/interfaces';

export default class Garage {
  cars: Car[];

  list: HTMLUListElement;

  page: number;

  total: string;

  constructor() {
    this.list = document.querySelector('ul');
    this.cars = [];
    this.page = 1;
    this.total = '0';
  }

  displayTotal() {
    document.querySelector('.number-cars').textContent = this.total;
  }

  async init() {
    const res = await this.getCars();
    this.createCars(res);
  }

  async getCars() {
    const res = await s.getCars(this.page, 7);
    this.total = res.total;
    return res.cars;
  }

  createCars(res: CarBody[]) {
    this.cars = [];
    this.list.textContent = '';
    res.forEach((el) => {
      const car = new Car(el.id, el.name, el.color);
      car.getUI().querySelector('.car-remove').addEventListener('click', () => {
        this.removeCar(el.id);
      });
      this.list.append(car.getUI());
      this.cars.push(car);
    });
    this.displayTotal();
    this.displayPages();
  }

  async addCar(name: string, color: string) {
    await s.createCar({ name, color });
    this.init();
  }

  removeCar(id: number) {
    s.deleteCar(id);
    s.deleteWinner(id);
    this.init();
  }

  async startRace() {
    (document.querySelector('.btn-race') as HTMLButtonElement).style.backgroundColor = 'yellow';
    (document.querySelector('.btn-race') as HTMLButtonElement).disabled = true;
    const res = this.cars.map(async (el) => {
      await el.startCar();
      return el;
    });
    const win = await Promise.race(res);
    const seconds = ((win.time % 60000) / 1000).toFixed(2);
    if (win) {
      (document.querySelector('.btn-race') as HTMLButtonElement).style.backgroundColor = 'rgb(32,32,32)';
      (document.querySelector('.btn-race') as HTMLButtonElement).disabled = false;
    }
    displayNotify(win.name, +seconds);
    await s.saveWinner({ id: win.id, time: +seconds });
  }

  resetRace() {
    this.cars.forEach((el) => el.stopCar());
  }

  generageCars() {
    const randomCars = r.getRandomCars();
    randomCars.forEach((el) => {
      this.addCar(el.name, el.color);
    });
  }

  prevPage() {
    if (this.page - 1 < 1) {
      return;
    }
    this.page -= 1;
    this.init();
    this.displayPages();
  }

  nextPage() {
    if (this.page + 1 > Math.ceil(+this.total / 7)) {
      return;
    }
    this.page += 1;
    this.init();
    this.displayPages();
  }

  displayPages() {
    document.querySelector('.number-pages').textContent = this.page.toString();
  }
}
