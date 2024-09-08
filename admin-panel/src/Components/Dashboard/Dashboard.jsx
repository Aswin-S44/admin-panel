import React, { useState } from "react";
import { Dashboard, Settings, People } from "@mui/icons-material";
import "./Dashboard.css";
import AddUserForm from "../AddUserForm/AddUserForm";
import ViewUser from "../../Screens/Users/ViewUser/ViewUser";

function DashboardHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [isAddingUser, setIsAddingUser] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    if (isAddingUser) {
      return <AddUserForm onBack={() => setIsAddingUser(false)} />;
    }

    switch (selectedMenu) {
      case "Dashboard":
        return <h1>Dashboard Content</h1>;
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
        return <h1>Settings Page</h1>;
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
              setIsAddingUser(false); // Ensure to reset add form
            }}
            className={selectedMenu === "Dashboard" ? "active" : ""}
          >
            <Dashboard /> {!isSidebarOpen && <span>Dashboard</span>}
          </li>
          <li
            onClick={() => {
              setSelectedMenu("Users");
              setIsAddingUser(false); // Ensure to reset add form
            }}
            className={selectedMenu === "Users" ? "active" : ""}
          >
            <People /> {!isSidebarOpen && <span>Users</span>}
          </li>
          <li
            onClick={() => {
              setSelectedMenu("Settings");
              setIsAddingUser(false); // Ensure to reset add form
            }}
            className={selectedMenu === "Settings" ? "active" : ""}
          >
            <Settings /> {!isSidebarOpen && <span>Settings</span>}
          </li>
        </ul>
      </div>

      <div className="content">{renderContent()}</div>
    </div>
  );
}

export default DashboardHome;
