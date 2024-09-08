import React, { useState } from "react";
import PaginationTable from "../../../Components/Table/Table";
import DealerDetails from "../../DealerDetails/DealerDetails";
import EditDealer from "../../EditDealer/EditDealer";

function ViewUser({ setIsAddingUser }) {
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [action, setAction] = useState(null);

  const handleAction = (action, dealer) => {
    setAction(action);
    setSelectedDealer(dealer);
  };

  const renderDealerView = () => {
    if (action === "view" && selectedDealer) {
      return <DealerDetails dealer={selectedDealer} />;
    } else if (action === "edit" && selectedDealer) {
      return <EditDealer dealer={selectedDealer} />;
    } else {
      return <PaginationTable onAction={handleAction} />;
    }
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <h4>All Dealers</h4>
        <button
          className="btn btn-primary"
          onClick={() => setIsAddingUser(true)}
        >
          Add Dealer
        </button>
      </div>
      {renderDealerView()}
    </div>
  );
}

export default ViewUser;
