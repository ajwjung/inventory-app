import { useState, useEffect } from "react";
import { Link } from "react-router";

function AllDrinks() {
  const [groupedUniqueDrinks, setGroupedUniqueDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    console.log("Fetching data from /api/all-items...");
    fetch("/api/all-items", { headers: { "Cache-Control": "no-cache" } })
      .then((response) => {
        console.log("Response Status: ", response.status);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json(); 
      })
      .then((data) => {
        // data = array of all 40 drinks unfiltered
        // Group the drinks by category, then by drink name
        const groupedUnique = data.reduce((acc, drink) => {
          const existingDrinkType = acc.find((drinkType) => {
            return drinkType.drinkType === drink.drink_type;
          });

          const drinkName = drink.name;
          if (!drinkName) {
            console.warn("Missing drink name for drink: ", drink);
          };
          
          // Arr of categories (obj) > arr of drinks (obj) > arr of each variant (obj)
          if (existingDrinkType) {
            const existingDrink = existingDrinkType.drinks.find((drink) => {
              return drink.drinkName === drinkName;
            });

            // Push current drink variant to that array
            if (existingDrink) {
              existingDrink.drinkVariants.push(drink);
            } else {
              // If object doesn't exist, create a new one for it
              existingDrinkType.drinks.push(
                {
                  drinkName: drinkName,
                  drinkVariants: [drink]
                }
              )
            }
          } else {
            acc.push({
              drinkType: drink.drink_type,
              drinks: [
                {
                  drinkName: drinkName,
                  drinkVariants: [drink]
                }
              ]
            })
          };          

          return acc;
        }, []);

        setGroupedUniqueDrinks(groupedUnique);
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
      <Link to="/all-drinks/new">
        <button type="button" className="btn btn-primary">
          Add New Drink
        </button>
      </Link>
      {loading && <div>Loading...</div>}  {/* Show loading */}
      {error && <div>{error}</div>}      {/* Show error message */}
      {!loading && !error && (   
        <div className="container">
          {groupedUniqueDrinks.map((category, i) => {
            return (
              <div className="card-group" key={i}>
                <h2>{category.drinkType}</h2>
                <div className="row row-cols-2 row-cols-md-3 g-4" >
                  {category.drinks.map((drinkGroup, i) => {
                    return (
                      <div className="col" key={i}>
                        <div className="card h-100">
                          <div className="card-body">
                            <p className="card-text">{drinkGroup.drinkName}</p>
                          </div>
                          <div className="card-body">
                            {drinkGroup.drinkVariants.map((drinkVariant, i) => {
                              return (
                                <Link
                                  className="card-link"
                                  to={`/all-drinks/${drinkVariant.id}`}
                                  key={i}
                                >
                                  {drinkVariant.milk_substitute === null 
                                    ? "No Substitute"
                                    : drinkVariant.milk_substitute
                                  }
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )
                  })}
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