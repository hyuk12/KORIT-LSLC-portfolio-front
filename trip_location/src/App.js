/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Nav from "./components/Nav/Nav";
import AuthRouter from "./components/Routes/AuthRoute/AuthRouter";
import ModifyForm from "./components/contents/ModifyForm/ModifyForm";
import Contents from './pages/Contents/Contents';
import Home from "./pages/Home";
import Login from './pages/Login/Login';
import OAuth2Login from "./pages/Login/OAuth2Login/OAuth2Login";
import MyPage from "./pages/MyPage";
import CheckEmail from './pages/NewPassword/CheckEmail';
import PasswordReset from './pages/NewPassword/PasswordReset';
import OAuth2Merge from "./pages/SignUp/OAuth2/OAuth2Merge";
import OAuth2Register from "./pages/SignUp/OAuth2/OAuth2Register";
import SignUp from './pages/SignUp/SignUp';
import ModifyPassword from "./pages/NewPassword/ModifyPassword";
import RegionRegister from "./components/contents/ModifyForm/RegionRegister";
import CheckMyTrip from "./pages/CheckItinerary/CheckMyTrip";


const mainStyles = css`
  margin-top: 64px;
`;

function App() {
  return (
    <>
      <CssBaseline />
      <Nav />
      <Routes css={mainStyles}>
        <Route path={"/"} element={<AuthRouter path={'/'} element={<Home />} />} />
        <Route path={"/auth/login"} element={<AuthRouter path={'/auth/login'} element={<Login />} />} />
        <Route path={"/auth/oauth2/login"} element={<AuthRouter path={'/auth/oauth2/login'} element={<OAuth2Login />} />} />
        <Route path={"/auth/signup"} element={<AuthRouter path={'/auth/signup'} element={<SignUp />} />} />
        <Route path={"/auth/oauth2/signup"} element={<AuthRouter path={'/auth/oauth2/signup'} element={<OAuth2Register />} />} />
        <Route path={"/auth/password/verify"} element={<AuthRouter path={'/auth/password/verify'} element={<CheckEmail />} />} />
        <Route path={"/auth/password/reset"} element={<AuthRouter path={'/auth/password/reset'} element={<PasswordReset />} />} />
        <Route path={"/auth/oauth2/merge"} element={<AuthRouter path={'/auth/oauth2/merge'} element={<OAuth2Merge />} />} />
        <Route path={"/auth/post/register"} element={<AuthRouter path={'/auth/post/register'} element={<RegionRegister />} />} />
        <Route path={"/user/:id"} element={<AuthRouter path={'/user/:id'} element={<MyPage />} />} />
        <Route path={"/user/modify/:id"} element={<AuthRouter path={'/user/modify/:id'} element={<ModifyForm />} />} />
        <Route path={"/user/modify/password/:id"} element={<AuthRouter path={'/user/modify/password/:id'} element={<ModifyPassword />} />} />
        <Route path={"/contents"} element={<AuthRouter path={'/contents'} element={<Contents />} />} />
        <Route path={"/user/:id/trip/:id/"} element={<AuthRouter path={'/user/:id/trip/:id/'} element={<CheckMyTrip />} />} />
      </Routes>

    </>

  );
}

export default App;
