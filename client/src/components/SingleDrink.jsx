import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ConfirmationModal from "./DeleteModal";
import NavBar from "./NavBar";
import Footer from "./Footer";
import * as bootstrap from "bootstrap";

function SingleDrink() {
  const [allMilkSubstitutes, setAllMilkSubstitutes] = useState([]);
  const [drink, setDrink] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { drinkId } = useParams();
 
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
      const match = data.find((drink) => drink.id === parseInt(drinkId));
      console.log(match);
      

      if (match.milk_substitute === null) {
        setDrink({
          name: match.name,
          drinkType: match.drink_type,
          milkSubstitute: null,
          price: match.price,
        });
      } else {
        const milkSubstituteName = allMilkSubstitutes.find((substitute) => {
          return (
            substitute.id === parseInt(match.milk_substitute)
          )
        });

        setDrink({
          name: match.name,
          drinkType: match.drink_type,
          milkSubstitute: milkSubstituteName.alternative,
          price: match.price,
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      setError(error);
      setLoading(false);
    })
      
  }, [drinkId, allMilkSubstitutes]);

  useEffect(() => {
    // Enable Bootstrap popovers
    const deleteCategoryBtn = document.getElementById("delete-category-btn");
    
    if (deleteCategoryBtn) {
      const popover = new bootstrap.Popover(deleteCategoryBtn);;

      return () => {
        popover.dispose();  // Clean up when component is unmounted
      };
    }
  }, []);

  return (
    <div className="d-flex flex-column" style={{height: "100vh"}}>
      <NavBar />
      <h1 className="m-5">{drink.name}</h1>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <div className="container flex-grow-1">
          <div className="container my-3 h-25">
            <p>Drink Type: {drink.drinkType}</p>
            <p>Milk Substitute:
              {drink.milkSubstitute === null ? " None" : " " + drink.milkSubstitute}
            </p>
            <p>Price: ${drink.price}</p>
          </div>
          <div className="d-flex flex-column" style={{height: "50%"}}>
            <div className="d-flex justify-content-center align-items-center">
              <Link to={`/all-drinks/${drinkId}/edit`}>
                <button className="btn btn-green-solid m-2" type="button">
                  Edit Drink
                </button>
              </Link>
              {(parseInt(drinkId) <= 40) && (
                <span 
                  className="d-inline-block disabled" 
                  id="delete-category-btn"
                  tabIndex="0" 
                  data-bs-toggle="popover" 
                  data-bs-trigger="hover focus" 
                  data-bs-placement="top" 
                  data-bs-content="Cannot delete default drink."
                >
                  <button 
                    className="btn btn-secondary m-2" 
                    type="button" 
                    disabled
                  >
                    Delete Drink
                  </button>
                </span>
              )}
              {(parseInt(drinkId) > 40) && (
                <>
                  <button
                    className="btn btn-brown m-2"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#delete-category-modal"
                  >
                    Delete Drink
                  </button>
                  <ConfirmationModal location="Drink" currentDrink={drink}/>
                </>
              )}
            </div>
          </div>
          <div className="mt-auto">
            <Link to="/all-drinks">
              <button className="btn btn-green" type="button">
                Back to All Drinks
              </button>
            </Link>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
};

export default SingleDrink;