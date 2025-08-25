import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ProfilePage from "../pages/ProfilePage";
import FormPage from "../pages/FormPage";
import FormsList from "../pages/FormsList";
import ChangePassword from "../pages/ChangePassword";
import FormsSubmissionsPage from "../pages/FormSubmissionsPage";
import SubmissionDetailPage from "../pages/SubmissionDetailPage";
import EditSubmissionPage from "../pages/EditSubmissionPage";


function Router(){
    return(
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/head" element={<HomePage/>}/>
            <Route path="signup" element={<SignupPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/form" element={<FormPage/>}/>
            <Route path="/forms" element={<FormsList/>}/>
            <Route path="/change-password" element={<ChangePassword/>}/>
            <Route path="/submitted-forms" element={<FormsSubmissionsPage/>}/>
            <Route path="/submission-details/:submissionId" element={<SubmissionDetailPage/>}/>
            <Route path="/edit-submission/:submissionId" element={<EditSubmissionPage/>}/>
            

        </Routes>
    )
}
export default Router;