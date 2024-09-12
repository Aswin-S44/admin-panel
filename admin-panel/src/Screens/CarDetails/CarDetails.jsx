import React, { useEffect, useState } from "react";
import Spinner from "../../Components/Spinner/Spinner";

import FmdGoodIcon from "@mui/icons-material/FmdGood";
import "./CarDetails.css";

function CarDetails({ car, onBack }) {
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState(car?.image);
  useEffect(() => {
    if (!car) {
      setLoading(true);
    }
  }, [car]);
  return (
    <div>
      <>
        {" "}
        <div className="container-fluid">
          <button
            className="btn btn-primary"
            onClick={onBack}
            style={{ top: "-10px", position: "relative" }}
          >
            Back
          </button>
          <div className="car-detail-wrapper">
            <div className="car-detail-card">
              {loading ? (
                <Spinner />
              ) : (
                <div className="container">
                  <div className="car-detail-content">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="car-detail-images">
                          <img
                            src={mainImage}
                            className="car-detail-main-image"
                            alt="Main Car"
                            style={{ height: "300px" }}
                          />
                          <div className="car-detail-thumbnails">
                            {car?.additional_images?.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                className={`car-detail-thumbnail ${
                                  mainImage === image ? "active" : ""
                                }`}
                                onClick={() => setMainImage(image)}
                                alt={`Thumbnail ${index + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="container">
                          <div className="car-detail-info">
                            <h2 className="car-detail-title">
                              {car?.car_name}
                            </h2>
                            <h4 className="car-detail-subtitle">
                              {car?.brand} | {car?.model} | {car?.year}
                            </h4>
                            <p className="car-detail-meta">
                              {car?.kilometer} km | {car?.variant} |{" "}
                              {car?.owner} Owner
                            </p>

                            <h3 className="car-detail-price">
                              ₹{(car?.price / 100000).toFixed(1)} Lakh
                            </h3>
                            <h5 style={{ color: "green", fontSize: "17px" }}>
                              Negotiable
                            </h5>
                            <p className="car-detail-location">
                              <FmdGoodIcon /> Delhi
                            </p>
                            <p className="car-detail-description">
                              {car?.about}
                            </p>
                          </div>
                        </div>
                        <div className="container-fluid">
                          <div className="extra-details mt-5 p-3 w-100">
                            <h4 className="more-info-text">More Information</h4>
                            <div className="row mt-3">
                              <div className="col-md-6">
                                <div className="specs">
                                  <i className="fa fa-flag-checkered claim-icon"></i>
                                  Insuarance Claim:{" "}
                                  <span>{car.claim ? "Yes" : "No"}</span>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="specs">
                                  <i className="fa fa-money-bill-wave loan-icon"></i>
                                  Loan Available:{" "}
                                  <span>
                                    {car.loan_available ? "Yes" : "No"}
                                  </span>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="specs">
                                  <i className="fa fa-exclamation-triangle accident-icon"></i>
                                  {"  "}Major Accident:{" "}
                                  <span>
                                    {car.major_accident ? "Yes" : "No"}
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="specs">
                                  <i className="fa fa-paint-brush color-icon"></i>
                                  Color:{" "}
                                  {/* <span>{car.color ? car.color : "Unavailable"}</span> */}
                                  <span>Red</span>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="specs">
                                  <i className="fa fa-gas-pump fuel-icon"></i>
                                  Fuel Type:{" "}
                                  <span>
                                    {car.fuelType
                                      ? car.fuelType
                                      : "Unavailable"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default CarDetails;
