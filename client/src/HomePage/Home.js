import React, { useState, useEffect } from "react";
import Flickity from "../Sliders/Flickity";
import Product from "../Products/Product";
import "./Home.css";
import { useStateValue } from "../StateProvider";

export default function Home() {
  const [{ products, details_product }, dispatch] = useStateValue();
  let sliders = ["slider1.png", "slider2.png", "slider3.png"];
  let address = "HomePage";

  return (
    <div className="home">
      <div className="home_container">
        <Flickity sliders={sliders} address={address} />

        <div className="home_products home_main-products">
          <div className="home_row row">
            <h2 className="home_header">Laptop mới nhất</h2>
            {[
              ...new Map(
                details_product
                  .filter((item) => item.category_id == "laptop")
                  .map((item) => [item["product_id"], item])
              ).values(),
            ].map((product, index) => {
              if (index < 10) {
                return (
                  <Product
                    key={index}
                    id={product.product_name ?? ""}
                    title={product.product_name ?? ""}
                    category={product.category_id}
                    amount={1}
                    product={product}
                  />
                );
              }
            })}
          </div>
          {/* <div className="home_row row">
            <h2 className="home_header">Laptop nổi bật</h2>
            {products
              .filter((item) => item.category_id == "laptop")
              .slice(0, 5)
              .map((product, index) => {
                let productImage =
                  details_product.length > 0
                    ? details_product.filter(
                        (detail) => detail.product_id == product.product_id
                      )[0] != undefined
                      ? details_product.filter(
                          (detail) => detail.product_id == product.product_id
                        )[0].product_image
                      : ""
                    : [];

                let miniList =
                  details_product.length > 0
                    ? details_product.filter(
                        (detail) => detail.product_id == product.product_id
                      )
                    : [];

                if (product.category_id == "laptop" && index < 5) {
                  return (
                    <Product
                      key={index}
                      id={product.product_name ?? ""}
                      title={product.product_name ?? ""}
                      category={product.category_id}
                      amount={1}
                      price={miniList[0] ? miniList[0].product_price : ""}
                      image={productImage ?? ""}
                      rating={product.product_star_point}
                      miniList={miniList}
                    />
                  );
                }
              })}
          </div> */}
        </div>
      </div>
    </div>
  );
}
