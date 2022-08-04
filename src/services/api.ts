import { CarObject, Winner } from './interfaces';

const url = 'http://127.0.0.1:3000';
const garage = `${url}/garage`;
const engine = `${url}/engine`;
const winners = `${url}/winners`;

const getCars = async (page: number, limit = 7) => {
  const res = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return { cars: await res.json(), total: res.headers.get('X-Total-Count') };
};

const getCar = async (id: number) => (await fetch(`${garage}/${id}`)).json();

const createCar = async (body: CarObject) => (await fetch(`${garage}`, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

const deleteCar = async (id: number) => (await fetch(`${garage}/${id}`, {
  method: 'DELETE',
})).json();

const updateCar = async (id: number, body: CarObject) => (await fetch(`${garage}/${id}`, {
  method: 'PUT',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

const startEngine = async (id: number) => (await fetch(`${engine}?id=${id}&status=started`, {
  method: 'PATCH',
})).json();

const stopEngine = async (id: number) => (await fetch(`${engine}?id=${id}&status=stopped`, {
  method: 'PATCH',
})).json();

const drive = async (id: number) => {
  const res = await fetch(`${engine}?id=${id}&status=drive`, {
    method: 'PATCH',
  }).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

const getSortOrder = (sort: string, order: string) => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return '';
};

const getWinners = async ({
  page, limit = 10, sort, order,
}: { page: number, limit: number, sort: string, order: string }) => {
  const response = await fetch(`${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);
  const items = await response.json();

  return {
    items: await Promise.all(items.map(async (winner: Winner) => ({
      ...winner, car: await getCar(winner.id),
    }))),
    count: response.headers.get('X-Total-Count'),
  };
};

const getWinner = async (id: number) => (await fetch(`${winners}/${id}`)).json();

const getWinnerStatus = async (id: number) => (await fetch(`${winners}/${id}`)).status;

const deleteWinner = async (id: number) => (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();

const createWinner = async (body: Winner) => (await fetch(winners, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

const updateWinner = async (id: number, body: Winner) => (await fetch(`${winners}/${id}`, {
  method: 'PUT',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

const saveWinner = async ({ id, time }: { id: number, time: number }) => {
  const winnerStatus = await getWinnerStatus(id);

  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
};

export default {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCar,
  startEngine,
  stopEngine,
  drive,
  getWinners,
  saveWinner,
  deleteWinner,
};
