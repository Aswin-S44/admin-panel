import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { editCar } from "../../services/api";
import Swal from "sweetalert2";

function EditCar({ car, onBack }) {
  const [loading, setLoading] = useState(false);

  const [car_name, setCarName] = useState(car?.car_name || "");
  const [brand, setBrand] = useState(car?.brand || "");
  const [model, setModel] = useState(car?.model || "");
  const [year, setYear] = useState(car?.year || "");
  const [kilometer, setKilometer] = useState(car?.kilometer || "");
  const [varient, setVarient] = useState(car?.varient || "");
  const [owner, setOwner] = useState(car?.owner || "");
  const [claim, setClaim] = useState(car.claim || false);
  const [major_accident, setMajorAccident] = useState(
    car?.major_accident || false
  );
  const [shop_name, setShopName] = useState(car?.shop_name || "");
  const [loan_available, setLoanAvailable] = useState(
    car?.loan_available || false
  );
  const [dealer, setDealer] = useState(car?.dealer || "");
  const [about, setAbout] = useState(car?.about || "");
  const [image, setImage] = useState(car?.image || "");
  const [additional_images, setAdditionalImages] = useState(
    car?.additional_images || []
  );
  const [sold, setSold] = useState(car?.sold || false);
  const [price, setPrice] = useState(car?.price || "");
  const [color, setColor] = useState(car?.color || "");
  const [under_warrenty, setUnderWarrenty] = useState(
    car?.under_warrenty || false
  );
  const [fuelType, setFuelType] = useState(car?.fuelType || "");
  const [location, setLocation] = useState(car?.location || "");
  const [transmission_type, setTransmissionType] = useState(
    car?.transmission_type || ""
  );
  const [registration, setRegistration] = useState(car?.registration || "");
  const [insurance, setInsurance] = useState(car?.insurance || "");
  const [rto, setRto] = useState(car?.rto || "");
  const [engine, setEngine] = useState(car?.engine || "");

  const handleSave = async () => {
    setLoading(true);
    const updatedCar = {
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
      image,
      additional_images,
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

    let res = await editCar(car?._id, updatedCar);
    setLoading(false);
    Swal.fire({
      title: "Success!",
      text: "Edited successfully!",
      icon: "success",
    });
  };

  const handleDeleteImage = (index) => {
    setAdditionalImages(additional_images.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <button className="btn btn-primary mb-3" onClick={onBack}>
        Back
      </button>
      <div className="row">
        <div className="col-md-6">
          <p>Car Name</p>
          <input
            type="text"
            className="form-control"
            value={car_name}
            onChange={(e) => setCarName(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <p>Brand</p>
          <input
            type="text"
            className="form-control"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        {/* <div className="col-md-6">
          <p>Model</p>
          <input
            type="text"
            className="form-control"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div> */}
        <div className="col-md-6">
          <p>Model</p>
          <input
            type="text"
            className="form-control"
            value={model}
            onChange={(e) => setModel(e.target.value)}
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
          <p>Kilometer</p>
          <input
            type="text"
            className="form-control"
            value={kilometer}
            onChange={(e) => setKilometer(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <p>Varient</p>
          <input
            type="text"
            className="form-control"
            value={varient}
            onChange={(e) => setVarient(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <p>Owner</p>
          <input
            type="text"
            className="form-control"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <p>Price</p>
          <input
            type="text"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <p>Fuel Type</p>
          <input
            type="text"
            className="form-control"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <p>Color</p>
          <input
            type="text"
            className="form-control"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-3">
        <p>About</p>
        <textarea
          className="form-control"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </div>

      <div className="mt-3">
        <p>Images</p>
        <input
          type="file"
          onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
        />
        {image && (
          <div className="mt-2">
            <img src={image} alt="Main" width="100" />
            <button
              className="btn btn-danger ml-2"
              onClick={() => setImage("")}
            >
              Delete Image
            </button>
          </div>
        )}
      </div>

      <div className="mt-3">
        <p>Additional Images</p>
        <input
          type="file"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files).map((file) =>
              URL.createObjectURL(file)
            );
            setAdditionalImages([...additional_images, ...files]);
          }}
        />
        <div className="mt-2">
          {additional_images.map((img, index) => (
            <div key={index} className="d-inline-block m-2">
              <img src={img} alt={`additional-${index}`} width="100" />
              <DeleteOutlineIcon
                style={{ color: "#007bff" }}
                onClick={() => handleDeleteImage(index)}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className="btn btn-success mt-3"
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}

export default EditCar;
