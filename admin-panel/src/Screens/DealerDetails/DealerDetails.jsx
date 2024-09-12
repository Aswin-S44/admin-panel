import React from "react";
import "./DealerDetails.css"; // Include the updated CSS here

function DealerDetails({ dealer, onBack }) {
  return (
    <div className="dealer-details-container">
      <h1>Dealer Details</h1>
      <div className="dealer-details-info">
        <p>
          Name: <span>{dealer.name}</span>
        </p>
        <p>
          Shop: <span>{dealer.brand}</span>
        </p>
        <p>
          Location: <span>{dealer.location}</span>
        </p>
        <p>
          Phone: <span>{dealer.phone}</span>
        </p>
        <p>
          Email: <span>{dealer.email}</span>
        </p>
        <p>
          Status: <span>{dealer.blocked ? "Blocked" : "Active"}</span>
        </p>
      </div>

      {/* Back button */}
      <button className="btn btn-secondary" onClick={onBack}>
        Back to Dealers List
      </button>
    </div>
  );
}

export default DealerDetails;
