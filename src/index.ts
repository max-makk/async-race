import './style.css';
import Page from './Components/Page';
import App from './App';

document.body.innerHTML += Page();

const app = new App();

app.garage.init();

app.winners.hide();

app.addListeners();
