import NavBar from "./NavBar";
import Footer from "./Footer";

function HomePage() {
  return (
    <div className="d-flex flex-column" style={{height: "100vh"}}>
      <NavBar />
      <div className="container flex-grow-1">
        <h1 className="m-5">FUN TEA</h1>
        <div className="row">
          <div className="col">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Similique a error veniam, adipisci eum itaque? Aperiam, odit. 
              Voluptates ipsam ipsum consequuntur sapiente aliquid quasi 
              nesciunt asperiores. Provident nisi voluptatum omnis!
            </p>
          </div>
        </div>
        <div className="row d-flex align-items-center py-3">
          <div className="col">
            <a href="all-drink-types">
              <button className="btn btn-green">View All Drink Types</button>
              </a>
          </div>
          <div className="col">
            <a href="/all-drinks">
            <button className="btn btn-green">View All Drinks</button>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
};

export default HomePage;