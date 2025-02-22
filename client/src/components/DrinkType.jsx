import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ConfirmationModal from "./DeleteModal";

function DrinkType() {
  const { categoryId } = useParams();
  const [currentDrinkType, setCurrentDrinkType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // fetch for corresponding drink type and get details
  useEffect(() => {
    fetch("/api/all-categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error: Error fetching from database");
      }

      return response.json();
    })
    .then((data) => {
      const match = data.find((drinkType => drinkType.id === parseInt(categoryId)));
      setCurrentDrinkType(match);

    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      setError(error);
      setLoading(false);
    })

  }, [categoryId]);

  return (
    <>
      <h1>{currentDrinkType.name}</h1>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <>
        <div className="container">
          <Link to={`/all-drink-types/${categoryId}/edit`} >
            <button type="button" className="btn btn-warning">
              Edit
            </button>
          </Link>
          <button 
            type="button" 
            className="btn btn-danger" 
            data-bs-toggle="modal" 
            data-bs-target="#delete-category-modal"
          >
            Delete
          </button>
          <ConfirmationModal currentDrinkType={currentDrinkType} />
        </div>
        <Link to="/all-drink-types">
          <button type="button" className="btn btn-primary">
            Back to All Categories
          </button>
        </Link>
        </>
      )}
    </>
  );
};

export default DrinkType;