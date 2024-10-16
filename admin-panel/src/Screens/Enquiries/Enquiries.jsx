import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config/constant";
import "./Enquiries.css";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import RefreshIcon from "@mui/icons-material/Refresh";
import EnquiryDetails from "../EnquiryDetails/EnquiryDetails";

const SERVER_URL = "http://localhost:5000";
const socket = io(SERVER_URL);

function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [totalEnquiry, setTotalEnquiry] = useState(0);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    allow_whatsapp_notification: true,
    detailsSent: false,
    carPurchased: false,
  });
  const [search, setSearch] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [action, setAction] = useState(null);

  const handleAction = (action, enquiry) => {
    console.log("action : ", action);
    setAction(action);
    setSelectedEnquiry(enquiry);
  };

  const handleBack = () => {
    setAction(null);
    setSelectedEnquiry(null);
  };

  const renderDealerView = () => {
    if (action === "view" && selectedEnquiry) {
      return <EnquiryDetails enq={selectedEnquiry} onBack={handleBack} />;
    }
  };

  useEffect(() => {
    fetchEnquiries();

    socket.on("new-enquiry", (newEnquiry) => {
      toast.success("New enquiry received!"); // Show toast instead of alert
      setEnquiries((prevEnquiries) => [newEnquiry, ...prevEnquiries]);
      setTotalEnquiry(enquiries?.length);
    });

    return () => {
      socket.off("new-enquiry"); // Clean up the socket connection on unmount
    };
  }, [filters, refetch]);

  const fetchEnquiries = async () => {
    try {
      // Fetch data with current filters
      const response = await axios.get(`${BACKEND_URL}/enquiries`, {
        params: filters,
      });
      setEnquiries(response.data.data);
      setTotalEnquiry(response.data.meta.total);
    } catch (error) {
      console.error("Error fetching enquiries", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDetailsSentChange = async (id, value) => {
    try {
      await axios.put(`${BACKEND_URL}/update-enquiry/${id}`, {
        detailsSent: value === "true",
      });
      fetchEnquiries();
    } catch (error) {
      console.error("Error updating details sent status", error);
    }
  };

  const filteredEnquiries = enquiries.filter((enquiry) =>
    enquiry.first_name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
  };

  const handleUpdateField = async (id, field, value) => {
    try {
      await axios.put(`${BACKEND_URL}/update-enquiry/${id}`, {
        [field]: value === "true", // Convert the value to boolean
      });
      fetchEnquiries(); // Refresh the enquiries list
    } catch (error) {
      console.error(`Error updating ${field} status`, error);
    }
  };

  return (
    <>
      {!action ? (
        <>
          <div className="container">
            <ToastContainer /> {/* Toast container to display toasts */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <h1>Enquiries</h1>
              <p style={{ top: "6px", left: "5px", position: "relative" }}>
                ({totalEnquiry})
              </p>
            </div>
            <div className="filters">
              <input
                type="text"
                placeholder="Search by first name"
                value={search}
                onChange={handleSearchChange}
              />
              <select
                name="allow_whatsapp_notification"
                onChange={handleFilterChange}
                value={filters.allow_whatsapp_notification}
              >
                <option value="true">All Notifications</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <select
                name="detailsSent"
                onChange={handleFilterChange}
                value={filters.detailsSent}
              >
                <option value="">All Details Sent</option>
                <option value="true">Details Sent</option>
                <option value="false">Details Not Sent</option>
              </select>
              <select
                name="carPurchased"
                onChange={handleFilterChange}
                value={filters.carPurchased}
              >
                <option value="">All Cars Purchased</option>
                <option value="true">Car Purchased</option>
                <option value="false">No Car Purchased</option>
              </select>

              {/* <div className="mt-2">
          <RefreshIcon onClick={() => setRefetch(!refetch)} />
        </div> */}
            </div>
            {enquiries.length == 0 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                No Enquiries Found
              </div>
            ) : (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone Number</th>
                      <th>Allow WhatsApp Notification</th>
                      <th>Details Sent</th>
                      <th>Car Purchased</th>
                      <th>View details</th>
                      <th>Update Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnquiries.map((enquiry) => (
                      <tr key={enquiry._id}>
                        <td>{enquiry.first_name}</td>
                        <td>{enquiry.phone_number}</td>
                        <td>
                          {enquiry.allow_whatsapp_notification ? "Yes" : "No"}
                        </td>
                        <td>{enquiry.detailsSent ? "Yes" : "No"}</td>
                        <td>{enquiry.carPurchased ? "Yes" : "No"}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            style={{ padding: "5px", fontSize: "12px" }}
                            onClick={() => handleAction("view", enquiry)}
                          >
                            View details
                          </button>
                        </td>
                        <td>
                          {enquiry?.carPurchased == false ? (
                            <>
                              <select
                                className="form-control"
                                value={enquiry.detailsSent ? "true" : "false"}
                                onChange={(e) =>
                                  handleDetailsSentChange(
                                    enquiry._id,
                                    e.target.value
                                  )
                                }
                              >
                                <option value="true">Details Sent</option>
                                <option value="false">Details Not Sent</option>
                              </select>
                              <select
                                className="form-control"
                                value={enquiry.carPurchased ? "true" : "false"}
                                onChange={(e) =>
                                  handleUpdateField(
                                    enquiry._id,
                                    "carPurchased",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="true">Car Purchased</option>
                                <option value="false">No Car Purchased</option>
                              </select>
                            </>
                          ) : (
                            <div
                              style={{
                                backgroundColor: "lightgreen",
                                padding: "4px",
                                whiteSpace: "nowrap",
                                borderRadius: "8px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <p style={{ fontSize: "13px", color: "#111" }}>
                                Car Purchased
                              </p>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="pagination">
                  <button
                    onClick={() => handlePageChange(filters.page - 1)}
                    disabled={filters.page === 1}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(filters.page + 1)}
                    disabled={
                      filters.page >= Math.ceil(enquiries.total / filters.limit)
                    }
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>{renderDealerView()}</>
      )}
    </>
  );
}

export default Enquiries;
