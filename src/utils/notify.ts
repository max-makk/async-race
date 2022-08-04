const displayNotify = (name: string, time: number) => {
  const div = document.createElement('div');
  div.classList.add('notify');
  div.textContent = `${name} went first (${time})!`;
  document.body.append(div);
  setTimeout(() => div.remove(), 4500);
};

export default displayNotify;
