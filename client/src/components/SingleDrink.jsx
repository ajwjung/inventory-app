import { useParams } from "react-router-dom";

function SingleDrink() {
  const { drinkId } = useParams();
  // need to fetch for current page's drink
  // BUT because of the ID issue, we might need to refactor our SQL table setup first
  // `milk_substitute` will probably need to hold an array of values instead
  // and those values we'll somehow link up to the `milk_substitutes` table...
  // maybe not use foreign keys then?

  return (
    <div>Drink ID: {drinkId}</div>
  )
};

export default SingleDrink;