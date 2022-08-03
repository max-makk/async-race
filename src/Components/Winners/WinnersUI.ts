import { WinnerInfo } from '../../services/interfaces';

const WinnersUI = (data: WinnerInfo) => (`
  <tr>
    <td>${data.id}</td>
    <td style="color: ${data.car.color}">__/‾‾|‾‾\\___<br/>'–◯–—––◯–'</td>
    <td>${data.car.name}</td>
    <td>${data.wins}</td>
    <td>${data.time}</td>
  </tr>
`);

export default WinnersUI;
