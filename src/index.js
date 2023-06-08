import React , {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter  } from 'react-router-dom';
import StateProvider  from './components/Context/stateProvide';




ReactDOM.render(
  <StateProvider>
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
  </StateProvider>,
  document.getElementById('root')
);
