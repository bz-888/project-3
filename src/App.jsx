import { useState } from "react";

import { Route, Routes } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import FeedPage from "./pages/FeedPage.jsx/FeedPage";
import ListPage from "./pages/ListPage/ListPage";

import userService from "./utils/userService";

function App() {

  const [user, setUser] = useState(userService.getUser());

  function handleSignUpOrLogin() {
    // get user token
    setUser(userService.getUser());
  }

  function logout() {
    userService.logout();
    setUser(null);
  }

  return (
    <Routes>
      <Route path="/" element={<FeedPage loggedUser={user} />} />
      <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      <Route path="/groceries/:username" element={<ListPage loggedUser={user}/>} />
    </Routes>
  );
}

export default App;
