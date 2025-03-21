import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import NavBar from "./NavBar";
import Footer from "./Footer";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function AddDrinkForm({ editMode }) {
  // Fetch and send data with the request to server
  const [newDrink, setNewDrink] = useState({
    drinkName: "",
    drinkType: 1,
    milkSubstitute: 1,
    price: 0.01
  });
  const [allDrinkTypes, setAllDrinkTypes] = useState([]);
  const [allMilkSubstitutes, setAllMilkSubstitutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(editMode);
  const { drinkId } = useParams();

  useEffect(() => {
    fetch("/api/all-categories", { headers: { 'Cache-Control': 'no-cache' } })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching from database: ", response.status);
        }
        return response.json();
      })
      .then((data) => {
        setAllDrinkTypes(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      })
  }, []);

  useEffect(() => {
    fetch("/api/all-milk-substitutes", { headers: { 'Cache-Control': 'no-cache' } })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching from database: ", response.status);
        }
        return response.json();
      })
      .then((data) => {        
        setAllMilkSubstitutes(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      })
  }, []);

  useEffect(() => {
    // Wait for allDrinkTypes and allMilkSubstitutes to be populated
    // Before performing a fetch for all drinks
    if (allDrinkTypes.length === 0 || allMilkSubstitutes.length === 0) return;

    console.log("Fetching data from /api/all-items...");
    fetch("/api/all-items", { headers: { 'Cache-Control': 'no-cache' } })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching from database: ", response.status);
        }
        return response.json();
      })
      .then((data) => {
        const matchingDrink = data.find((drink) => drink.id === parseInt(drinkId));      
        let drinkTypeId;

        if (matchingDrink) {
          // Get the category ID so we can select the correct option in our field
          const matchingDrinkType = allDrinkTypes.find((drinkType) => {
            return drinkType.name === matchingDrink.drink_type
          });
          // Set drinkType to 0 if not exists so that it defaults to "Select a drink type"
          drinkTypeId = matchingDrinkType?.id || 0;
        };

        matchingDrink 
          ? setNewDrink(
            { 
              drinkName: matchingDrink.name, 
              drinkType: drinkTypeId,
              milkSubstitute: matchingDrink.milk_substitute,
              price: parseFloat(matchingDrink.price).toFixed(2),
            })
          : setNewDrink({
            drinkName: "",
            drinkType: 1,
            milkSubstitute: 1,
            price: 0.01
          });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, [drinkId, allDrinkTypes, allMilkSubstitutes]);

  useEffect(() => {
    const selectElement = document.getElementById('milk-substitute');
    
    if (parseInt(drinkId) <= 40 && isEdit) {
      // Manually initialize popover on the select input
      const popover = new bootstrap.Popover(selectElement);
      popover.enable();
  
      return () => {
        popover.dispose();  // Clean up when component is unmounted
      };
    }
  }, [drinkId, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh
    setLoading(true);
    setError(null);
    
    try {
      console.log("Fetching data from /api/all-items...");
      const response = await fetch("/api/all-items", {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: isEdit 
          ? JSON.stringify({ id: parseInt(drinkId), drink: newDrink }) 
          : JSON.stringify({ drink: newDrink })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error: ${errorData.message || "Error: Error fetching from database"}`
        );
      };

      // Reset the `newDrink` state
      setNewDrink({
        drinkName: "",
        drinkType: 1,
        milkSubstitute: 1,
        price: 0.01
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error.message || "An error occurred, please try again later");
    } finally {
      setLoading(false);
      setIsEdit(false);
    }
  };

  useEffect(() => {
    // Enable popover on button
    const selectElement = document.getElementById('milk-substitute');

    if (parseInt(drinkId) <= 40 && isEdit) {
      new bootstrap.Popover(selectElement);
    };

    return () => {
      if (selectElement) {
        const popoverInstance = bootstrap.Popover.getInstance(selectElement);
        if (popoverInstance) popoverInstance.dispose(); // Cleanup on unmount
      }
    };
  }, [drinkId, isEdit]);

  return (
    <div className="d-flex flex-column" style={{height: "100vh"}}>
      <NavBar />
      <div className="container flex-grow-1 py-3">
        <h1 className="m-4">{isEdit ? "Edit Drink" : "Add a New Drink"}</h1>
        {loading && <div>Loading...</div>}
        {error && <div className="error">{error}</div>}
        <div className="d-flex flex-column" style={{height: "70%"}}>
          <form onSubmit={handleSubmit} className="m-5">
            <div className="mb-3 row">
              <label 
                htmlFor="drink-name" 
                className="col-sm-4 col-form-label text-start"
              >
                Drink Name:
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  type="text"
                  name="drinkName"
                  id="drink-name"
                  value={newDrink.drinkName}
                  onChange={(e) => {
                    setNewDrink({
                      ...newDrink,
                      drinkName: e.target.value
                    });
                  }}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label 
                htmlFor="drink-type" 
                className="col-sm-4 col-form-label text-start"
              >
                Drink Type:
              </label>
              <div className="col-sm-8">
                <select
                  className="form-select"
                  type="text"
                  name="drinkType"
                  id="drink-type"
                  value={newDrink.drinkType ? newDrink.drinkType  : 0}
                  onChange={(e) => {
                    setNewDrink({
                      ...newDrink,
                      drinkType: parseInt(e.target.value) // integer ID
                    })}
                  }
                  required
                >
                  <option value={0}>Select an option</option>
                  {allDrinkTypes.map((drinkType) => {
                    return (
                      <option key={drinkType.id} value={drinkType.id}>
                        {drinkType.name}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className="mb-3 row">
              <label 
                htmlFor="milk-substitute" 
                className="col-sm-4 col-form-label text-start"
              >
                Milk Substitute:
              </label>
              <div className="col-sm-8">
                <select
                  className="form-select"
                  type="text"
                  name="milkSubstitute"
                  id="milk-substitute"
                  value={newDrink.milkSubstitute === null ? 4 : newDrink.milkSubstitute}
                  onChange={(e) => {
                    if (parseInt(e.target.value) === 4) {
                      setNewDrink({
                        ...newDrink,
                        milkSubstitute: null
                      });
                    } else {
                      setNewDrink({
                        ...newDrink,
                        milkSubstitute: parseInt(e.target.value)
                      });
                    }
                  }}
                    disabled={isEdit && parseInt(drinkId) <= 40}
                    required
                    data-bs-toggle={parseInt(drinkId) <= 40 && isEdit ? 'popover' : undefined}
                    title="Popover Title"
                    data-bs-content="Milk substitute cannot be changed for this drink."
                  >
                  {allMilkSubstitutes.map((milkSubstitute) => {
                    return (
                      <option key={milkSubstitute.id} value={milkSubstitute.id}>
                        {milkSubstitute.alternative}
                      </option>
                    )
                  })}
                  <option value={4}>No Substitute</option>
                </select>
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="drinkPrice" className="col-sm-4 col-form-label text-start">
                Price: $
              </label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  type="number"
                  name="price"
                  id="drinkPrice"
                  min="0.01"
                  step="0.01"
                  value={newDrink.price}
                  onChange={(e) => {
                    setNewDrink({...newDrink, price: parseFloat(e.target.value)});
                  }}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-green-solid">
              {isEdit ? "Save Drink" : "Add Drink"}
            </button>
          </form>
        </div>
        <div className="mt-auto">
          <Link to="/all-drinks">
            <button type="button" className="btn btn-green m-3">
              Back to All Drinks
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

AddDrinkForm.propTypes = {
  editMode: PropTypes.bool,
}

export default AddDrinkForm;