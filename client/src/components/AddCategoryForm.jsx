import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import CategoryFormBtn from "./CategoryFormBtn";
import NavBar from "./NavBar";
import Footer from "./Footer";

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
        matchingDrinkType ? setCategoryName(matchingDrinkType.name) : setCategoryName("");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    )
  }, [categoryId]);

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
    <div className="d-flex flex-column" style={{height: "100vh"}}>
      <NavBar />
      <div className="container flex-grow-1 py-3">
        <h1 className="m-4">
          {isEdit ? "Edit Drink Type" : "Add a New Drink Type"}
        </h1>
        {error && <div className="error">{error}</div>}
        <div className="d-flex flex-column" style={{height: "70%"}}>
          <form onSubmit={handleSubmit} className="m-5">
            <div className="row mb-3">
              <label className="col-form-label col-sm-4" htmlFor="drink-type">
                Drink Type:
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
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
            </div>
            {error && <p>{error}</p>}
            <CategoryFormBtn categoryId={categoryId} loading={loading} />
          </form>
        </div>
        <div className="mt-auto">
          <Link to="/all-drink-types">
            <button type="button" className="btn btn-green">
              Back to All Categories
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
};

AddCategoryForm.propTypes = {
  editMode: PropTypes.bool,
}

AddCategoryForm.defaultProps = {
  editMode: false,
};

export default AddCategoryForm;