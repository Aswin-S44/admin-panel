import React, { useContext, useState } from "react";
import { Dashboard, Settings, People } from "@mui/icons-material";
import "./Dashboard.css";
import AddUserForm from "../AddUserForm/AddUserForm";
import ViewUser from "../../Screens/Users/ViewUser/ViewUser";
import Cars from "../Cars/Cars";
import AddCar from "../AddCar/AddCar";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Home from "../../Screens/Home/Home";
import SettingsScreen from "../../Screens/SettingsScreen/SettingsScreen";
import { UserContext } from "../../context/UserContext";

function DashboardHome() {
  const { user } = useContext(UserContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isAddingCar, setIsAddingCar] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    if (isAddingUser) {
      return <AddUserForm onBack={() => setIsAddingUser(false)} />;
    }

    if (isAddingCar) {
      return <AddCar onBack={() => setIsAddingCar(false)} />;
    }

    switch (selectedMenu) {
      case "Dashboard":
        return (
          <>
            <Home />
          </>
        );
      case "Cars":
        return (
          <view>
            <Cars setIsAddingCar={setIsAddingCar} />
          </view>
        );
      case "Users":
        return (
          <view
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              top: "100px",
              position: "relative",
            }}
          >
            <ViewUser setIsAddingUser={setIsAddingUser} />;
          </view>
        );
      case "Settings":
        return <SettingsScreen />;
      default:
        return <h1>Welcome</h1>;
    }
  };

  return (
    <div className="app-container">
      <div className={isSidebarOpen ? "sidebar open" : "sidebar"}>
        <div className="sidebar-header">
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? ">" : "<"}
          </button>
        </div>
        <ul className="menu-items">
          <li
            onClick={() => {
              setSelectedMenu("Dashboard");
              setIsAddingUser(false);
            }}
            className={selectedMenu === "Dashboard" ? "active" : ""}
          >
            <Dashboard /> {!isSidebarOpen && <span>Dashboard</span>}
          </li>
          <li
            onClick={() => {
              setSelectedMenu("Cars");
            }}
            className={selectedMenu === "Cars" ? "active" : ""}
          >
            <DirectionsCarIcon /> {!isSidebarOpen && <span>Cars</span>}
          </li>
          <li
            onClick={() => {
              setSelectedMenu("Users");
              setIsAddingUser(false);
            }}
            className={selectedMenu === "Users" ? "active" : ""}
          >
            <People /> {!isSidebarOpen && <span>Users</span>}
          </li>
          {user && user?.role == "Super Admin" && (
            <>
              <li
                onClick={() => {
                  setSelectedMenu("Settings");
                  setIsAddingUser(false);
                }}
                className={selectedMenu === "Settings" ? "active" : ""}
              >
                <Settings /> {!isSidebarOpen && <span>Settings</span>}
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="content">{renderContent()}</div>
    </div>
  );
}

export default DashboardHome;
