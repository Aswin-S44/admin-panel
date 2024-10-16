import React, { useContext, useState } from "react"; 
import CarDetails from "../../Screens/CarDetails/CarDetails";
import EditCar from "../../Screens/EditCar/EditCar";
import CarTable from "../CarTable/CarTable";
import { UserContext } from "../../context/UserContext";

function Cars({ setIsAddingCar }) {
  const [selectedCar, setSelectedCar] = useState(null);
  const [action, setAction] = useState(null);
  const { user } = useContext(UserContext);
  const handleAction = (action, car) => {
    setAction(action);
    setSelectedCar(car);
  };

  const handleBack = () => {
    setAction(null);
    setSelectedCar(null);
  };

  const renderDealerView = () => {
    if (action === "view" && selectedCar) {
      return <CarDetails car={selectedCar} onBack={handleBack} />;
    } else if (action === "edit" && selectedCar) {
      return <EditCar car={selectedCar} onBack={handleBack} />;
    } else {
      return <CarTable onAction={handleAction} />;
    }
  };
  return (
    <div className="container" style={{ marginTop: "100px" }}>
      {action == null && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <h4>All Cars</h4>
          {user && user.role == "Super Admin" && (
            <button
              className="btn btn-primary"
              onClick={() => setIsAddingCar(true)}
            >
              Add Car
            </button>
          )}
        </div>
      )}
      <div>{renderDealerView()}</div>
    </div>
  );
}

export default Cars;
