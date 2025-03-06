import { useState } from "react";

function AddDrinkForm() {
  // Fetch and send data with the request to server
  const [newDrink, setNewDrink] = useState({
    drinkName: "",
    drinkType: 1,
    milkSubstitute: 1,
    price: 0.01
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault; // prevent page refresh
    setLoading(true);
    setError(null);
    
    try {
      // As user types input, it gets saved in `newDrink` state
      // On fetch, backend will handle the submitted data and POST req
      console.log("Fetching data from /api/all-items...");
      const response = await fetch("http://localhost:5000/api/all-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ drink: newDrink })
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
        drinkType: "",
        milkSubstitute: "",
        price: 0.01
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error.message || "An error occurred, please try again later");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <>
        <h1>Add a New Drink</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="drink-name" className="form-label">Drink Name:</label>
            <input 
              type="text" 
              name="drinkName" 
              id="drink-name" 
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
              onChange={(e) => setNewDrink({
                ...newDrink, 
                drinkType: parseInt(e.target.value)
              })}
              required
            >
              {/* fetch for all categories and map to return options instead
              also need to try to default show the option saved in `newDrink` obj */}
              <option value="1">Milk Tea</option>
              <option value="2">Hot Tea</option>
              <option value="3">Fruit Tea</option>
              <option value="4">Seasonal Specialties</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="milk-substitute" className="form-label">Milk Substitute:</label>
            {/* FOR EDIT MODE, DISABLE SELECTION 
            also need to try to default show the option saved in `newDrink` obj*/}
            <select 
              className="form-select" 
              type="text" 
              name="milkSubstitute" 
              id="milk-substitute"
              onChange={(e) => {
                if (e.target.value === "null") {
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
              required
            >
              <option value={`1`}>Oat Milk</option>
              <option value={`2`}>Almond Milk</option>
              <option value={`3`}>Soy Milk</option>
              <option value={`null`}>No Substitute</option>
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
          <button type="submit" className="btn btn-primary">Add Drink</button>
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

export default AddDrinkForm;