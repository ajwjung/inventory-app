import { useState, useEffect } from "react";
import { Link } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";

function AllDrinks() {
  const [allMilkSubstitutes, setAllMilkSubstitutes] = useState([]);
  const [groupedUniqueDrinks, setGroupedUniqueDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    fetch("/api/all-milk-substitutes", { headers: { "Cache-Control": "no-cache" }})
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json(); 
      })
      .then((data) => {
        setAllMilkSubstitutes(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (allMilkSubstitutes.length === 0) return;

    console.log("Fetching data from /api/all-items...");
    fetch("/api/all-items", { headers: { "Cache-Control": "no-cache" } })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json(); 
      })
      .then((data) => {
        // Group the drinks by category, then by drink name
        const groupedUnique = data.reduce((acc, drink) => {
          const existingDrinkType = acc.find((drinkType) => {
            return drinkType.drinkType === drink.drink_type;
          });

          const drinkName = drink.name;
          if (!drinkName) {
            console.warn("Missing drink name for drink: ", drink);
          };
          
          /* Add drinks to their respective drink types
             With same-name drinks being grouped together */
          if (existingDrinkType) {
            const existingDrink = existingDrinkType.drinks.find((drink) => {
              return drink.drinkName === drinkName;
            });

            if (existingDrink) {
              existingDrink.drinkVariants.push(drink);
            } else {
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
  }, [allMilkSubstitutes]);

  return (
    <>
      <NavBar />
      <div className="container my-4">
        <h1 className="py-4">All Drinks</h1>
        <Link to="/all-drinks/new">
          <button type="button" className="btn btn-green">
            + New Drink
          </button>
        </Link>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && (   
          <div className="container h-100 w-100 pb-4">
            {groupedUniqueDrinks.map((category, i) => {
              return (
                <div className="card-group" key={i}>
                  <h2 className="my-4 text-uppercase">
                    {
                      category.drinkType === "No Type" 
                      ? "Uncategorized" 
                      : category.drinkType
                    }
                  </h2>
                  <div className="row row-cols-2 row-cols-md-3 g-4" >
                    {category.drinks.map((drinkGroup, i) => {
                      return (
                        <div className="col" key={i}>
                          <div className="card h-100">
                            <div className="card-body">
                              <h5 className="card-title">{drinkGroup.drinkName}</h5>
                            </div>
                            <div className="card-body">
                              <ul className="list-group list-group-flush">
                                {drinkGroup.drinkVariants.map((drinkVariant, i) => {
                                  // Convert milk substitute ID to name
                                  let milkSubstitute;
                                  const drinkVariantId = drinkVariant.milk_substitute;
                                
                                  if (drinkVariantId === null) {
                                    milkSubstitute = "No Substitute";
                                  } else {
                                    const match = allMilkSubstitutes.find((substitute) => {
                                      return substitute.id === parseInt(drinkVariantId)
                                    });
                                    milkSubstitute = match.alternative;
                                  };
                                
                                  return (
                                    <li className="list-group-item text-start" key={i}>
                                      <Link
                                        className="card-link"
                                        to={`/all-drinks/${drinkVariant.id}`}
                                      >
                                        {milkSubstitute}
                                      </Link>
                                    </li>
                                  )
                                })}
                              </ul>
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
      <Footer />
    </>
  );
};

export default AllDrinks;