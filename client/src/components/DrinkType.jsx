import { useParams, Link } from "react-router-dom";

function DrinkType() {
  const { category } = useParams(); 
  
  const reformatName = (originalName) => {
    const reformattedName = originalName.split("-").join(" ");
    const capitalizedName = reformattedName.replace(/\b\w/g, char => char.toUpperCase());

    return capitalizedName;
  };

  return (
    <>
      <h1>{reformatName(category)}</h1>
      <div className="container">
        <button type="button" className="btn btn-warning">Edit</button>
        <button type="button" className="btn btn-danger">Delete</button>
      </div>
      <Link to="/all-drink-types">
        <button type="button" className="btn btn-primary">
          Back to All Categories
        </button>
      </Link>
    </>
  );
};

export default DrinkType;