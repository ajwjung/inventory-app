import { useState, useEffect } from "react";

function HomePage() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    console.log("Fetching data from /api/items...");
    fetch("/api/items", { headers: { 'Cache-Control': 'no-cache' } })
      .then((response) => {
        console.log("Response Status:", response.status);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);
        setDrinks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      });
  }, []);
  
  
  return (
    <>
      <div>
        <h1>Home Page</h1>
        {loading && <div>Loading...</div>}  {/* Show loading */}
        {error && <div>{error}</div>}      {/* Show error message */}
        {!loading && !error && (
        <div>
          <h1>Drinks List</h1>
          <ul>
            {drinks.map((drink) => (
              <li key={drink.id}>{drink.name}</li> 
            ))}
          </ul>
        </div>
      )}
      </div>
    </>
  )
};

export default HomePage;