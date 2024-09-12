import React from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import DashboardHome from "./Components/Dashboard/Dashboard";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/home" element={<DashboardHome />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
