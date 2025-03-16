import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function ConfirmationModal({ location, currentDrinkType, currentDrink }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();
  const { drinkId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for modal closing event and redirect user to target page
    const modalElement = document.getElementById("delete-modal");
    
    const handleModalHidden = () => {
      if (location === "Drink Type") {
        navigate("/all-drink-types");
      } else if (location === "Drink") {
        navigate("/all-drinks");
      }
    };

    if (modalElement) {
      modalElement.addEventListener("hidden.bs.modal", handleModalHidden);
    }

    // Cleanup event listener when the component unmounts
    return () => {
      if (modalElement) {
        modalElement.removeEventListener("hidden.bs.modal", handleModalHidden);
      }
    };
  }, [navigate, location]);


  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      if (location === "Drink Type") {
        // Fetch for `/api/all-categories/:categoryId` to delete category
        // or `/api/all-items/:drinkId` to delete item
        const response = await fetch(`/api/all-categories/${categoryId}`, {
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
      } else if (location === "Drink") {
        // Fetch for `/api/all-items/:drinkId` to delete item
        const response = await fetch(`/api/all-items/${drinkId}`, {
          method: "DELETE",
          headers: { 
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id: drinkId })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error: ${errorData} || Error: Error fetching from database `);
        }
      }
    } catch (error) {
      console.error("Error fetching from database: ", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && (
        <div 
          className="modal fade"
          id="delete-modal" 
          data-bs-backdrop="static" 
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="modal-label"
        >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="modal-label">
                Delete {location === "Drink Type" ? " Category" : " Drink" }
              </h2>
              <button 
                type="button" 
                className="btn-close" 
                aria-label="Close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete the following 
                {location === "Drink Type" ? " category" : " item"}?</p>
              <p>{location === "Drink Type" 
                ? currentDrinkType.name 
                : currentDrink.name }</p>
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
                data-bs-dismiss="modal"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
  )
};

ConfirmationModal.propTypes = {
  location: PropTypes.string,
  currentDrinkType: PropTypes.object,
  currentDrink: PropTypes.object,
}

export default ConfirmationModal;