import { useState } from "react";

function AddCategoryForm() {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    setLoading(true);
    setError(null);

    try {
      // Fetch and send data with the request to server
      const response = fetch("/api/all-categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName })
      });

      if (!response.ok) {
        throw new Error("Error: Error fetching from database");
      };

      setCategoryName("");  // reset value for next time    
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Add a New Drink Type</h1>
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
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creating.." : "Create Category" }
        </button>
      </form>
      <a href="/all-drink-types">
        <button type="button" className="btn btn-secondary">
          Back to All Categories
        </button>
      </a>
    </>
  )
}

export default AddCategoryForm;