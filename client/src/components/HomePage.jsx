import { useState, useEffect } from "react";

function HomePage() {
  const [groupedDrinks, setGroupedDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    console.log("Fetching data from /api/items-per-category...");
    fetch("/api/items-per-category", { headers: { 'Cache-Control': 'no-cache' } })
      .then((response) => {
        console.log("Response Status:", response.status);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);

        // Group drinks after fetching, while using effect
        const grouped = data.reduce((acc, drink) => {
          // Find the current drink type in the results array we're accumulating to
          const existingDrinkType = acc.find((drinkType) => drinkType.drinkType === drink.drink_type_name);

          // If the current drink type exists, 
          // then simply push the new drink to the arr
          if (existingDrinkType) {
             existingDrinkType.drink.push(drink.drink_name);
          } else {
            // If the current drink type DOESN'T exist,
            // then push a new object to the results array (accumulator)
            acc.push({
              drinkType: drink.drink_type_name,
              drink: [drink.drink_name]
            });
          }

          // Then return this results array (accumulator) after each iteration
          return acc;
        }, []); // empty arr means start with an empty arr as the accumulator
         
        setGroupedDrinks(grouped); // Update state
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
          <h2>All Drinks</h2>
          <ul>
            {groupedDrinks.map((group, i) => {
              return (<li key={i}>
                <h3>{group.drinkType}</h3>
                <ul>{group.drink.map((drink, i) => (
                  <li key={i}>{drink}</li>
                ))}</ul>
              </li>)
            })}
          </ul>
        </div>
      )}
      </div>
    </>
  )
};

export default HomePage;