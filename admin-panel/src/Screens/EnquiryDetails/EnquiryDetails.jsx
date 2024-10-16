import React, { useEffect, useState } from "react";
import "./EnquiryDetails.css";
import { getEnquiryDetails } from "../../services/api";
import Spinner from "../../Components/Spinner/Spinner";

function EnquiryDetails({ enq, onBack }) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchEnquiry = async () => {
      if (enq && enq._id) {
        setLoading(true);
        let res = await getEnquiryDetails(enq?._id);
        if (res) {
          setDetails(res);
          setLoading(false);
        }
      }
    };
    fetchEnquiry();
  }, [enq]);

  return (
    <div className="container enquiry-details">
      <div className="header mb-4">
        <button className="btn btn-back" onClick={onBack}>
          ← Back
        </button>
        <h2 className="page-title">Enquiry Details</h2>
      </div>

      <>
        {loading ? (
          <>
            <Spinner />
          </>
        ) : details ? (
          <>
            <div className="card enquiry-card mb-4">
              <h4 className="card-title">Customer Information</h4>
              <div className="card-body">
                <div className="info-row">
                  <p>
                    <strong>Name:</strong> {details.enquiry_details.first_name}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {details.enquiry_details.country_code}{" "}
                    {details.enquiry_details.phone_number}
                  </p>
                </div>
                <div className="info-row">
                  <p>
                    <strong>WhatsApp Notifications:</strong>{" "}
                    {details.enquiry_details.allow_whatsapp_notification
                      ? "Yes"
                      : "No"}
                  </p>
                  <p>
                    <strong>Details Sent:</strong>{" "}
                    {details.enquiry_details.detailsSent ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>

            {/* Car Information */}
            <div className="card car-card mb-4">
              <h4 className="card-title">Car Information</h4>
              <div className="card-body">
                <div className="car-overview">
                  <img
                    src={details.car_details.image}
                    alt={details.car_details.car_name}
                    className="car-image mb-3"
                  />
                  <div className="car-specs">
                    <div
                      style={{
                        backgroundColor: "lightgreen",
                        padding: "4px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "green",
                        marginBottom:'10px'
                      }}
                    >
                      <p style={{ top: "5px", position: "relative" }}>
                        {details?.car_details?.sold ? (
                          <strong>Sold</strong>
                        ) : (
                          <strong>Available</strong>
                        )}
                      </p>
                    </div>
                    <p>
                      <strong>Car Name:</strong> {details.car_details.car_name}
                    </p>
                    <p>
                      <strong>Brand:</strong> {details.car_details.brand}
                    </p>
                    <p>
                      <strong>Model:</strong> {details.car_details.model}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹
                      {details.car_details.price.toLocaleString()}
                    </p>
                    <p>
                      <strong>Location:</strong> {details.car_details.location}
                    </p>
                  </div>
                </div>

                <div className="additional-info">
                  <p>
                    <strong>Kilometers Driven:</strong>{" "}
                    {details.car_details.kilometer} km
                  </p>
                  <p>
                    <strong>Owner:</strong> {details.car_details.owner}
                  </p>
                  <p>
                    <strong>Transmission:</strong>{" "}
                    {details.car_details.transmission_type}
                  </p>
                  <p>
                    <strong>Fuel Type:</strong> {details.car_details.fuelType}
                  </p>
                  <p>
                    <strong>Engine:</strong> {details.car_details.engine}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Car Images */}
            <div className="additional-images2">
              <h4>Additional Images</h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                }}
              >
                {details.car_details.additional_images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Additional Image ${index + 1}`}
                      className="img-fluid additional-image"
                      style={{ marginLeft: "40px" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>no details found</>
        )}
      </>
    </div>
  );
}

export default EnquiryDetails;
