import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SiuuAdmin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/admin">
            <li>
              <DashboardIcon className="icon" />
              <span>Trang chủ </span>
            </li>
          </Link>
          <p className="title">QUẢN LÝ WEBSITE</p>

          <li>
            <Link to="/admin/accounts" style={{ textDecoration: "none" }}>
              <PersonOutlineIcon className="icon" />
              <span>Quản lý tài khoản</span>
            </Link>
          </li>


          <li>
            <Link to="/admin/products" style={{ textDecoration: "none" }}>
              <StoreIcon className="icon" />
              <span>Quản lý sản phẩm</span>
            </Link>
          </li>

          <li>
            <Link to="/admin/bills" style={{ textDecoration: "none" }}>
              <CreditCardIcon className="icon" />
              <span>Quản lý đơn hàng</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/brands" style={{ textDecoration: "none" }}>
              <AlignHorizontalRightIcon className="icon" />
              <span>Quản lý hãng</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/comments" style={{ textDecoration: "none" }}>
              <MarkUnreadChatAltIcon className="icon" />
              <span>Quản lý đánh giá</span>
            </Link>
          </li>



        </ul>
      </div>

    </div>
  );
};

export default Sidebar;
