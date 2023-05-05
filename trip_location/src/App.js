
/** @jsxImportSource @emotion/react */
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import {CssBaseline} from "@mui/material";
import Nav from "./components/Nav/Nav";
import {css} from "@emotion/react";
import Login from "./pages/Login/Login";

const mainStyles = css`
  margin-top: 64px;
`;

function App() {
  return (
      <>
          <CssBaseline/>
          <Nav title={"Trip Location"}/>
            <Routes css={mainStyles}>
                <Route path={"/"} element={<Home />}/>
                <Route path={"/login"} element={<Login />}/>
            </Routes>
      </>

  );
}

export default App;
