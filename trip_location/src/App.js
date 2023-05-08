/** @jsxImportSource @emotion/react */
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Contents from './pages/Contents/Contents';
import {CssBaseline} from "@mui/material";
import Nav from "./components/Nav/Nav";
import {css} from "@emotion/react";
import React from "react";
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';


const mainStyles = css`
  margin-top: 64px;
`;

function App() {
  return (
      <>
          <CssBaseline/>
          <Nav title={"Trip Location"} />
            <Routes css={mainStyles}>
                <Route path={"/"} element={<Home />}/>
                <Route path={"/login"} element={<Login />}/>
                <Route path={"/user"} element={<SignUp />}/>
                <Route path={"/contents"} element={<Contents />}/>
            </Routes>
            
      </>

  );
}

export default App;
