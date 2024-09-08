import React from "react";

function DealerDetails({ dealer }) {
  return (
    <div>
      <h1>Dealer Details</h1>
      <p>Name: {dealer.name}</p>
      <p>Shop Name: {dealer.brand}</p>
      <p>Location: {dealer.location}</p>
      <p>Email: {dealer.email}</p>
      <p>Phone: {dealer.phone}</p>
      <p>Status: {dealer.blocked ? "Blocked" : "Active"}</p>
    </div>
  );
}

export default DealerDetails;
