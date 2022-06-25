import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Product from "../Products/Product";
import "./SearchPage.scss";
import useWatchMore from "../useWatchMore/useWatchMore";
import WatchMoreBtn from "../useWatchMore/WatchMoreBtn";

function SearchPage() {
  let params = useParams();
  const axios = require("axios");
  const [products, setProducts] = useState([]);
  const [emptyPage, setEmptyPage] = useState(false);

  const { max, handleSetMax, resetMax } = useWatchMore(16);

  async function searchProduct(product_name) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/search-products",
        data: {
          product_name: product_name,
        },
      });
      if (Array.isArray(response.data)) {
        if (response.data.length > 0) {
          setEmptyPage(false);
          setProducts(response.data);
        } else {
          setEmptyPage(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    searchProduct(params.product_name);
  }, [params.product_name]);

  return (
    <div className="search_page-wrapper">
      <div className="container">
        <div className="search_page row">
          {products.length == 0 && emptyPage && (
            <>
              <h2>
                Rất tiếc, SiuPhone không tìm thấy kết quả nào phù hợp với từ
                khóa "{params.product_name}"
              </h2>
              <div className="warning-grammar">
                <h3>Để tìm được kết quả chính xác hơn, bạn vui lòng:</h3>
                <ul className="warning-list">
                  <li className="warning-item">
                    Kiểm tra lỗi chính tả của từ khóa đã nhập
                  </li>
                  <li className="warning-item">Thử lại bằng từ khóa khác</li>
                  <li className="warning-item">
                    Thử lại bằng những từ khóa tổng quát hơn
                  </li>
                  <li className="warning-item">
                    Thử lại bằng những từ khóa ngắn gọn hơn
                  </li>
                </ul>
              </div>
            </>
          )}

          {products.length != 0 &&
            products.map((product, index) => {
              if (index < max) {
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

          <div className="search_more">
            <WatchMoreBtn
              max={max}
              productLength={products.length}
              onSetMax={handleSetMax}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
