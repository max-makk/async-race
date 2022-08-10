import s from '../../services/api';
import CarUI from './CarUI';

export default class Car {
  UI: HTMLLIElement;

  id: number;

  name: string;

  color: string;

  animationTime: number;

  startBtn: HTMLButtonElement;

  stopBtn: HTMLButtonElement;

  state: number | undefined;

  view: HTMLDivElement;

  constructor(id: number, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.UI = CarUI(this.name, this.color);
    this.animationTime = undefined;
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
    this.state = undefined;
    this.view = this.UI.querySelector('.car-display');
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
    this.animationTime = res.distance / res.velocity;
    this.startBtn.disabled = true;
    this.startBtn.style.backgroundColor = 'rgb(32,32,32)';
    this.stopBtn.disabled = false;
    this.stopBtn.style.backgroundColor = 'blue';
    this.animateCar();
    await this.enableDriveMode();
  }

  async stopCar(): Promise<void> {
    const res = await s.stopEngine(this.id);
    this.animationTime = res.distance / res.velocity;
    window.cancelAnimationFrame(this.state);
    this.view.style.transform = 'translate(0)';
    this.view.classList.remove('accident');
    this.startBtn.disabled = false;
    this.startBtn.style.backgroundColor = 'red';
    this.stopBtn.disabled = true;
    this.stopBtn.style.backgroundColor = 'rgb(32,32,32)';
  }

  animateCar() {
    const view: HTMLDivElement = this.UI.querySelector('.car-display');
    const carWidth = view.offsetWidth;
    const buttonsWidth = 55;
    const roadWidth = this.UI.offsetWidth - buttonsWidth - carWidth;
    let start: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const passed = Math.round(time * (roadWidth / this.animationTime));
      view.style.transform = `translateX(${Math.min(passed, roadWidth)}px)`;

      if (passed < roadWidth) {
        this.state = window.requestAnimationFrame(step);
      }
    };

    this.state = window.requestAnimationFrame(step);
  }

  async enableDriveMode(): Promise<void> {
    const isDrive = await s.drive(this.id);
    return new Promise((res) => {
      if (isDrive.success) {
        res();
      } else {
        this.view.classList.add('accident');
        window.cancelAnimationFrame(this.state);
      }
    });
  }
}
