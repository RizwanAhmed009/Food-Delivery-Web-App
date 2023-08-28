import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import Carousel from "../Components/Carousel";

const Home = () => {
  const [search, setsearch] = useState("");
  const [foodCat, setfoodCat] = useState([]);
  const [fooditems, setfooditems] = useState([]);
  const loadData = async () => {
    let response = await fetch("http://localhost:8000/api/foodData", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
    });
    response = await response.json();
    setfooditems(response[0]);
    setfoodCat(response[1]);
    // console.log(response[0],response[1]);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      {/* <div><Navbar/></div> */}
      {/* <div>Home</div> */}
      <div>
        {/* <Carousel /> */}

        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setsearch(e.target.value)}
                />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/700×500?beef"
                className="d-block w-100"
                style={{ filter: "brightness(60%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/700×500?pastry"
                className="d-block w-100"
                style={{ filter: "brightness(60%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/700×500?kabab"
                className="d-block w-100"
                style={{ filter: "brightness(60%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {(foodCat && foodCat !== [])
          ? foodCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {fooditems !== [] ? (
                    fooditems
                      .filter((item) => {
                        return (
                          item.CategoryName === data.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase())
                        );
                      })
                      .map((filterItem) => {
                        return (
                          <div
                            key={filterItem._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card
                              fooditem={filterItem}
                              // foodName={filterItem.name}
                              // foodImage={filterItem.img}
                              // text={filterItem.description}
                              options={filterItem.options[0]}
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div>No Such Data Found</div>
                  )}
                  {/*  */}
                </div>
                //
              );
            })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
