import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { AttachMoney, DirectionsCar, People } from "@mui/icons-material";
import ChartsOverviewDemo from "../../Components/Charts/BarChart/BarChart";
import { UserContext } from "../../context/UserContext";
import SellIcon from "@mui/icons-material/Sell";
import SalesChart from "../../Components/Charts/SaleChart/SaleChart";
import DataList from "../../Components/List/List";
import CurrentDateTime from "../../Components/CurrentDateTime/CurrentDateTime";
import { getStatus } from "../../services/api";
import Spinner from "../../Components/Spinner/Spinner";

function Home() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true);
      let res = await getStatus();
      setLoading(false);
      if (res) {
        setStats(res);
      }
    };
    fetchStatus();
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container-fluid p-5">
          <div className="space-between">
            <h2 className="welcome-title">Welcome, {user?.username}</h2>
            <div>
              <h5>
                <CurrentDateTime />
              </h5>
            </div>
          </div>
          <div className="mt-4">
            <div className="status-box">
              <div className="container-fluid">
                <div className="stat-container">
                  <div className="stat-card total-earnings">
                    <div>
                      <AttachMoney fontSize="large" className="stat-icon" />
                    </div>
                    <div>
                      <h2>{stats?.total_earnings}</h2>
                    </div>
                    <div>
                      <h5>Total Earnings</h5>
                    </div>
                  </div>

                  <div className="stat-card total-sales">
                    <div>
                      <SellIcon fontSize="large" className="stat-icon" />
                    </div>
                    <div>
                      <h2>{stats?.total_sales}</h2>
                    </div>
                    <div>
                      <h5>Total Sales</h5>
                    </div>
                  </div>

                  <div className="stat-card total-cars">
                    <div>
                      <DirectionsCar fontSize="large" className="stat-icon" />
                    </div>
                    <div>
                      <h2>{stats?.total_cars}</h2>
                    </div>
                    <div>
                      <h5>Total Cars</h5>
                    </div>
                  </div>

                  <div className="stat-card total-dealers">
                    <div>
                      <People fontSize="large" className="stat-icon" />
                    </div>
                    <div>
                      <h2>{stats?.total_dealers}</h2>
                    </div>
                    <div>
                      <h5>Total Dealers</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-6 w-100 status-box">
              <h4 className="graph-title">Sales Graph</h4>
              <SalesChart />
            </div>
            <div className="col-md-6 status-box">
              <DataList title={"New cars"} data={[]} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
