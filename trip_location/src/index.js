import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {CssBaseline} from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <CssBaseline>
              <App />
          </CssBaseline>
      </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
