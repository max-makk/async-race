import s from '../../services/api';
import CarUI from './CarUI';

export default class Car {
  UI: HTMLLIElement;

  id: number;

  name: string;

  color: string;

  animation: Animation;

  time: number;

  startBtn: HTMLButtonElement;

  stopBtn: HTMLButtonElement;

  constructor(id: number, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.UI = CarUI(this.name, this.color);
    this.animation = undefined;
    this.time = undefined;
    this.startBtn = this.UI.querySelector('.car-start');
    this.startBtn.addEventListener('click', () => {
      this.startCar();
    });
    this.startBtn.style.backgroundColor = 'red';
    this.stopBtn = this.UI.querySelector('.car-stop');
    this.stopBtn.addEventListener('click', () => {
      this.stopCar();
    });
    this.stopBtn.disabled = true;
    this.UI.querySelector('.car-select').addEventListener('click', () => {
      this.editCar();
    });
  }

  getUI(): HTMLElement {
    return this.UI;
  }

  editCar(): void {
    const field = document.querySelector('.update-placeholder');
    field.textContent = '';
    field.innerHTML = `
      <input type="text" name="update-name" id="update-name">
      <input type="color" name="update-color" id="update-color">
      <button class="btn-update">update</button>`;
    const name = (document.querySelector('#update-name') as HTMLInputElement);
    name.value = this.name;
    const color = (document.querySelector('#update-color') as HTMLInputElement);
    color.value = this.color;
    const btn = (document.querySelector('.btn-update') as HTMLButtonElement);
    const updateCurrentCar = async () => {
      if (!name.value) return;
      const updated = await s.updateCar(this.id, { name: name.value, color: color.value });
      this.color = updated.color;
      this.name = updated.name;
      (this.UI.querySelector('.car-display') as HTMLDivElement).style.color = updated.color;
      (this.UI.querySelector('.car-name') as HTMLDivElement).style.color = updated.color;
      (this.UI.querySelector('.car-name') as HTMLDivElement).textContent = updated.name;
      field.textContent = '';
      field.innerHTML = `
      <input type="text" name="update-name" id="update-name" disabled>
      <input type="color" name="update-color" id="update-color" disabled>
      <button class="btn-update" disabled>update</button>`;
    };
    btn.addEventListener('click', updateCurrentCar);
  }

  async startCar(): Promise<void> {
    const res = await s.startEngine(this.id);
    this.time = res.distance / res.velocity;
    this.animateCar();
    this.startBtn.disabled = true;
    this.startBtn.style.backgroundColor = 'rgb(32,32,32)';
    await this.enableDriveMode();
  }

  async stopCar(): Promise<void> {
    const res = await s.stopEngine(this.id);
    if (res.velocity === 0) {
      this.animation.cancel();
      this.startBtn.disabled = false;
      this.stopBtn.disabled = true;
      this.startBtn.style.backgroundColor = 'red';
      this.stopBtn.style.backgroundColor = 'rgb(32,32,32)';
      (this.UI.querySelector('.car-display') as HTMLDivElement).style.transform = 'translate(0)';
    }
  }

  animateCar(): void {
    const view: HTMLDivElement = this.UI.querySelector('.car-display');
    const w = this.UI.offsetWidth - 55;
    const carWidth = view.offsetWidth;
    this.animation = view.animate(
      [{ transform: 'translateX(0)' }, { transform: `translateX(${w - carWidth}px)` }],
      {
        duration: this.time,
        easing: 'ease-in-out',
      },
    );
    this.animation.play();
    this.animation.onfinish = () => {
      this.enableStopBtn();
      view.style.transform = `translate(${w - carWidth}px)`;
    };
  }

  async enableDriveMode(): Promise<void> {
    const isDrive = await s.drive(this.id);
    return new Promise((res) => {
      if (isDrive.success) {
        res();
      } else {
        this.animation.pause();
      }
    });
  }

  enableStopBtn(): void {
    this.stopBtn.disabled = false;
    this.stopBtn.style.backgroundColor = 'blue';
  }
}
