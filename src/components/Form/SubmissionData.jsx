import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./SubmissionData.css";

function SubmissionData() {
  const { submissionId } = useParams();
  const [submission, setSubmission] = useState(null);
  const token = useSelector(state => state.user.token);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/form-submission-data/${submissionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setSubmission(res.data))
      .catch(err => console.log(err));
  }, [submissionId, token]);

  if (!submission) return <div>Loading...</div>;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this submission?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/form-submission-data/${submissionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Submission deleted successfully!");
      navigate("/submitted-forms"); // redirect to submissions list
    } catch (err) {
      console.log(err);
      alert("Error deleting submission");
    }
  };

  const handleEdit = () => {
    navigate(`/edit-submission/${submissionId}`);
  };

  return (
    <div className="submission-page">
      <div className="submission-header">
        <h2>Submission #{submission.id}</h2>
        <p>Submitted by: {submission.submitted_by || "N/A"}</p>
        <p>Date: {submission.submitted_at}</p>
        <div className="submission-actions">
          <button className="edit-btn" onClick={handleEdit}>Edit</button>
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      </div>

      <div className="submission-data">
        {submission.data.map((item) => (
          <div key={item.field.id} className="data-box">
            <span className="data-label">{item.field_name}</span>
            <span className="data-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubmissionData;
