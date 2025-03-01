import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleDrink() {
  const [drink, setDrink] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { drinkId } = useParams();

  useEffect(() => {
      fetch("/api/all-items", { 
        method: "GET",
        headers: { "Cache-Control": "no-cache" }
      })
      .then((response) => {
        if (!response.ok) {
          console.log("Response Status: ", response.status);
          throw new Error("Failed to fetch data.");
        }
        return response.json();       
      })
      .then((data) => {
        console.log("Fetched data: ", data);

        const match = data.find((drink) => drink.id === parseInt(drinkId));
        setDrink(match);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
        setLoading(false);
      })
      
  }, [drinkId]);

  return (
    <>
      <h1>{drink.name}</h1>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <>
          <div className="container">
            <p>Drink Type: {drink.drink_type} </p>
            <p>Milk Substitute: 
              {drink.milk_substitute === null ? " None" : drink.milk_substitute}
            </p>
            <p>Price: {drink.price}</p>
          </div>
        </>
      )}
    </>
  )
};

export default SingleDrink;