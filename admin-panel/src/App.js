import React from "react";
import DashboardHome from "./Components/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./auth/PrivateRoute";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <DashboardHome />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
