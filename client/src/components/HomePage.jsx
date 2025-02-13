function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <div className="container">
        <div className="row">
        </div>
        <div className="row">
          <div className="col">
            <a href="all-drink-types">
              <button className="btn btn-primary">View All Drink Types</button>
              </a>
          </div>
          <div className="col">
            <a href="/all-drinks">
            <button className="btn btn-primary">View All Drinks</button>
            </a>
          </div>
        </div>
      </div>
    </>
  )
};

export default HomePage;