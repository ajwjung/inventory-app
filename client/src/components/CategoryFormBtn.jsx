import PropTypes from "prop-types";

function CategoryFormBtn({categoryId, loading}) {
  let buttonText;

  if (categoryId && loading) {
    buttonText = "Editing...";
  } else if (!categoryId && loading) {
    buttonText = "Creating...";
  } else if (categoryId && !loading) {
    buttonText = "Update Category";
  } else {
    buttonText = "Create Category";
  };

  return (
    <button type="submit" className="btn btn-green-solid my-5" disabled={loading}>
      {buttonText}
    </button>
  )
};

CategoryFormBtn.propTypes = {
  categoryId: PropTypes.number,
  loading: PropTypes.bool,
}

export default CategoryFormBtn;