import React, { useContext, useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAdminUsers } from "../../services/api";
import Spinner from "../Spinner/Spinner";
import { UserContext } from "../../context/UserContext";

function Accounts() {
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      let data = await getAdminUsers();

      setAdminUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="container">
        <h2>All Accounts</h2>
        <table class="table mt-4">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">2fa Enabled</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Spinner />
            ) : adminUsers.length > 0 ? (
              adminUsers.map((admin, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{admin?.username}</td>
                  <td>{admin?.email}</td>
                  <td>{admin?.role}</td>
                  <td style={{ color: user.enable2fa ? "green" : "red" }}>
                    {admin.enable2fa ? "Enabled" : "Not Enabled"}
                  </td>
                  <td style={{ color: user.deactivated ? "red" : "green" }}>
                    {admin.deactivated ? "Deactivated" : "Active"}
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      <div style={{ left: "0px", position: "relative" }}>
                        <RemoveRedEyeIcon />
                      </div>
                      {user && user.role == "Super Admin" && (
                        <div style={{ left: "15px", position: "relative" }}>
                          <EditIcon />
                        </div>
                      )}
                      {user && user.role == "Super Admin" && (
                        <>
                          <div style={{ left: "35px", position: "relative" }}>
                            <DeleteIcon />
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h4>No users found</h4>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Accounts;
