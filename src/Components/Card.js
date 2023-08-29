import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";
// import { useCart, useCartDispatch } from "./ContextReducer";
const Card = (props) => {
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState("");
  let data = useCart();
  let dispatch = useDispatchCart();

  const priceRef = useRef();
  const handleAddtoCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.fooditem._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "Update",
          id: props.fooditem._id,
          price: finalprice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.fooditem._id,
          name: props.fooditem.name,
          price: finalprice,
          qty: qty,
          size: size,
        });
        return;
      }
      await dispatch({
        type: "ADD",
        id: props.fooditem._id,
        name: props.fooditem.name,
        price: finalprice,
        qty: qty,
        size: size,
        img: props.img,
      });
    }

    console.log("cart data===", data);
  };
  let finalprice = qty * parseInt(options[size]);
  useEffect(() => {
    setsize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img
            style={{ height: "125px", objectFit: "fill" }}
            src={props.fooditem.img}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{props.fooditem.name}</h5>
            {/* <p className="card-text">{props.description}</p> */}
            <div className="container w-100">
              <select
                className=" h-100 m-2 bg-success rounded"
                onClick={(e) => setqty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select
                className=" h-100 m-2 bg-success rounded"
                ref={priceRef}
                onClick={(e) => setsize(e.target.value)}
              >
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>

              <div className="d-inline fs-5 h-100">Rs:{finalprice}/</div>
              <hr />
              <button className="btn btn-success" onClick={handleAddtoCart}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
