import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

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
    <div className="d-flex flex-column" style={{height: "100vh"}}>
      <NavBar />
      <div className="container flex-grow-1">
        <h1 className="py-4">Drink Types</h1>
        <div className="row">
          <Link to="/all-drink-types/new" className="col">
            <button type="button" className="btn btn-green">
              + New Category
            </button>
          </Link>
        </div>
        {loading && <div>Loading...</div>}  {/* Show loading */}
        {error && <div>{error}</div>}      {/* Show error message */}
        {!loading && !error && (
          <div className="container my-5">
            <div className="row row-cols-3 row-cols-md-4 row-cols-lg-5 g-3">
              {drinkTypes.map((drinkType, i) => {
                return (
                  <div className="col" key={i}>
                    <Link to={`/all-drink-types/${drinkType.id}`}>
                      <div className="card">
                        <h5 className="card-title text-wrap text-center">{drinkType.name}</h5>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div> 
      <Footer />
    </div>
  );
};

export default AllDrinksTypes;