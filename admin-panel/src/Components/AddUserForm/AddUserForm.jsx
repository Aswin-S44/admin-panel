import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config/constant";
import Swal from "sweetalert2";

function AddUserForm({ onBack }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [brand, setBrand] = useState("");
  const [about, setAbout] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      name,
      phone,
      email,
      location,
      brand,
      about,
    };
    console.log("User added : ", data);
    let res = await axios.post(
      `http://localhost:5000/api/v1/admin/add-dealer`,
      data
    );
    if (res && res.status == 200) {
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
    }
    onBack(); // Go back to the list after adding the user
  };

  return (
    <div className="container mt-5">
      <button
        type="button"
        className="btn btn-secondary"
        style={{ marginLeft: "10px" }}
        onClick={onBack}
      >
        Back
      </button>
      <div className="mt-4">
        <h4>Add New Dealer</h4>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <p>Dealer Name</p>
              <input
                type="text"
                className="form-control"
                placeholder="Enter dealer name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <p>Phone</p>
              <input
                type="text"
                className="form-control"
                placeholder="Enter dealer phone number"
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <p>Email</p>
              <input
                type="email"
                className="form-control"
                placeholder="Enter dealer name"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <p>Location</p>
              <input
                type="text"
                className="form-control"
                placeholder="Enter dealer location"
                required
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <p>Dealer brand</p>
              <input
                type="text"
                className="form-control"
                placeholder="Enter dealer brand"
                required
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <p>About</p>
              <input
                type="text"
                className="form-control"
                placeholder="About"
                required
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <button className="btn btn-success" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserForm;
