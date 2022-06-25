import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";
import StarPoints from "../../StarPoints";
import { useStateValue } from "../../StateProvider";
import "./Comment.css";

function Comment({ product }) {
  let params = useParams();
  const axios = require("axios");
  const [{ comments }, dispatch] = useStateValue();
  const location = useLocation();

  async function getComments(details_product_id) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/get-comments",
        data: {
          details_product_id: details_product_id,
        },
      });

      if (Array.isArray(response.data)) {
        dispatch({
          type: "SET_COMMENTS",
          payload: response.data,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getComments(params.detail_id);
  }, [location.pathname]);

  return (
    <div className="product_main-comments bd-blur p-4">
      <h2>
        Đánh giá {product.category_name} {product.product_name}/
        {product.ram_value}GB/{product.rom_value}GB
      </h2>
      <div className="product_main-comments-stars bd-b-blur">
        <span className="product_main-star-point mt-1 cl-star">
          {product.product_star_point ?? 5}
        </span>
        <StarPoints
          stars={product.product_star_point ?? 5}
          customClass={"ml-1 "}
        />
        <span className="product_main-comment-quantity ml-1">
          {comments.length} Đánh giá
        </span>
      </div>
      <CommentsList commentsList={comments} overflow={true} />
      <CommentForm product={product} comments={comments} />
    </div>
  );
}

export default Comment;
