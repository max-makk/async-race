import WinnersUI from './WinnersUI';
import s from '../../services/api';

export default class Winners {
  section: HTMLElement;

  tbody: HTMLElement;

  count: string;

  page: number;

  constructor() {
    this.page = 1;
    this.count = '0';
    this.section = document.querySelector('.section-winners');
    this.tbody = document.querySelector('tbody');
  }

  async init() {
    this.section.style.display = 'block';
    this.tbody.textContent = '';
    const wins = await s.getWinners({
      page: this.page, limit: 10, sort: 'wins', order: 'ASC',
    });
    this.count = wins.count;
    wins.items.forEach((el) => {
      const item = WinnersUI(el);
      this.tbody.innerHTML += item;
    });
    this.displayWinners();
    this.displayPages();
  }

  hide() {
    this.section.style.display = 'none';
  }

  displayPages() {
    document.querySelector('.number-pages-winners').textContent = this.page.toString();
  }

  displayWinners() {
    document.querySelector('.number-winners').textContent = this.count;
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
    if (this.page + 1 > Math.ceil(+this.count / 10)) {
      return;
    }
    this.page += 1;
    this.init();
    this.displayPages();
  }
}
