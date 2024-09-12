import React, { useContext, useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  deleteAdminUser,
  getAdminUsers,
  updateAdminUser,
  addAdminUser, // You need to implement this function in your api service
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
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false); // Add state for Add User modal
  const { user } = useContext(UserContext);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [editData, setEditData] = useState({
    username: "",
    email: "",
    role: "",
    enable2fa: "",
    status: "",
  });
  const [newUserData, setNewUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    enable2fa: "No",
    securityCode: "",
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

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleClose = () => {
    setOpenView(false);
    setOpenEdit(false);
    setOpenAdd(false);
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

  const handleNewUserChange = (e) => {
    setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
  };

  const handleAutoGenerateCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 10);
    setNewUserData({ ...newUserData, securityCode: randomCode });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const addUserData = {
      username: newUserData.username,
      email: newUserData.email,
      password: newUserData.password,
      role: newUserData.role,
      enable2fa: newUserData.enable2fa === "Yes",
      securityCode: newUserData.securityCode,
    };

    const res = await addAdminUser(addUserData);
    if (res) {
      setAdminUsers((prevAdminUsers) => [...prevAdminUsers, res]);
      setOpenAdd(false);
    }
  };

  return (
    <div>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>All Accounts</h2>
          <IconButton onClick={handleOpenAdd}>
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">2FA Enabled</th>
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

      {/* View Modal */}
      <Modal open={openView} onClose={handleClose}>
        <Box sx={style}>
          <h2>View User</h2>
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
                <strong>2FA Enabled:</strong>{" "}
                {selectedAdmin.enable2fa ? "Yes" : "No"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedAdmin.deactivated ? "Deactivated" : "Active"}
              </p>
            </>
          )}
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal open={openEdit} onClose={handleClose}>
        <Box sx={style}>
          <h2>Edit User</h2>
          <form onSubmit={handleEditSubmit}>
            <TextField
              name="username"
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editData.username}
              onChange={handleEditChange}
            />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editData.email}
              onChange={handleEditChange}
            />
            <Select
              name="role"
              label="Role"
              fullWidth
              margin="normal"
              value={editData.role}
              onChange={handleEditChange}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Super Admin">Super Admin</MenuItem>
            </Select>
            <Select
              name="enable2fa"
              label="2FA Enabled"
              fullWidth
              margin="normal"
              value={editData.enable2fa}
              onChange={handleEditChange}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
            <Select
              name="status"
              label="Status"
              fullWidth
              margin="normal"
              value={editData.status}
              onChange={handleEditChange}
            >
              <MenuItem value="Activate">Activate</MenuItem>
              <MenuItem value="Deactivate">Deactivate</MenuItem>
            </Select>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </form>
        </Box>
      </Modal>

      {/* Add Modal */}
      <Modal open={openAdd} onClose={handleClose}>
        <Box sx={style}>
          <h2>Add User</h2>
          <form onSubmit={handleAddSubmit}>
            <TextField
              name="username"
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newUserData.username}
              onChange={handleNewUserChange}
            />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newUserData.email}
              onChange={handleNewUserChange}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newUserData.password}
              onChange={handleNewUserChange}
            />
            <Select
              name="role"
              label="Role"
              fullWidth
              margin="normal"
              value={newUserData.role}
              onChange={handleNewUserChange}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Super Admin">Super Admin</MenuItem>
            </Select>
            <Select
              name="enable2fa"
              label="2FA Enabled"
              fullWidth
              margin="normal"
              value={newUserData.enable2fa}
              onChange={handleNewUserChange}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
            <TextField
              name="securityCode"
              label="Security Code"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newUserData.securityCode}
              onChange={handleNewUserChange}
            />
            <Button onClick={handleAutoGenerateCode}>
              Auto-generate Security Code
            </Button>
            <Button type="submit" variant="contained">
              Add User
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Accounts;
