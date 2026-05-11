import React, { useState, useEffect } from "react";

export default function ProjectModal({ show, onClose, onSubmit, editData }) {

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: ""
  });

  useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
      });
    } else {
      setForm({
        title: "",
        description: "",
        startDate: "",
        endDate: ""
      });
    }
  }, [editData]);

  if (!show) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
  console.log("Submitting form:", form); // ✅ DEBUG

  // ✅ BASIC VALIDATION
  if (!form.title.trim()) {
    alert("Title is required");
    return;
  }

  if (!form.description.trim()) {
    alert("Description is required");
    return;
  }

  if (!form.startDate || !form.endDate) {
    alert("Select both dates");
    return;
  }

  if (form.endDate < form.startDate) {
    alert("End date must be after start date");
    return;
  }

  // ✅ CALL PARENT FUNCTION
  onSubmit(form);
};


  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              {editData ? "Update Project" : "Create Project"}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">

            <input
              type="text"
              name="title"
              className="form-control mb-2"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
            />

            <textarea
              name="description"
              className="form-control mb-2"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />

            <div className="row">
              <div className="col">
                <input
                  type="date"
                  name="startDate"
                  className="form-control"
                  value={form.startDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]} // ✅ disables past dates
                />
              </div>

              <div className="col">
                <input
                  type="date"
                  name="endDate"
                  className="form-control"
                  value={form.endDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]} // ✅ disables past dates
                />
              </div>
            </div>

          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>

            <button className="btn btn-success" onClick={handleSubmit}>
              {editData ? "Update" : "Create"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}