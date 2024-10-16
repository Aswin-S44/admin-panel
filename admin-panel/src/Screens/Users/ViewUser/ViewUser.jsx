import React, { useContext, useState } from "react";
import PaginationTable from "../../../Components/Table/Table";
import DealerDetails from "../../DealerDetails/DealerDetails";
import EditDealer from "../../EditDealer/EditDealer";
import { UserContext } from "../../../context/UserContext";

function ViewUser({ setIsAddingUser }) {
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [action, setAction] = useState(null);
  const { user } = useContext(UserContext);

  const handleAction = (action, dealer) => {
    setAction(action);
    setSelectedDealer(dealer);
  }; 

  const handleBack = () => {
    setAction(null);
    setSelectedDealer(null);
  };

  const renderDealerView = () => {
    if (action === "view" && selectedDealer) {
      return <DealerDetails dealer={selectedDealer} onBack={handleBack} />;
    } else if (action === "edit" && selectedDealer) {
      return <EditDealer dealer={selectedDealer} onBack={handleBack} />;
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
        {user && user.role == "Super Admin" && (
          <>
            <button
              className="btn btn-primary"
              onClick={() => setIsAddingUser(true)}
            >
              Add Dealer
            </button>
          </>
        )}
      </div>
      {renderDealerView()}
    </div>
  );
}

export default ViewUser;
