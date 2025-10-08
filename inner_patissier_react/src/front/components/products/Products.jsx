"use client";
import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import axios from "axios";

const Products = ({ sectionRefs }) => {
  const [products, setProducts] = useState([]);
  const base_url = process.env.REACT_APP_API_URL;
  const accessToken = localStorage.getItem("access_token");

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${base_url}/products/`);
      setProducts(response.data); // Adjust if your API wraps data differently
      console.log("Products");
      console.log(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section
      id="Products"
      className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center pb-32"
    >
      {products.length > 0 ? (
        products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">Loading products...</p>
      )}
    </section>
  );
};

export default Products;
