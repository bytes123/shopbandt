import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";


const Navbar = ({ onChange, isHome, isProductPage, isBillPage, isAccountPage, isBrandPage, isCommentPage, isStatisticPage }) => {
  return (
    <div className="navbar">
      <div className="wrapper">


        {isProductPage && <div className="search">
          <input type="text" placeholder="Tìm kiếm theo tên sản phẩm..." onChange={(e) => onChange(e)} />
          <SearchOutlinedIcon />
        </div>}
        {isBillPage && <div className="search">
          <input type="text" placeholder="Tìm kiếm theo mã đơn hàng..." onChange={(e) => onChange(e)} />
          <SearchOutlinedIcon />
        </div>}
        {isAccountPage && <div className="search">
          <input type="text" placeholder="Tìm kiếm theo tên tài khoản..." onChange={(e) => onChange(e)} />
          <SearchOutlinedIcon />
        </div>}
        {isBrandPage && <div className="search">
          <input type="text" placeholder="Tìm kiếm theo tên hãng..." onChange={(e) => onChange(e)} />
          <SearchOutlinedIcon />
        </div>}
        {isCommentPage && <div className="search">
          <input type="text" placeholder="Tìm kiếm theo mã chi tiết sản phẩm..." onChange={(e) => onChange(e.target.value)} />
          <SearchOutlinedIcon />
        </div>}

      </div>
    </div>
  );
};

export default Navbar;
