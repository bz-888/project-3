import { useState } from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import FeedPage from "./pages/FeedPage.jsx/FeedPage";
import ListPage from "./pages/ListPage/ListPage";
import AddPage from "./pages/AddPage.jsx/AddPage";

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

  if (!user) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<FeedPage loggedUser={user} handleLogout={logout} />} />
      <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
      <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
      <Route path="/add" element={<AddPage loggedUser={user} handleLogout={logout} />} />
      <Route path="/groceries/:username" element={<ListPage loggedUser={user} handleLogout={logout} />} />
    </Routes>
  );
}

export default App;
