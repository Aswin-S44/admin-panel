import React, { useState } from "react";

function EditDealer({ dealer, onBack }) {
  const [formState, setFormState] = useState({ ...dealer });
  console.log("DEALER******************", dealer);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
  };
 
  return (
    <div>
      <button className="btn btn-secondary" onClick={onBack}>
        Back
      </button>
      <h1>Edit Dealer</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <p>Name</p>
            <input
              type="text"
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
              placeholder="Dealer Name"
              className="form-control w-100"
            />
          </div>
          <div className="col-md-6">
            <p>Shop Name</p>
            <input
              type="text"
              value={formState.brand}
              onChange={(e) =>
                setFormState({ ...formState, brand: e.target.value })
              }
              placeholder="Shop Name"
              className="form-control w-100"
            />
          </div>

          <div className="col-md-6">
            <p>Phone</p>
            <input
              type="text"
              value={formState.phone}
              onChange={(e) =>
                setFormState({ ...formState, phone: e.target.value })
              }
              placeholder="Phone Number"
              className="form-control w-100"
            />
          </div>
          <div className="col-md-6">
            <p>Email</p>
            <input
              type="text"
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
              placeholder="Email"
              className="form-control w-100"
            />
          </div>
          <div className="col-md-6">
            <p>Location</p>
            <input
              type="text"
              value={formState.brand}
              onChange={(e) =>
                setFormState({ ...formState, brand: e.target.value })
              }
              placeholder="Location"
              className="form-control w-100"
            />
          </div>
          <div className="col-md-6">
            <p>Subscribed</p>
            {/* <input
              type="text"
              value={formState.brand}
              onChange={(e) =>
                setFormState({ ...formState, brand: e.target.value })
              }
              placeholder="Shop Name"
              className="form-control w-100"
            /> */}
            <select
              className="form-control"
              onChange={(e) =>
                setFormState({ ...formState, subscribed: e.target.value })
              }
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="col-md-6">
            <p>Block</p>
            {/* <input
              type="text"
              value={formState.brand}
              onChange={(e) =>
                setFormState({ ...formState, brand: e.target.value })
              }
              placeholder="Shop Name"
              className="form-control w-100"
            /> */}
            <select
              className="form-control"
              onChange={(e) =>
                setFormState({ ...formState, blocked: e.target.value })
              }
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </div>
        {/* Add more fields as necessary */}
        <button
          type="submit"
          className="btn btn-primary mt-4"
          style={{ float: "right" }}
        >
          Save Changes
        </button>
      </form>

      {/* Back button */}
    </div>
  );
}

export default EditDealer;
