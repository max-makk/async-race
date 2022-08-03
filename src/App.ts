import Garage from './Components/Garage/Garage';
import Winners from './Components/Winners/Winners';

export default class App {
  garage: Garage;

  winners: Winners;

  constructor() {
    this.garage = new Garage();
    this.winners = new Winners();
  }

  addListeners() {
    document.querySelector('.btn-winners').addEventListener('click', () => {
      (document.querySelector('.garage-header') as HTMLHeadElement).style.display = 'none';
      (document.querySelector('.garage-main') as HTMLElement).style.display = 'none';
      this.winners.init();
    });
    document.querySelector('.btn-garage').addEventListener('click', () => {
      (document.querySelector('.garage-header') as HTMLHeadElement).style.display = 'block';
      (document.querySelector('.garage-main') as HTMLElement).style.display = 'block';
      this.winners.hide();
    });
    document.querySelector('.btn-race').addEventListener('click', () => {
      this.garage.startRace();
    });
    document.querySelector('.btn-generate').addEventListener('click', () => {
      this.garage.generageCars();
    });
    document.querySelector('.btn-create').addEventListener('click', () => {
      const name = document.getElementById('create-name') as HTMLInputElement;
      const color = document.getElementById('create-color') as HTMLInputElement;
      if (name.value === '') return;
      this.garage.addCar(name.value, color.value);
    });
    document.querySelector('.prev').addEventListener('click', () => {
      this.garage.prevPage();
    });
    document.querySelector('.next').addEventListener('click', () => {
      this.garage.nextPage();
    });
    document.querySelector('.prev-winners').addEventListener('click', () => {
      this.winners.prevPage();
    });
    document.querySelector('.next-winners').addEventListener('click', () => {
      this.winners.nextPage();
    });
  }
}
