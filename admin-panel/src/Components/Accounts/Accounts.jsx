import React, { useContext, useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteAdminUser,
  getAdminUsers,
  updateAdminUser,
} from "../../services/api";
import Spinner from "../Spinner/Spinner";
import { UserContext } from "../../context/UserContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Accounts() {
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [editData, setEditData] = useState({
    username: "",
    email: "",
    role: "",
    enable2fa: "",
    status: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const data = await getAdminUsers();
      setAdminUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleOpenView = (admin) => {
    setSelectedAdmin(admin);
    setOpenView(true);
  };

  const handleOpenEdit = (admin) => {
    setEditData({
      id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      enable2fa: admin.enable2fa ? "Yes" : "No",
      status: admin.deactivated ? "Deactivate" : "Activate",
    });
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpenView(false);
    setOpenEdit(false);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      username: editData?.username,
      email: editData?.email,
      role: editData?.role,
      deactivated: editData.status === "Activate" ? false : true,
      enable2fa: editData.enable2fa === "Yes" ? true : false,
    };

    const res = await updateAdminUser(editData.id, updateData);
    if (res) {
      setAdminUsers((prevAdminUsers) =>
        prevAdminUsers.map((admin) =>
          admin._id === editData.id ? { ...admin, ...updateData } : admin
        )
      );
      setOpenEdit(false);
    }
  };

  const handleDelete = async (data) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Do you want to delete this user",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await deleteAdminUser(data?._id);
          if (res) {
            setAdminUsers((prevAdminUsers) =>
              prevAdminUsers.filter((admin) => admin._id !== data._id)
            );
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "user is safe :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <div>
      <div className="container">
        <h2>All Accounts</h2>
        <table className="table mt-4">
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
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{admin?.username}</td>
                  <td>{admin?.email}</td>
                  <td>{admin?.role}</td>
                  <td style={{ color: admin.enable2fa ? "green" : "red" }}>
                    {admin.enable2fa ? "Enabled" : "Not Enabled"}
                  </td>
                  <td style={{ color: admin.deactivated ? "red" : "green" }}>
                    {admin.deactivated ? "Deactivated" : "Active"}
                  </td>
                  <td>
                    <div
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <IconButton onClick={() => handleOpenView(admin)}>
                        <RemoveRedEyeIcon />
                      </IconButton>
                      {user && user.role === "Super Admin" && (
                        <>
                          <IconButton onClick={() => handleOpenEdit(admin)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(admin)}>
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h4>No users found</h4>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={openView} onClose={handleClose}>
        <Box sx={style}>
          <h3>Admin Details</h3>
          {selectedAdmin && (
            <>
              <p>
                <strong>Username:</strong> {selectedAdmin.username}
              </p>
              <p>
                <strong>Email:</strong> {selectedAdmin.email}
              </p>
              <p>
                <strong>Role:</strong> {selectedAdmin.role}
              </p>
              <p>
                <strong>2FA:</strong>{" "}
                {selectedAdmin.enable2fa ? "Enabled" : "Not Enabled"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedAdmin.deactivated ? "Deactivated" : "Active"}
              </p>
            </>
          )}
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </Box>
      </Modal>

      <Modal open={openEdit} onClose={handleClose}>
        <Box sx={style}>
          <h3>Edit Admin</h3>
          <form onSubmit={handleEditSubmit}>
            <TextField
              label="Username"
              name="username"
              value={editData.username}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={editData.email}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
            />
            <Select
              label="Role"
              name="role"
              value={editData.role}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Super Admin">Super Admin</MenuItem>
              <MenuItem value="Operator">Operator</MenuItem>
              <MenuItem value="SEO">SEO</MenuItem>
            </Select>
            <p>2FA Enabled</p>
            <Select
              label="2FA Enabled"
              name="enable2fa"
              value={editData.enable2fa}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
            <p>Activated</p>
            <Select
              label="Status"
              name="status"
              value={editData.status}
              onChange={handleEditChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="Activate">Activate</MenuItem>
              <MenuItem value="Deactivate">Deactivate</MenuItem>
            </Select>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Accounts;
