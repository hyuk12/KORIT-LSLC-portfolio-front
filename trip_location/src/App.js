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
import MyPage from "./pages/MyPage";
import AuthRouter from "./components/Routes/AuthRoute/AuthRouter";
import ModifyForm from "./components/contents/ModifyForm/ModifyForm";
import OAuth2Register from "./pages/SignUp/OAuth2/OAuth2Register";


const mainStyles = css`
  margin-top: 64px;
`;

function App() {
  return (
      <>
          <CssBaseline/>
          <Nav />
            <Routes css={mainStyles}>
                <Route path={"/"} element={<AuthRouter path={'/'} element={<Home />} />}/>
                <Route path={"/auth/login"} element={<AuthRouter path={'/auth/login'} element={<Login />} />}/>
                <Route path={"/auth/signup"} element={<AuthRouter path={'/auth/signup'} element={<SignUp />} />}/>
                <Route path={"/auth/oauth2/signup"} element={<AuthRouter path={'/auth/oauth2/signup'} element={<OAuth2Register />} />}/>
                <Route path={"/user/:id"} element={<AuthRouter path={'/user/:id'} element={<MyPage />} />}/>
                <Route path={"/user/modify/:id"} element={<AuthRouter path={'/user/modify/:id'} element={<ModifyForm />} />}/>
                <Route path={"/contents"} element={<AuthRouter path={'/contents'} element={<Contents />} />}/>
            </Routes>
            
      </>

  );
}

export default App;
