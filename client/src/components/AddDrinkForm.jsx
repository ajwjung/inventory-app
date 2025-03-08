import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

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
          drinkTypeId = allDrinkTypes.find((drinkType) => {
            return drinkType.name === matchingDrink.drink_type
          });
        }
                
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

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh
    setLoading(true);
    setError(null);
    
    try {
      // As user types input, it gets saved in `newDrink` state
      // On fetch, backend will handle the submitted data and POST req
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

      // Check the response from backend and proceed accordingly
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

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <>
        <h1>{isEdit ? "Edit Drink" : "Add a New Drink"}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="drink-name" className="form-label">Drink Name:</label>
            <input 
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
          <div className="mb-3">
            <label htmlFor="drink-type" className="form-label">Drink Type:</label>
            <select 
              className="form-select" 
              type="text" 
              name="drinkType" 
              id="drink-type"
              value={newDrink.drinkType}
              onChange={(e) => {
                setNewDrink({
                  ...newDrink, 
                  drinkType: parseInt(e.target.value) // integer ID
                })}
              }
              required
            >
              {allDrinkTypes.map((drinkType) => {
                return (
                  <option key={drinkType.id} value={drinkType.id}>
                    {drinkType.name}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="milk-substitute" className="form-label">Milk Substitute:</label>
            {/*
              IN EDIT MODE, DISABLE SELECTION IF ID <= 40
              Original dummy data will be immutable due to how records are stored 
            */}
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
          <div className="mb-3">
            <label htmlFor="drinkPrice" className="form-label">Price: $</label>
            <input 
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
          <button type="submit" className="btn btn-primary">
            {isEdit ? "Save Drink" : "Add Drink"}
          </button>
        </form>
        <a href="/all-drinks">
          <button type="button" className="btn btn-secondary">
            Back to All Drinks
          </button>
        </a>
      </>
    </>
  );
};

AddDrinkForm.propTypes = {
  editMode: PropTypes.bool,
}

export default AddDrinkForm;