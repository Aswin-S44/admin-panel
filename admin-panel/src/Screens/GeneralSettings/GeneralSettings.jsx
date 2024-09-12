import React, { useEffect, useState } from "react";
import "./GeneralSettings.css";
import Switch from "@mui/material/Switch";
import { getSettings } from "../../services/api";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { BACKEND_URL } from "../../config/constant";
import Swal from "sweetalert2";

function GeneralSettings() {
  const [siteName, setSiteName] = useState("");
  const [settingsId, setSettingsId] = useState(null);
  const [socialMedia, setSocialMedia] = useState({
    instagram: "",
    facebook: "",
    twitter: "",
  });
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [bannerTitles, setBannerTitles] = useState([]);
  const [enableNotifications, setEnableNotifications] = useState(true);

  // State to track whether the form is in "edit" mode or not
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      let res = await getSettings();
      if (res) {
        setSettingsId(res._id);
        setSocialMedia({
          instagram: res.instagram_url,
          facebook: res.facebook_url,
          twitter: res.twitter,
        });
        setContactEmail(res.email);
        setContactPhone(res.phone);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    let data = {
      instagram_url: socialMedia?.instagram,
      facebook_url: socialMedia.facebook,
      twitter: socialMedia.twitter,
      email: contactEmail,
      phone: contactPhone,
    };
    let res = await axios.post(
      `${BACKEND_URL}/update-site-settings/${settingsId}`,
      data
    );
    if (res && res.status == 200) {
      Swal.fire({
        title: "Good job!",
        text: "Settings updated!",
        icon: "success",
      });
      setIsEditable(false);
    } else {
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  };

  // Toggle between editable and view-only modes
  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className="general-settings-container">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h2 className="settings-title">General Settings</h2>

        {!isEditable && (
          <IconButton onClick={handleEditToggle} aria-label="edit">
            <EditIcon />
          </IconButton>
        )}
      </div>

      <form className="settings-form" onSubmit={handleSave}>
        <div className="form-group">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="instagram">Instagram URL</label>
                <input
                  type="text"
                  id="instagram"
                  value={socialMedia.instagram}
                  onChange={(e) =>
                    setSocialMedia({
                      ...socialMedia,
                      instagram: e.target.value,
                    })
                  }
                  placeholder="Enter Instagram URL"
                  disabled={!isEditable} // Disable input when not editable
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="facebook">Facebook URL</label>
                <input
                  type="text"
                  id="facebook"
                  value={socialMedia.facebook}
                  onChange={(e) =>
                    setSocialMedia({ ...socialMedia, facebook: e.target.value })
                  }
                  placeholder="Enter Facebook URL"
                  disabled={!isEditable}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="twitter">Twitter URL</label>
                <input
                  type="text"
                  id="twitter"
                  value={socialMedia.twitter}
                  onChange={(e) =>
                    setSocialMedia({ ...socialMedia, twitter: e.target.value })
                  }
                  placeholder="Enter Twitter URL"
                  disabled={!isEditable}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="contactEmail">Contact Email</label>
                <input
                  type="email"
                  id="contactEmail"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Enter contact email"
                  disabled={!isEditable}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="contactPhone">Contact Phone</label>
                <input
                  type="text"
                  id="contactPhone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="Enter contact phone"
                  disabled={!isEditable}
                />
              </div>
            </div>
          </div>
        </div>

        {isEditable && (
          <div style={{ float: "right" }}>
            <button
              type="submit"
              className="w-25 btn btn-success"
              style={{ float: "right" }}
              disabled={!isEditable}
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default GeneralSettings;
