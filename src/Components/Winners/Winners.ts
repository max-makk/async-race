import WinnersUI from './WinnersUI';
import s from '../../services/api';

export default class Winners {
  section: HTMLElement;

  tbody: HTMLElement;

  count: string;

  page: number;

  sort: 'wins' | 'time';

  order: 'ASC' | 'DESC';

  btnWins: HTMLElement;

  btnTime: HTMLElement;

  constructor() {
    this.page = 1;
    this.count = '0';
    this.section = document.querySelector('.section-winners');
    this.tbody = document.querySelector('tbody');
    this.sort = 'wins';
    this.order = 'DESC';
    this.btnWins = document.querySelector('.btn-wins');
    this.btnTime = document.querySelector('.btn-time');
    this.btnWins.addEventListener('click', () => {
      this.sort = 'wins';
      this.order = this.order === 'ASC' ? 'DESC' : 'ASC';
      this.init();
    });
    this.btnTime.addEventListener('click', () => {
      this.sort = 'time';
      this.order = this.order === 'ASC' ? 'DESC' : 'ASC';
      this.init();
    });
  }

  async init(): Promise<void> {
    this.section.style.display = 'block';
    this.tbody.textContent = '';
    const wins = await s.getWinners({
      page: this.page, limit: 10, sort: this.sort, order: this.order,
    });
    this.count = wins.count;
    wins.items.forEach((el) => {
      const item = WinnersUI(el);
      this.tbody.innerHTML += item;
    });
    this.displayWinners();
    this.displayPages();
  }

  hide(): void {
    this.section.style.display = 'none';
  }

  displayPages(): void {
    document.querySelector('.number-pages-winners').textContent = this.page.toString();
  }

  displayWinners(): void {
    document.querySelector('.number-winners').textContent = this.count;
  }

  prevPage(): void {
    if (this.page - 1 < 1) {
      return;
    }
    this.page -= 1;
    this.init();
    this.displayPages();
  }

  nextPage(): void {
    if (this.page + 1 > Math.ceil(+this.count / 10)) {
      return;
    }
    this.page += 1;
    this.init();
    this.displayPages();
  }
}
