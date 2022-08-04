const CarUI = (name: string, color: string): HTMLLIElement => {
  const car = document.createElement('li');
  const select = document.createElement('button');
  const remove = document.createElement('button');
  const start = document.createElement('button');
  const stop = document.createElement('button');

  car.classList.add('car');
  const carEdit = document.createElement('div');
  carEdit.classList.add('car-edit');
  select.classList.add('car-select');
  select.textContent = 'select';
  remove.classList.add('car-remove');
  remove.textContent = 'remove';
  const carName = document.createElement('span');
  carName.textContent = name;
  carName.style.color = color;
  carName.classList.add('car-name');
  carEdit.append(select);
  carEdit.append(remove);
  carEdit.append(carName);

  const carWrapper = document.createElement('div');
  carWrapper.classList.add('car-wrapper');
  const carControls = document.createElement('div');
  carControls.classList.add('car-controls');
  start.classList.add('car-start');
  start.textContent = 'A';
  stop.classList.add('car-stop');
  stop.textContent = 'B';
  carControls.append(start);
  carControls.append(stop);
  const carDisplay = document.createElement('div');
  carDisplay.style.color = color;
  carDisplay.classList.add('car-display');
  carDisplay.innerHTML = '__/‾‾|‾‾\\____<br/>\'–◯–—––◯–\'';
  carWrapper.append(carControls);
  carWrapper.append(carDisplay);

  car.append(carEdit);
  car.append(carWrapper);

  return car;
};

export default CarUI;
