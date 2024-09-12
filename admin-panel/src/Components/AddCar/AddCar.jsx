import React, { useState } from "react";
import "./AddCar.css";
import { uploadImageToCloudinary } from "../../utils/utils";
import axios from "axios";
import { BACKEND_URL } from "../../config/constant";
import Swal from "sweetalert2";

function AddCar({ onBack }) {
  const [loading, setLoading] = useState(false);

  const [car_name, setCarName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [kilometer, setKilometer] = useState("");
  const [varient, setVarient] = useState("");
  const [owner, setOwner] = useState("First");
  const [claim, setClaim] = useState(false);
  const [major_accident, setMajorAccident] = useState(false);
  const [shop_name, setShopName] = useState("");
  const [loan_available, setLoanAvailable] = useState(true);
  const [dealer, setDealer] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");
  const [additional_images, setAdditionalImages] = useState([]);
  const [sold, setSold] = useState(false);
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("Unavailable");
  const [under_warrenty, setUnderWarrenty] = useState(false);
  const [fuelType, setFuelType] = useState("Unavailable");
  const [location, setLocation] = useState("");
  const [transmission_type, setTransmissionType] = useState("Manual");
  const [registration, setRegistration] = useState("");
  const [insurance, setInsurance] = useState("");
  const [rto, setRto] = useState("Unavailable");
  const [engine, setEngine] = useState("Unavailable");
  const [selectedMainImage, setSelectedMainImage] = useState("");

  const uploadImage = async (base64EncodedImage) => {
    setSelectedMainImage(base64EncodedImage);
  };

  const handleImageChange = (e) => {
    let mainImage = URL.createObjectURL(e.target.files[0]);
    setImage(mainImage);
    const file = e.target.files[0];
    console.log("FILE_________", file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.log("Error");
    };
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    let additional_image_data = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        additional_image_data.push(reader.result); // Push base64 data
        setAdditionalImages((prevImages) => [...prevImages, reader.result]); // Store base64 images in state
      };
    });
  };

  const removeAdditionalImage = (index) => {
    setAdditionalImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create a car object with all the form data
    const carData = {
      car_name,
      brand,
      model,
      year,
      kilometer,
      varient,
      owner,
      claim,
      major_accident,
      shop_name,
      loan_available,
      dealer,
      about,
      image: selectedMainImage, // Main image
      additional_images, // Additional images as base64 encoded strings
      sold,
      price,
      color,
      under_warrenty,
      fuelType,
      location,
      transmission_type,
      registration,
      insurance,
      rto,
      engine,
    };

    try {
      let res = await axios.post(`${BACKEND_URL}/add-car`, carData);
      if (res && res.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "New car added!",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error while adding car: ", error);
      Swal.fire({
        title: "Error!",
        text: `Failed to add car ${error}`,
        icon: "error",
      });
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ top: "40px", position: "relative" }}>
      <div className="container">
        <button
          type="button"
          className="btn btn-primary"
          style={{ marginLeft: "10px" }}
          onClick={onBack}
        >
          Back
        </button>
        <div className="mt-3">
          <h4>Add New Car</h4>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <label>Car Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter car name"
                  value={car_name}
                  onChange={(e) => setCarName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Brand</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Model</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Year</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Kilometers Driven</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter kilometers driven"
                  value={kilometer}
                  onChange={(e) => setKilometer(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Variant</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter variant"
                  value={varient}
                  onChange={(e) => setVarient(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Owner Document</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter owner document"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Claim</label>
                <select
                  className="form-control"
                  value={claim}
                  onChange={(e) => setClaim(e.target.value === "true")}
                >
                  <option value={false}>No Claim</option>
                  <option value={true}>Claim</option>
                </select>
              </div>
              <div className="col-md-6">
                <label>Major Accident</label>
                <select
                  className="form-control"
                  value={major_accident}
                  onChange={(e) => setMajorAccident(e.target.value === "true")}
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="col-md-6">
                <label>Shop Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter shop name"
                  value={shop_name}
                  onChange={(e) => setShopName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Loan Available</label>
                <select
                  className="form-control"
                  value={loan_available}
                  onChange={(e) => setLoanAvailable(e.target.value === "true")}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <div className="col-md-6">
                <label>Dealer</label>
                <select
                  className="form-control"
                  value={dealer}
                  onChange={(e) => setDealer(e.target.value)}
                >
                  <option value="">Select Dealer</option>
                  <option value="Dealer 1">Dealer 1</option>
                  <option value="Dealer 2">Dealer 2</option>
                </select>
              </div>
              <div className="col-md-6">
                <label>About</label>
                <textarea
                  className="form-control"
                  placeholder="Enter about details"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
                {image && (
                  <div style={{ marginTop: "10px" }}>
                    <img
                      src={image}
                      alt="Car"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <label>Additional Images</label>
                <input
                  type="file"
                  className="form-control"
                  multiple
                  onChange={handleAdditionalImagesChange}
                />
                <div style={{ marginTop: "10px" }}>
                  {additional_images.map((img, index) => (
                    <div
                      key={index}
                      style={{ position: "relative", marginBottom: "10px" }}
                    >
                      <img
                        src={img}
                        alt={`Additional ${index}`}
                        style={{ width: "100px", height: "100px" }}
                      />
                      <button
                        type="button"
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "0",
                          background: "red",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          cursor: "pointer",
                          padding: "5px",
                        }}
                        onClick={() => removeAdditionalImage(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-6">
                <label>Sold</label>
                <select
                  className="form-control"
                  value={sold}
                  onChange={(e) => setSold(e.target.value === "true")}
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="col-md-6">
                <label>Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Color</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Under Warranty</label>
                <select
                  className="form-control"
                  value={under_warrenty}
                  onChange={(e) => setUnderWarrenty(e.target.value === "true")}
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="col-md-6">
                <label>Fuel Type</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter fuel type"
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Location</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Transmission Type</label>
                <select
                  className="form-control"
                  value={transmission_type}
                  onChange={(e) => setTransmissionType(e.target.value)}
                >
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>
              <div className="col-md-6">
                <label>Registration</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter registration"
                  value={registration}
                  onChange={(e) => setRegistration(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Insurance</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter insurance details"
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>RTO</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter RTO details"
                  value={rto}
                  onChange={(e) => setRto(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label>Engine</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter engine details"
                  value={engine}
                  onChange={(e) => setEngine(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                {/* <button type="submit" className="btn btn-success mt-3">
                  Submit
                </button> */}
                <button
                  type="submit"
                  className="btn btn-primary mt-3"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Car"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCar;
