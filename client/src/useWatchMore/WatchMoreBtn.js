import React from "react";
import "./WatchMore.scss";

function WatchMoreBtn({ max, productLength, onSetMax }) {
  return (
    <div className="watch_more-btn">
      {max <= productLength - 1 ? (
        <button className="btn btn-danger" onClick={onSetMax}>
          Xem thêm {productLength - max} sản phẩm
        </button>
      ) : null}
    </div>
  );
}

export default WatchMoreBtn;
