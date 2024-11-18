import React, { useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    file: null,
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      name: formData.name,
      age: formData.age,
      file: formData.file ? formData.file.name : null,
    };

    try {
      const response = await axios.post("http://127.0.0.1:5000/form", dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSubmittedData(response.data); // Show the response from Flask
      setShowModal(true); // Show the success modal on submission
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data. Please try again.");
    }
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  const ageOptions = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "lightcoral" }}
    >
      {/* Title Section */}
      <div className="mb-4 text-center">
        <h1 className="mb-0">Healthcare Dashboard</h1>
        <p className="text-muted">Manage patient information efficiently</p>
      </div>

      {/* Form Section */}
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Age:</label>
            <select
              name="age"
              className="form-select"
              value={formData.age}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Age
              </option>
              {ageOptions.map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">File Upload:</label>
            <input
              type="file"
              name="file"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>

      {/* Modal for Success Message */}
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Success</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>Data submitted successfully!</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
