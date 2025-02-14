import { useState, useEffect } from "react";

function AllDrinksTypes() {
  const [drinkTypes, setDrinkTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
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
        // successful fetch
        setDrinkTypes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    )
  }, []);
  
  return (
    <div className="container">
      <h1>Drink Types</h1>
      {loading && <div>Loading...</div>}  {/* Show loading */}
      {error && <div>{error}</div>}      {/* Show error message */}
      {!loading && !error && (
        <div className="container">
          <div className="row row-cols-3 row-cols-md-4 row-cols-lg-5 g-3">
            {drinkTypes.map((drinkType, i) => {
              return (
                <div className="col" key={i}>
                  <div className="card">
                    <div className="card-title">{drinkType.name}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
      <a href="/all-drink-types/new">
        <button type="button" className="btn btn-primary">
          Add New Category
        </button>
      </a>
    </div>
  );
};

export default AllDrinksTypes;