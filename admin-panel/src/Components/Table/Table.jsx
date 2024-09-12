import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Menu, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Spinner from "../Spinner/Spinner";
import { UserContext } from "../../context/UserContext";

function Table({ onAction }) {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchDealers = async () => {
      setLoading(true);
      try {
        let res = await axios.get(
          `http://localhost:5000/api/v1/admin/all-dealers`
        );
        if (res && res.data) {
          setDealers(res.data.data);
        }
      } catch (error) {
        console.log("Error:", error);
      }
      setLoading(false);
    };
    fetchDealers();
  }, []);

  const handleMenuClick = (event, dealer) => {
    setAnchorEl(event.currentTarget);
    setSelectedDealer(dealer);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action) => {
    handleMenuClose();
    if (selectedDealer) {
      onAction(action, selectedDealer);
    }
  };

  return (
    <div style={{ top: "60px", position: "relative" }}>
      <table className="table table-striped mt-0">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Shop name</th>
            <th scope="col">Location</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">Blocked</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : (
            dealers.map((dealer, index) => (
              <tr key={dealer._id}>
                <th scope="row">{index + 1}</th>
                <td style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {dealer.name}
                </td>
                <td>{dealer.brand}</td>
                <td>{dealer.location}</td>
                <td>{dealer.phone}</td>
                <td>{dealer.email}</td>
                <td
                  style={{
                    color: dealer.blocked ? "red" : "#05c705",
                    fontWeight: "500",
                  }}
                >
                  {dealer.blocked ? "Blocked" : "Active"}
                </td>

                <td>
                  <button
                    onClick={(event) => handleMenuClick(event, dealer)}
                    className=" dropdown-toggle"
                    style={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "#fff",
                    }}
                  >
                    <ExpandMoreIcon />
                  </button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleAction("view")}>
                      View
                    </MenuItem>
                    {user && user.role == "Super Admin" && (
                      <>
                        <MenuItem onClick={() => handleAction("edit")}>
                          Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleAction("delete")}>
                          Delete
                        </MenuItem>
                      </>
                    )}
                  </Menu>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
