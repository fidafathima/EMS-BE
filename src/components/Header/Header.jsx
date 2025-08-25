import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/UserSlice";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const HandleLogout = () => {
    dispatch(clearUser());
  };
  return (
    <div className="header1">
      <ul>
        {user.username != "" && (
          <li>
            <i
              onClick={() => HandleLogout(navigate("/"))}
              className="fa-regular"
              title="Logout"
            >
              Logout
            </i>
          </li>
        ) }
      </ul>
    </div>
  );
}
export default Header;
