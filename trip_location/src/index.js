import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {CssBaseline} from "@mui/material";
import {QueryClient, QueryClientProvider} from "react-query";
import {RecoilRoot} from "recoil";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RecoilRoot>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <CssBaseline>
                    <App />
                </CssBaseline>
            </BrowserRouter>
        </QueryClientProvider>
    </RecoilRoot>
  // </React.StrictMode>
);


reportWebVitals();
