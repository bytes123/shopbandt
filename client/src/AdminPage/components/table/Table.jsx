import { useState, useEffect } from "react";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useStateValue } from "../../../StateProvider";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import moment from "moment";

const List = ({
  list,
  isAccountPage,
  isProductPage,
  isBillPage,
  isCommentPage,
  isBrandPage,
  cells,
  onModalAdd,
  onModalUpdate,
  onModalDelete,
  onModalDeleteDetail,
  onDeleteBill,
  onDestroyBill,
  onConfirmBill,
  onOpenDetailBill,
  onDeleteComment,
  onConfirmComment,
  handleChange,
  handleClick,
  onDeleteBrand,
}) => {
  const [{ loginedUser, formatMoney, productImageUrl, brandImageUrl }, dispatch] =
    useStateValue();

  const [newcells, setNewCells] = useState([]);
  const [rows, setRows] = useState([]);

  const GreenSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: pink[600],
      "&:hover": {
        backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: pink[600],
    },
  }));

  useEffect(() => {
    setNewCells(cells);
  }, [cells]);

  useEffect(() => {
    setRows(list);
  }, [list]);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {newcells.map((item, index) => (
              <TableCell className="tableCell fw-b text-center" key={index}>
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* TABLE QUẢN LÝ SẢN PHẨM */}
          {isProductPage
            ? rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="tableCell">{index + 1}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <img
                      src={productImageUrl(row.product_image)}
                      alt=""
                      className="image"
                    />
                  </div>
                </TableCell>
                <TableCell className="tableCell">
                  {row.product_name}
                </TableCell>
                <TableCell className="tableCell">
                  {row.category_name}
                </TableCell>
                <TableCell className="tableCell">{row.brand_name}</TableCell>
                <TableCell className="tableCell">
                  {row.ram_value} GB
                </TableCell>
                <TableCell className="tableCell">
                  {row.rom_value} GB
                </TableCell>
                <TableCell className="tableCell">
                  {row.color_value}
                </TableCell>
                <TableCell className="tableCell">
                  {formatMoney(row.product_price)} VNĐ
                </TableCell>
                <TableCell className="tableCell">
                  {Number(row.product_discount) + 1 + "%"}
                  <br></br>
                  {formatMoney(
                    row.product_price -
                    (row.product_price * (Number(row.product_discount) + 1)) / 100
                  )}{" "}
                  VNĐ
                </TableCell>
                <TableCell className="tableCell">
                  {row.product_storage}
                </TableCell>
                <TableCell className="tableCell ">
                  <button
                    className="btn btn-warning"
                    onClick={() => onModalUpdate(row)}
                  >
                    Sửa
                  </button>
                </TableCell>
                <TableCell className="tableCell">
                  <button
                    className="btn btn-danger"
                    onClick={() => onModalDelete(row)}
                  >
                    Xóa sản phẩm
                  </button>
                </TableCell>
                <TableCell className="tableCell">
                  <button
                    className="btn btn-danger"
                    onClick={() => onModalDeleteDetail(row)}
                  >
                    Xóa chi tiết sản phẩm
                  </button>
                </TableCell>
                {/* <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell> */}
              </TableRow>
            ))
            : null}

          {/* BILL TABLE */}
          {isBillPage && rows
            ? rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="tableCell">{index + 1}</TableCell>
                <TableCell className="tableCell">{row.bill_id}</TableCell>
                <TableCell className="tableCell">{row.full_name}</TableCell>
                <TableCell className="tableCell">{row.gender}</TableCell>
                <TableCell className="tableCell">
                  {row.phone_number}
                </TableCell>
                <TableCell className="tableCell">
                  {row.bill_address}
                </TableCell>
                <TableCell className="tableCell">
                  {row.bill_request}
                </TableCell>
                <TableCell className="tableCell">
                  {moment(row.create_date).format("DD/MM/YYYY HH:mm:ss")}
                </TableCell>

                <TableCell className="tableCell">
                  {row.bill_ship == 1 ? (
                    <span className="pay-done text-success">
                      Đã thanh toán
                    </span>
                  ) : (
                    <span className="pay-none text-danger">
                      Thanh toán khi nhận hàng{" "}
                    </span>
                  )}
                </TableCell>
                <TableCell className="tableCell">
                  <button
                    className="btn btn-dark"
                    onClick={() => onOpenDetailBill(row, row.bill_id)}
                  >
                    Xem chi tiết
                  </button>
                </TableCell>
                <TableCell className="tableCell">
                  {row.bill_statement == 0 && (
                    <>
                      <button
                        className="btn btn-success"
                        onClick={() => onConfirmBill(row.bill_id)}
                      >
                        Duyệt
                      </button>
                      {row.bill_ship != 1 && <button
                        className="btn btn-danger mt-2"
                        onClick={() => onDestroyBill(row.bill_id)}
                      >
                        Hủy
                      </button>
                      } </>

                  )}
                  {row.bill_statement == 1 ? (
                    <span className="pay-done text-success">Đã duyệt</span>
                  ) : (
                    row.bill_statement == 2 && (
                      <span className="pay-none text-danger">Đã hủy </span>
                    )
                  )}
                </TableCell>
                <TableCell className="tableCell">
                  {" "}
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => onDeleteBill(row.bill_id)}
                  >
                    Xóa
                  </button>
                </TableCell>
              </TableRow>
            ))
            : null}

          {/* TABLE QL TÀI KHOẢN */}
          {isAccountPage && rows
            ? rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="tableCell">{index + 1}</TableCell>
                <TableCell className="tableCell">{row.user_name}</TableCell>
                <TableCell className="tableCell">{row.email}</TableCell>
                <TableCell className="tableCell">
                  {moment(row.createdAt).format("HH:mm:ss")}
                  <br />
                  {moment(row.createdAt).format("DD/MM/YY YY")}
                </TableCell>
                <TableCell className="tableCell">
                  {" "}
                  <GreenSwitch
                    label="Admin"
                    onClick={() => handleChange(row)}
                    defaultChecked={row.isAdmin}
                  />
                </TableCell>
                <TableCell className="tableCell">
                  {
                    loginedUser.user_id !== row.user_id && <button
                      className="btn_account-delete btn-danger"
                      onClick={() => handleClick(row.user_id)}
                    >
                      Xóa tài khoản
                    </button>
                  }
                </TableCell>
              </TableRow>
            ))
            : null}

          {/* TABLE QL BRAND */}
          {isBrandPage && rows
            ? rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="tableCell">{index + 1}</TableCell>
                <TableCell className="tableCell logo">
                  <img src={brandImageUrl(row.brand_image)} alt="" />
                </TableCell>
                <TableCell className="tableCell ">{row.brand_name}</TableCell>
                <TableCell className="tableCell">
                  {row.category_name}
                </TableCell>
                <TableCell className="tableCell">
                  {moment(row.create_date).format("HH:mm:ss")}
                  <br />
                  {moment(row.create_date).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell className="tableCell">
                  <button
                    className="btn_account-delete btn-info"
                    onClick={() => onModalUpdate(row)}
                  >
                    Cập nhật hãng
                  </button>
                </TableCell>
                <TableCell className="tableCell">
                  <button
                    className="btn_account-delete btn-danger"
                    onClick={() => onDeleteBrand(row.brand_id)}
                  >
                    Xóa hãng
                  </button>
                </TableCell>

              </TableRow>
            ))
            : null}

          {/* COMMENT TABLE */}
          {isCommentPage && rows
            ? rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="tableCell">{index + 1}</TableCell>
                <TableCell className="tableCell">{row.details_product_id}</TableCell>
                <TableCell className="tableCell">{row.comment_author}</TableCell>

                <TableCell className="tableCell">{row.comment_phoneNumber}</TableCell>
                <TableCell className="tableCell">
                  {row.comment_email}
                </TableCell>
                <TableCell className="tableCell">{row.comment_description}</TableCell>
                <TableCell className="tableCell">
                  {row.star_point}
                </TableCell>
                <TableCell className="tableCell">
                  {moment(row.create_date).format("DD/MM/YYYY HH:mm:ss")}
                </TableCell>
                <TableCell className="tableCell">
                  {row.comment_statement === 0 && (
                    <button
                      className="btn btn-success"
                      onClick={() => onConfirmComment(row.comment_id, row.details_product_id)}
                    >
                      Duyệt
                    </button>
                  )}
                  {row.comment_statement === 1 &&
                    <span className="pay-done text-success">Đã duyệt</span>
                  }
                </TableCell>
                <TableCell className="tableCell"> <button
                  className="btn btn-danger"
                  onClick={() => onDeleteComment(row.comment_id, row.details_product_id)}
                >
                  Xóa
                </button></TableCell>
              </TableRow>
            ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
