import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ConfirmationModal from "./DeleteModal";
import NavBar from "./NavBar";
import Footer from "./Footer";
import * as bootstrap from "bootstrap";

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

  useEffect(() => {
    // Enable Bootstrap popovers
    const deleteCategoryBtn = document.getElementById("delete-category-btn");
    
    if (deleteCategoryBtn) {
      const popover = new bootstrap.Popover(deleteCategoryBtn);;

      return () => {
        popover.dispose();  // Clean up when component is unmounted
      };
    }
  }, []);

  return (
    <div className="d-flex flex-column" style={{height: "100vh"}}>
      <NavBar />
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <>
          <div className="container flex-grow-1">
            <h1 className="m-5">{currentDrinkType.name}</h1>
            <div className="d-flex flex-column" style={{height: "70%"}}>
              <p className="mb-5">No details to show.</p>
              <div className="d-flex justify-content-center align-items-center">
                <Link to={`/all-drink-types/${categoryId}/edit`} >
                  <button type="button" className="btn btn-green-solid m-2">
                    Edit Category
                  </button>
                </Link>
                {(parseInt(categoryId) <= 4) && (
                  <span
                    className="d-inline-block disabled"
                    id="delete-category-btn"
                    tabIndex="0"
                    data-bs-toggle="popover"
                    data-bs-trigger="hover focus"
                    data-bs-placement="top"
                    data-bs-content="Cannot delete default category."
                  >
                    <button
                      className="btn btn-secondary"
                      type="button"
                      disabled
                    >
                      Delete Category
                    </button>
                  </span>
                )}
                {(parseInt(categoryId) > 4) && (
                  <>
                    <button
                      type="button"
                      className="btn btn-brown m-2"
                      data-bs-toggle="modal"
                      data-bs-target="#delete-modal"
                      disabled={categoryId <= 4}
                    >
                      Delete Category
                    </button>
                    <ConfirmationModal
                      location="Drink Type"
                      currentDrinkType={currentDrinkType}
                    />
                  </>
                )}
              </div>
              <div className="mt-auto">
                <Link to="/all-drink-types">
                  <button type="button" className="btn btn-green">
                    Back to All Categories
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default DrinkType;