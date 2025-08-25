import "./Form.css";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"; // newer maintained fork of react-beautiful-dnd
import { v4 as uuidv4 } from "uuid"; // generate unique IDs

const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "textarea", label: "Textarea" },
  { value: "number", label: "Number" },
  { value: "email", label: "Email" },
  { value: "date", label: "Date" },
];

function Form() {
  const [fields, setFields] = useState([]);
  const token = useSelector((state) => state.user.token);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: async (values) => {
      try {
        const payload = { ...values, fields };
        await axios.post("http://127.0.0.1:8000/form/", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Form created successfully!");
        formik.resetForm();
        setFields([]);
      } catch (error) {
        console.log(error);
        toast.error("Error creating form");
      }
    },
  });

  const addField = () => {
    setFields([
      ...fields,
      { id: uuidv4(), label: "", field_type: "text", required: true, order: fields.length + 1 },
    ]);
  };

  const updateField = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const removeField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields.map((f, i) => ({ ...f, order: i + 1 })));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return; // dropped outside
    const newFields = Array.from(fields);
    const [removed] = newFields.splice(result.source.index, 1);
    newFields.splice(result.destination.index, 0, removed);
    setFields(newFields.map((f, i) => ({ ...f, order: i + 1 })));
  };

  return (
    <div className="base">
      <h2>Create New Form</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Form Name:
          <input type="text" value={formik.values.name} onChange={formik.handleChange} name="name" />
        </label>
        <label>
          Description:
          <textarea value={formik.values.description} onChange={formik.handleChange} name="description" />
        </label>

        <h3>Fields</h3>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="fields">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {fields.map((field, index) => (
                  <Draggable key={field.id} draggableId={field.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className={`field-box ${snapshot.isDragging ? "dragging" : ""}`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <input
                          placeholder="Label"
                          value={field.label}
                          onChange={(e) => updateField(index, "label", e.target.value)}
                        />
                        <select
                          value={field.field_type}
                          onChange={(e) => updateField(index, "field_type", e.target.value)}
                        >
                          {FIELD_TYPES.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                        <label>
                          Required:
                          <input
                            type="checkbox"
                            checked={field.required}
                            onChange={(e) => updateField(index, "required", e.target.checked)}
                          />
                        </label>
                        <button type="button" onClick={() => removeField(index)}>Remove</button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="button-row">
          <button type="button" onClick={addField}>Add Field</button>
          <button type="submit">Create Form</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
