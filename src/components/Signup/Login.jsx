import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/UserSlice";


function Login() {
  const user=useSelector((state)=>state.user)
  const  dispatch  = useDispatch();
  const navigate = useNavigate(); 
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .max(20, "username is too long")
        .required("username is required"),
      password: yup.string().required("password required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/Login/", {
         
          username: values.username,
          password: values.password,
          
        });
        const { access: token, user } = response.data
        
        formik.resetForm();
        dispatch(
          updateUser({...user,
            id: response.data.user.id,
            username: response.data.user.username,
            token:token,
          })
        );
        navigate("/head");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    },
  });
  return (
    <div className="base">
      <form onSubmit={formik.handleSubmit}>
        <label>
          <p>Username</p>
          <input
          className="box"
            placeholder="Enter your username"
            type="text"
            value={formik.values.username}
            name="username"
            onChange={formik.handleChange}
          />
        </label>
        <label>
          <p>Password</p>
          <input
          className="box"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            type="text"
            name="password"
          />
        </label>
        <br></br>
        <button className="b1" type="submit">
          Sign in
        </button>
      </form>
      <br></br>
      <div className="span">
        <span>Don't have an account?</span>
        <span onClick={() => navigate("/signup")} className="t1">
          Sign up
        </span>
        {/* <span>Forgot password?</span> */}
        <span onClick={() => navigate("/change-password")} className="t1">
        Forgot password?
        </span>
      </div>
    </div>
  );
}
export default Login;
