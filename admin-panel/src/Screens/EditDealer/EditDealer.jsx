import React, { useState } from "react";

function EditDealer({ dealer }) {
  const [name, setName] = useState(dealer.name);
  const [email, setEmail] = useState(dealer.email);

  const handleSave = () => {
    // Handle save logic here
    console.log("User updated");
  };

  return (
    <div>
      <h1>Edit Dealer</h1>
      <form>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
}

export default EditDealer;
