import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./EditSubmission.css";

function EditSubmission() {
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

  const handleChange = (index, value) => {
    const newData = [...submission.data];
    newData[index].value = value;
    setSubmission({ ...submission, data: newData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        form: submission.form,
        data: submission.data.map(d => ({ field: d.field, value: d.value })),
      };
      await axios.patch(`http://127.0.0.1:8000/form-submission-data/${submissionId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Submission updated successfully!");
      navigate(`/submission-details/${submissionId}`);
    } catch (err) {
      console.log(err);
      alert("Error updating submission");
    }
  };

  if (!submission) return <div>Loading...</div>;

  return (
    <div className="edit-submission-page">
      <h2>Edit Submission #{submission.id}</h2>
      <form onSubmit={handleSubmit}>
        {submission.data.map((item, index) => (
          <div key={item.field} className="edit-field">
            <label>{item.field_name}</label>
            <input
              type="text"
              value={item.value}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="submit" className="update-btn">Update Submission</button>
      </form>
    </div>
  );
}

export default EditSubmission;
