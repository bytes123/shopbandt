import React, { useState, memo } from "react";
import Modal from "../../Modal/Modal";
import MainRate from "./MainRate";
import MoreRates from "./MoreRates";
import CommentsList from "./CommentsList";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function CommentForm({ product, comments }) {
  const [isRateForm, setIsRateForm] = useState(false);
  const [isMoreRates, setIsMoreRates] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenRateForm = () => {
    document.body.style.overflow = "hidden";
    setIsRateForm(true);
  };
  const handleOpenMoreRates = () => {
    document.body.style.overflow = "hidden";
    setIsMoreRates(true);
  };

  const handleCloseLoading = () => {
    setLoading(false);
  };

  const handleOpenLoading = () => {
    setLoading(true);
  };

  const ModalCommentList = () => {
    return <MoreRates CommentList={<CommentsList commentsList={comments} />} />;
  };

  return (
    <div className="comment_rate-btns">
      <button
        className="comment_rate-btn comment_rate-btn bg-primary cl-white bd-r-1"
        onClick={handleOpenRateForm}
      >
        Viết đánh giá
      </button>
      {comments.length > 4 ? (
        <button
          className="commtent_rate-more-btn comment_rate-btn bg-white bd-blue cl-blue bd-r-1"
          onClick={handleOpenMoreRates}
        >
          Xem {comments.length} đánh giá
        </button>
      ) : null}
      <Modal
        handleOpenModal={setIsRateForm}
        isOpenModal={isRateForm}
        ModalForm={MainRate}
        onOpenLoading={handleOpenLoading}
        onCloseLoading={handleCloseLoading}
        product={product}
      />
      <Modal
        handleOpenModal={setIsMoreRates}
        isOpenModal={isMoreRates}
        ModalForm={ModalCommentList}
        product={product}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default memo(CommentForm);
