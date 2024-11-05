import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductByID = async () => {
      try {
        const response = await axios.get(`localhost:5000/product/${id}`);
        setName(response.data.name);
        setPrice(response.data.price);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductByID()
  });

  const updateProduct = async () => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/product/edit/${id}`, {
        name: name,
        price: price,
      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.msg);
      }
    }
  };
  return (
    <div className="mt-4 pl-5">
      <h1 className="title has-text-dark">Products</h1>
      <h2 className="subtitle has-text-dark">Edit Product</h2>
      <div className="card is-shadowless columns has-background-light">
        <div className="card-content column is-half">
          <div className="content">
            <form onSubmit={updateProduct} className="box">
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input type="text" className="input" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
              </div>

              <div className="field mt-5">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditProduct;
