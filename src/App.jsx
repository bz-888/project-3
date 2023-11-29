import { useState } from "react";

import { Route, Routes } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import AddPage from "./pages/AddPage/AddPage";
import FeedPage from "./pages/FeedPage.jsx/FeedPage";
import ListPage from "./pages/ListPage/ListPage";

import userService from "./utils/userService";
import { List } from "semantic-ui-react";

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
      <Route path="/" element={<FeedPage />} />
      <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      <Route path="/add" element={<AddPage />} />
      <Route path="/list" element={<ListPage />} />
    </Routes>
  );
}

export default App;
