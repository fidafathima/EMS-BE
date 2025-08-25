import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const user = useSelector((state) => state.user);
  const token = user.token;
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (token) {
      axios
        .get("http://127.0.0.1:8000/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setProfileData(res.data))
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [token]);

  if (!profileData) return <div>Loading profile...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <i className="fa-solid fa-user profile-icon"></i>
          <h2>{profileData.username}</h2>
          <p>{profileData.email}</p>
        </div>

        <div className="profile-details">
          <div className="detail">
            <span className="label">Contact NO:</span>
            <span className="value">{profileData.contact_co}</span>
          </div>
        </div>

        <button className="edit-btn">Edit Profile</button>
      </div>
    </div>
  );
}

export default Profile;
