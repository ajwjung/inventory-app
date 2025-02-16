import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import CategoryFormBtn from "./CategoryFormBtn";

function AddCategoryForm({ editMode }) {
  const [categoryName, setCategoryName] = useState("");
  const [isEdit, setIsEdit] = useState(editMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { categoryId } = useParams();

  // If edit mode, then update `categoryName` with existing drink type name
  useEffect(() => {
    console.log("Fetching data from /api/all-categories...");
    fetch("/api/all-categories", { headers: { 'Cache-Control': 'no-cache' } })
      .then((response) => {
        if (!response.ok) {
          // handle error
          throw new Error("Error: Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        // successful fetch, get the current category from db
        const matchingDrinkType = data.find((drinkType) => drinkType.id === parseInt(categoryId));        
        matchingDrinkType ? setCategoryName(matchingDrinkType.name) : setCategoryName(categoryName);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    )
  }, [categoryId, categoryName]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    setLoading(true);
    setError(null);

    try {
      // Fetch and send data with the request to server
      const response = await fetch("/api/all-categories", {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: isEdit ? JSON.stringify({ id: categoryId, name: categoryName}) : JSON.stringify({ name: categoryName })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || "Error: Error fetching from database"}`);
      };

      setCategoryName("");  // reset value for next time
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error.message || "An error occurred, please try again later");
    } finally {
      setLoading(false);
      setIsEdit(false);
    }
  }

  return (
    <>
      <h1>{isEdit ? "Edit Drink Type" : "Add a New Drink Type"}</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="drink-type">Drink Type: </label>
          <input 
            type="text" 
            name="drinkType" 
            id="drink-type" 
            value={categoryName} 
            onChange={(e) => {
              setCategoryName(e.target.value)
            }}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <CategoryFormBtn categoryId={categoryId} loading={loading} />
      </form>
      <a href="/all-drink-types">
        <button type="button" className="btn btn-secondary">
          Back to All Categories
        </button>
      </a>
    </>
  )
};

AddCategoryForm.propTypes = {
  editMode: PropTypes.bool,
}

AddCategoryForm.defaultProps = {
  editMode: false,
};

export default AddCategoryForm;