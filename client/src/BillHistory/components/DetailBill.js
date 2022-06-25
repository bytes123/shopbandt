import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { RiBillLine } from "react-icons/ri";
import { BsPatchCheck } from "react-icons/bs";
import { useStateValue } from "../../StateProvider";
import PendingIcon from "@mui/icons-material/Pending";
import PaidIcon from "@mui/icons-material/Paid";
import moment from "moment";

function DetailBill({
  getBills,
  getBillUser,
  loginedUser,
  bill,
  onIsDetailBill,
}) {
  const axios = require("axios");

  const [detailsBill, setDetailsBill] = useState([]);
  const [{ productImageUrl, formatMoney }, dispatch] = useStateValue();

  const getDetailBill = async (data) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/get-detailbill-user",
        data: {
          data: data,
        },
      });
      if (Array.isArray(response.data)) {
        console.log(response.data);
        setDetailsBill(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (loginedUser && loginedUser.user_id) {
      const data = {
        bill_id: bill.bill_id,
        user_id: loginedUser.user_id,
      };
      getDetailBill(data);
    } else {
      const data = {
        bill_id: bill.bill_id,
        user_id: null,
      };
      getDetailBill(data);
    }
  }, [bill]);

  const onDestroyBill = async (bill_id) => {
    if (window.confirm("Bạn có chắc muốn hủy đơn hàng")) {
      try {
        const response = await axios({
          method: "post",
          url: "http://localhost:5000/destroy-bill",
          data: {
            bill_id: bill_id,
          },
        });
        if (response.data) {
          getBills(bill_id, response.data);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
    }
  };

  return (
    <div className="detail_bill py-5">
      <div className="detail_bill-top">
        <div className="detail_bill-back">
          <p
            className="back text-uppercase"
            onClick={() => onIsDetailBill(false)}
          >
            <ArrowBackIosIcon />
            Trở lại
          </p>
        </div>
        <div className="detail_bill-statement text-uppercase d-flex">
          <span className="bill_id">ID ĐƠN HÀNG: {bill.bill_id}</span>
          {bill.bill_statement == 0 && (
            <span className="statement">ĐƠN HÀNG ĐANG CHỜ XÉT DUYỆT </span>
          )}
          {bill.bill_statement == 1 && (
            <span className="statement">ĐƠN HÀNG ĐÃ ĐƯỢC DUYỆT </span>
          )}
          {bill.bill_statement == 2 && (
            <span className="statement">ĐƠN HÀNG ĐÃ HỦY </span>
          )}
        </div>
      </div>
      <div className="detail_bill-statement-line">
        <div className="step_list">
          {bill.bill_statement != 2 ? (
            <div className="step_wrapper">
              <span className="step active step-first">
                <RiBillLine />
              </span>
              <p className="main_state mt-3 fw-bold">Đơn hàng đã đặt</p>
              <p className="create_date-create">
                {moment(bill.create_date).format("HH:mm DD-MM-YYYY")}
              </p>
            </div>
          ) : (
            <div className="step_wrapper">
              <span className="step cancel step-first">
                <RiBillLine />
              </span>
              <p className="main_state mt-3 fw-bold">Đơn hàng đã đặt</p>
              <p className="create_date-create">
                {moment(bill.create_date).format("HH:mm DD-MM-YYYY")}
              </p>
            </div>
          )}

          {bill.bill_ship == 1 && bill.bill_statement != 2 && (
            <>
              <div className="step_wrapper">
                <span className="step active step-first">
                  <PaidIcon />
                </span>
                <p className="main_state mt-3 fw-bold">
                  Đơn hàng đã thanh toán
                </p>
              </div>

              <div className="step-accross active">
                <div className="step-children"></div>
              </div>
            </>
          )}

          {bill.bill_ship == 1 && bill.bill_statement == 2 && (
            <>
              <div className="step_wrapper">
                <span className="step cancel step-first">
                  <PaidIcon />
                </span>
                <p className="main_state mt-3 fw-bold">
                  Đơn hàng đã thanh toán
                </p>
              </div>

              <div className="step-accross cancel ">
                <div className="step-children"></div>
              </div>
            </>
          )}
          {bill.bill_statement != 1 && bill.bill_statement != 2 && (
            <>
              <div className="step_wrapper">
                <span className="step waiting step-first">
                  <PendingIcon />
                </span>
                <p className="main_state mt-3 fw-bold">
                  Đơn hàng đang chờ xét duyệt
                </p>
              </div>
              {bill.bill_ship == 0 && (
                <div className="step-accross waiting">
                  <div className="step-children"></div>
                </div>
              )}
            </>
          )}

          {bill.bill_statement == 1 && (
            <>
              <div className="step_wrapper">
                <span className="step done step-first">
                  <BsPatchCheck />
                </span>
                <p className="main_state mt-3 fw-bold">Đơn hàng đã duyệt</p>
                <p className="create_date-create">
                  {bill.confirm_date &&
                    moment(bill.confirm_date).format("HH:mm DD-MM-YYYY")}
                </p>
              </div>

              <div className="step-accross done">
                <div className="step-children"></div>
              </div>
            </>
          )}

          {bill.bill_statement == 2 && (
            <>
              <div className="step_wrapper">
                <span className="step cancel step-first">
                  <BsPatchCheck />
                </span>
                <p className="main_state mt-3 fw-bold">Đơn hàng đã hủy</p>
                <p className="create_date-create">
                  {bill.cancel_date &&
                    moment(bill.cancel_date).format("HH:mm DD-MM-YYYY")}
                </p>
              </div>

              <div className="step-accross cancel">
                <div className="step-children"></div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="main_detail-bill">
        <h3>CHI TIẾT SẢN PHẨM</h3>
        <ul className="detail_bill-list">
          {detailsBill &&
            detailsBill.map((item, index) => (
              <li className="detail_bill-item" key={index}>
                <div className="detail_bill-image-wrapper">
                  <img
                    src={productImageUrl(item.product_image)}
                    alt=""
                    className="detail_bill-image"
                  />
                </div>
                <div className="detail_bill-infor">
                  <p className="detail_bill-name fw-bold">
                    {item.product_name} {item.rom_value}GB
                  </p>
                  <p className="detail_bill-color">Màu: {item.color_value}</p>
                  <p className="detail_bill-amount fw-bold">
                    x{item.product_amount}
                  </p>
                </div>
                <div className="detail_bill-price-wrapper">
                  <p className="detail_bill-price fw-bold">
                    {formatMoney(
                      item.product_price -
                        (item.product_price * item.product_discount) / 100
                    )}{" "}
                    VNĐ
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="detail_bill-total">
        <div className="detail_bill-price-wrapper wrapper ">
          <div className="detail_bill-label p-3 col-9">Ghi chú</div>
          <div className="detail_bill-price p-3 col-3">{bill.bill_request}</div>
        </div>
        <div className="detail_bill-price-wrapper wrapper ">
          <div className="detail_bill-label p-3 col-9">Tổng tiền hàng</div>
          <div className="detail_bill-price p-3 col-3 fw-bold">
            {formatMoney(bill.bill_price)} VNĐ
          </div>
        </div>

        <div className="detail_bill-ship-wrapper wrapper ">
          <div className="detail_bill-label p-3 col-9">
            Phương thức thanh toán
          </div>
          {bill.bill_ship == 0 ? (
            <div className="detail_bill-shi p-3 col-3 fw-bold">
              Thanh toán khi nhận hàng
            </div>
          ) : (
            <div className="detail_bill-shi p-3 col-3 ">Đã thanh toán</div>
          )}
        </div>
      </div>
      <div className="detail_bill-buttons ">
        {bill.bill_statement == 0 && bill.bill_ship != 1 && (
          <button
            className="btn btn-danger mt-3 btn-cancel "
            onClick={() => onDestroyBill(bill.bill_id)}
          >
            Hủy đơn
          </button>
        )}
      </div>
    </div>
  );
}

export default DetailBill;
