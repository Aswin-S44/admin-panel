import React, { useContext, useState } from "react";
import "./Home.css";
import { AttachMoney, DirectionsCar, People } from "@mui/icons-material"; // Importing Material UI icons
import ChartsOverviewDemo from "../../Components/Charts/BarChart/BarChart";
import { UserContext } from "../../context/UserContext";

function Home() {
  const { user } = useContext(UserContext);
  const [stats, setStats] = useState([
    {
      title: "Total Sales",
      count: 0,
      icon: <AttachMoney fontSize="large" />, // Material UI icon
    },
    {
      title: "Total Cars",
      count: 0,
      icon: <DirectionsCar fontSize="large" />, // Material UI icon
    },
    {
      title: "Total Dealers",
      count: 0,
      icon: <People fontSize="large" />, // Material UI icon
    },
  ]);

  return (
    <div>
      <div className="container">
        <h1>Hi, {user?.username}</h1>
        <h1 style={{ fontSize: "25px", fontWeight: "bold" }}>Dashboard</h1>
        <div className="row">
          {stats.map((stat, index) => (
            <div className="col-md-3" key={index}>
              <div className="card">
                <div className="card-icon">{stat.icon}</div>
                <h4>{stat?.title}</h4>
                <h1>{stat?.count}</h1>
              </div>
            </div>
          ))}
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <h2>My Earnings</h2>
            <div className="mt-2">
              <ChartsOverviewDemo />
            </div>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
