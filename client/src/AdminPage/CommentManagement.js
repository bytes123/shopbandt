import React, { useState, useEffect } from "react";
import Home from "./pages/home/Home";
import { useStateValue } from "../StateProvider";
import Toast from "../toast/Toast";
import DetailBill from "./components/modal/DetailBIll";
import Modal from "../Modal/Modal";

function ProductManagement() {
  const [{ details_product, products, size, quality, colors }, dispatch] =
    useStateValue();
  const [comments, setComments] = useState([]);
  const axios = require("axios");
  const { error, success } = Toast;

  async function getComments() {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:5000/get-all-comments",
      });
      if (Array.isArray(response.data)) {
        setComments(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleComments = {
    onDeleteComment: async (comment_id, details_product_id) => {
      if (window.confirm("Bạn có chắc muốn xóa đánh giá này không?") == true) {
        try {
          const response = await axios({
            method: "post",
            url: "http://localhost:5000/delete-comment",
            data: {
              comment_id: comment_id,
              details_product_id: details_product_id,
            },
          });
          if (response.data) {
            getComments();
            success(response.data);
          } else {
            error("Lỗi");
          }
        } catch (error) {
          error("Lỗi");
        }
      }
    },
    onConfirmComment: async (comment_id, details_product_id) => {
      try {
        const response = await axios({
          method: "post",
          url: "http://localhost:5000/confirm-comment",
          data: {
            comment_id: comment_id,
            details_product_id: details_product_id,
          },
        });
        if (response.data) {
          getComments();
          success(response.data);
        } else {
          error("Lỗi");
        }
      } catch (error) {
        error("Lỗi");
      }
    },
    onSearchComment: async (details_product_id) => {
      try {
        const response = await axios({
          method: "post",
          url: "http://localhost:5000/search-comments",
          data: {
            details_product_id: details_product_id,
          },
        });
        if (response.data) {
          setComments(response.data);
        } else {
          error("Lỗi");
        }
      } catch (error) {
        error("Lỗi");
      }
    },
  };

  useEffect(() => {
    getComments();
  }, []);

  const commentCells = [
    "STT",
    "Mã sản phẩm",
    "Tên khách hàng",
    "Số điện thoại",
    "Email",
    "Nội dung",
    "Số sao",
    "Thời gian đánh giá",
    "Trạng thái",
    "",
  ];

  return (
    <div>
      <Home
        list={comments}
        isCommentPage={true}
        cells={commentCells}
        handleClick={handleComments}
        onChange={handleComments.onSearchComment}
      />
    </div>
  );
}

export default ProductManagement;
