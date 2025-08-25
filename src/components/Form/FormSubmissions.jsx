import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FormsList.css";

function FormsSubmissions() {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  // Fetch all forms
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/form/", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setForms(res.data))
      .catch(err => console.log(err));
  }, [token]);

  // Fetch submissions for selected form
  const selectForm = async (formId) => {
    setSelectedForm(formId);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/form-submission/${formId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissions(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="forms-list-container">
      <div className="forms-list">
        <h2>Forms</h2>
        {forms.map(form => (
          <div
            key={form.id}
            className="form-item"
            onClick={() => selectForm(form.id)}
          >
            {form.name}
          </div>
        ))}
      </div>

      {selectedForm && (
        <div className="form-fields">
          <h3>Submissions</h3>
          {submissions.length === 0 && <p>No submissions yet.</p>}
          {submissions.map(sub => (
            <div
              key={sub.id}
              className="field-box"
              onClick={() => navigate(`/submission-details/${sub.id}`)}
              style={{ cursor: "pointer" }}
            >
              Submitted by: {sub.submitted_by || "Anonymous"} -{" "}
              {new Date(sub.submitted_at).toLocaleString()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FormsSubmissions;
