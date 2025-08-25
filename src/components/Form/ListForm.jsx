import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./FormsList.css";
import { toast } from "react-toastify";


function ListForm() {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [formData, setFormData] = useState({});
  const token = useSelector((state) => state.user.token);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/form/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForms(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchForms();
  }, [token]);

  const selectForm = async (formId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/form/${formId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedForm(response.data);

      let initialData = {};
      response.data.fields.forEach((field) => {
        initialData[field.id] = "";
      });
      setFormData(initialData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      form: selectedForm.id,
      data: Object.entries(formData).map(([fieldId, value]) => ({
        field: fieldId,
        value: value,
      })),
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/form-submission/",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Form submitted successfully!");
      console.log("Response:", response.data);
    } catch (error) {
        console.log("Response:", error.response?.data?.non_field_errors[0]);
        setMessage(
                error.response?.data?.non_field_errors[0]
                || "Something went wrong. Try again."
              );
        toast.error(message);
      console.error("Error submitting form:", error.response?.data || error);
    }
  };

  return (
    <div className="forms-list-container">
      <div className="forms-list">
        <h2>Forms</h2>
        {forms.length === 0 ? (
          <p className="no-forms">No forms created</p>
        ) : (
          forms.map((form) => (
            <div
              key={form.id}
              className="form-item"
              onClick={() => selectForm(form.id)}
            >
              {form.name}
            </div>
          ))
        )}
      </div>
  
      {selectedForm && (
        <div className="form-fields">
          <h3>{selectedForm.name}</h3>
          {selectedForm.fields.map((field) => (
            <div key={field.id} className="field-box">
              <label>
                {field.label} {field.required && "*"}
              </label>
              <input
                type={field.field_type === "number" ? "number" : "text"}
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            </div>
          ))}
  
          <button onClick={handleSubmit} className="submit-btn">
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
export default ListForm