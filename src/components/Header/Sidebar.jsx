import { useNavigate } from "react-router-dom";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";


function Sidebar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

    return (
      <div className="sidenav">
        {/* Profile Section */}
        <div className="profile">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png" 
            alt="Profile"
            className="profile-icon"
            onClick={() => navigate("/profile")}
          />
          <span className="profile-name">{user.username}</span>
        </div>
  
        <a onClick={() => navigate("/form")}>
          <i className="fa-solid fa-plus"></i> Create Form
        </a>
        <a onClick={() => navigate("/forms")}>
          <i className="fa-solid fa-list-check"></i> Forms
        </a>
        <a onClick={() => navigate("/change-password")}>
          <i className="fa-regular fa-hourglass-half"></i> Change Password
        </a>
        <a onClick={() => navigate("/submitted-forms")}>
          <i className="fa-solid fa-list"></i> Submitted-forms
        </a>
      </div>
    );
  }
  export default Sidebar;