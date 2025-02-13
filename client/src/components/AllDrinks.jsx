import { useState, useEffect } from "react";

function AllDrinks() {
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
    <div className="container">
        <h1>All Drinks</h1>
        {loading && <div>Loading...</div>}  {/* Show loading */}
        {error && <div>{error}</div>}      {/* Show error message */}
        {!loading && !error && (
        <div className="container">
          {groupedDrinks.map((group, i) => {
            return (
              <div key={i}>
                <h5 className="card-title">{group.drinkType}</h5>
                <div className="row row-cols-3 row-cols-sm-2 row-cols-md-4 g-3">
                  {group.drink.map((drink, i) => (
                    <div className="col"key={i}>
                      <div className="card h-100">
                        <div className="card-body">
                          <p>{drink}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default AllDrinks;