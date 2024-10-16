import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../../config/constant";
import Spinner from "../Spinner/Spinner";
import { Menu, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UserContext } from "../../context/UserContext";
import { deleteCar } from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

function CarTable({ onAction }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCars, setTotalCars] = useState(0);
  const [limit, setLimit] = useState(8);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/get-cars`, {
          params: {
            search: searchQuery,
            page: currentPage,
            limit,
          },
        });
        if (res && res.status === 200) {
          setCars(res.data.data);
          setTotalCars(res.data.totalCars);
        }
      } catch (error) {
        console.error("Error fetching cars", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [searchQuery, currentPage, limit]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalCars / limit);

  const handleMenuClick = (event, car) => {
    setAnchorEl(event.currentTarget);
    setSelectedCar(car);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCar(null);
  };

  const handleAction = (action) => {
    handleMenuClose();
    if (selectedCar) {
      onAction(action, selectedCar);
    }
  };

  const handleDeleteCar = async (car) => {
    try {
      await deleteCar(car._id);
      toast.success("Car deleted successfully!");
      setCars(cars.filter((item) => item._id !== car._id));
    } catch (error) {
      toast.error("Failed to delete car.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search cars..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ width: "300px", padding: "10px", borderRadius: "5px" }}
        />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Brand</th>
                <th scope="col">Owner</th>
                <th scope="col">Year</th>
                <th scope="col">Price</th>
                <th scope="col">Location</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {cars.length === 0 && !loading ? (
                <tr>
                  <td colSpan="10">
                    <div style={{ textAlign: "center" }}>
                      <h4>No cars available</h4>
                    </div>
                  </td>
                </tr>
              ) : (
                cars.map((car, index) => (
                  <tr key={car._id}>
                    <th scope="row">{(currentPage - 1) * limit + index + 1}</th>
                    <td>
                      <img
                        src={car?.image}
                        alt={car?.car_name}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    </td>
                    <td>{car?.car_name}</td>
                    <td>{car?.brand}</td>
                    <td>{car?.owner}</td>
                    <td>{car.year ? car.year : car.model ? car.model : "_"}</td>
                    <td>{car?.price}</td>
                    <td>
                      {car.location
                        ? car.location
                        : car.place
                        ? car.place
                        : "_"}
                    </td>
                    <td>
                      {car.sold ? (
                        <div
                          style={{
                            color: "rgb(217 67 67)",
                            padding: "8px",
                            borderRadius: "8px",
                          }}
                        >
                          Sold
                        </div>
                      ) : (
                        <div
                          style={{
                            color: "rgb(4 163 4)",
                            padding: "8px",
                            borderRadius: "8px",
                          }}
                        >
                          Available
                        </div>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={(event) => handleMenuClick(event, car)}
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
                        {user && user.role === "Super Admin" && (
                          <>
                            <MenuItem onClick={() => handleAction("edit")}>
                              Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() => handleDeleteCar(selectedCar)}
                            >
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

          <div
            className="pagination"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: "8px 12px",
                margin: "0 5px",
                backgroundColor: currentPage === 1 ? "#ccc" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
                style={{
                  padding: "8px 12px",
                  margin: "0 5px",
                  backgroundColor:
                    currentPage === index + 1 ? "#007bff" : "#fff",
                  color: currentPage === index + 1 ? "white" : "#007bff",
                  border: "1px solid #007bff",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: "8px 12px",
                margin: "0 5px",
                backgroundColor:
                  currentPage === totalPages ? "#ccc" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CarTable;
