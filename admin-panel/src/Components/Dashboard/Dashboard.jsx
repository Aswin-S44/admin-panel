import React, { useContext, useEffect, useState } from "react";
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
import Notifications from "../../Screens/Notifications/Notifications";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Enquiries from "../../Screens/Enquiries/Enquiries";
import MessageIcon from "@mui/icons-material/Message";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import LogoutIcon from "@mui/icons-material/Logout";
import Swal from "sweetalert2";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

import io from "socket.io-client";
import SellerEnquiries from "../../Screens/SellerEnquiries/SellerEnquiries";

const SERVER_URL = "http://localhost:5000";
const socket = io(SERVER_URL);

function DashboardHome() {
  const { user } = useContext(UserContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [newNotificationCount, setNewNotificationCount] = useState(0);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    socket.on("new-enquiry", () => {
      setNewNotificationCount((prevCount) => prevCount + 1);
    });

    return () => {
      socket.off("new-enquiry");
    };
  }, []);
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
      case "Enquiries":
        return (
          <view>
            <Enquiries />
          </view>
        );
      case "seller_enquiry":
        return <SellerEnquiries />;
      case "Notifications":
        return <Notifications />;
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
          {!isSidebarOpen && (
            <h2 style={{ fontWeight: "bold" }}>Admin Panel</h2>
          )}
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? (
              <KeyboardDoubleArrowRightIcon />
            ) : (
              <KeyboardDoubleArrowLeftIcon />
            )}
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
            <People /> {!isSidebarOpen && <span>Dealers</span>}
          </li>
          <li
            onClick={() => {
              setSelectedMenu("Enquiries");
              setIsAddingUser(false);
            }}
            className={selectedMenu === "Enquiries" ? "active" : ""}
          >
            <MessageIcon /> {/* {newNotificationCount > 0 && ( */}
            {/* )} */}
            {!isSidebarOpen && (
              <span>
                {newNotificationCount > 0 && (
                  <span
                    className=""
                    style={{
                      width: "4px",
                      height: "4px",
                      backgroundColor: "red",
                      padding: "5px",
                      borderRadius: "50%",
                    }}
                  >
                    {newNotificationCount}
                  </span>
                )}{" "}
                Enquiries
              </span>
            )}
          </li>
          <li
            onClick={() => {
              setSelectedMenu("seller_enquiry");
            }}
            className={selectedMenu === "seller_enquiry" ? "active" : ""}
          >
            <ManageSearchIcon />{" "}
            {!isSidebarOpen && <span>Seller Enquiries</span>}
          </li>
          <li
            onClick={() => {
              setSelectedMenu("Notifications");
              setIsAddingUser(false);
            }}
            className={selectedMenu === "Notifications" ? "active" : ""}
          >
            <NotificationsIcon /> {!isSidebarOpen && <span>Notifications</span>}
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
          <li
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "Do you want to Logout?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes",
              }).then((result) => {
                if (result.isConfirmed) {
                  localStorage.removeItem("user_info");
                  window.location.href = "/";
                }
              });
            }}
          >
            <LogoutIcon /> {!isSidebarOpen && <span>Logout</span>}
          </li>
        </ul>
      </div>

      <div className="content">{renderContent()}</div>
    </div>
  );
}

export default DashboardHome;
