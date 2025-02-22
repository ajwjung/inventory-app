import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function ConfirmationModal({ currentDrinkType }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch for `/api/all-categories/:categoryId` to delete
      const response = await fetch("/api/all-categories/" + categoryId, {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: categoryId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData} || Error: Error fetching from database `);
      }
    } catch (error) {
      console.error("Error fetching from database: ", error);
      setError(error);
    } finally {
      setLoading(false);
      navigate("/all-drink-types");
    }
  };

  return (
    <>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <div 
      className="modal fade"
      id="delete-category-modal" 
      data-bs-backdrop="static" 
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="modal-label"
      >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" id="modal-label">Delete Category</h2>
            <button 
              type="button" 
              className="btn-close" 
              aria-label="Close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete the following category?</p>
            <p>{currentDrinkType.name}</p>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
  )
};

ConfirmationModal.propTypes = {
  currentDrinkType: PropTypes.object,
}

export default ConfirmationModal;