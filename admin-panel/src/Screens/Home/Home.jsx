import React, { useState } from "react";
import "./Home.css";

function Home() {
  const [stats, setStats] = useState([
    {
      title: "Total Sales",
      count: 0,
    },
    {
      title: "Total Cars",
      count: 0,
    },
    {
      title: "Total Dealers",
      count: 0,
    },
  ]);
  return (
    <div>
      <div className="container">
        <h4>Dashboard</h4>
        <div className="row">
          {stats.map((stat, index) => (
            <>
              <div className="col-md-3">
                <div className="card">
                  <h4>{stat?.title}</h4>
                  <h1>{stat?.count}</h1>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
