import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Feature from '../../components/feature/Feature'
import FeatureByDate from '../../components/feature/FeatureByDate'
import Chart from "../../components/chart/Chart"
import Table from "../../components/table/Table";
import DatePicker from "../../components/picker/DatePicker"

const Home = ({
  isAccountPage,
  isHome,
  isProductPage,
  isCommentPage,
  isStatisticPage,
  list,
  cells,
  onChange,
  handleClick,
  handleChange,
  isBillPage,
  isBrandPage,
  dataSales,
  dataChart,
  selectedDate,
  onSelectedDate
}) => {

  const [open, setOpen] = useState(false)


  return (
    <div className="home_admin">
      <Sidebar />
      <div className="homeContainer">

        <Navbar
          onChange={onChange}
          isHome={isHome}
          isProductPage={isProductPage}
          isBillPage={isBillPage}
          isAccountPage={isAccountPage}
          isBrandPage={isBrandPage}
          isStatisticPage={isStatisticPage}
        />

        {isHome ? <> <div className="listTitle">DASHBOARD</div>

          <div className="charts mt-5">
            <Feature dataSales={dataSales} />
            <Chart title="Doanh thu trong tuần" dataChart={dataChart} />
          </div>
          <div className="charts date-wrapper">
            <DatePicker selectedDate={selectedDate} onSelectedDate={onSelectedDate} />
            <FeatureByDate selectedDate={selectedDate} dataSales={dataSales} />
          </div>
        </> : null}

        {isProductPage ? (
          <>
            <div className="listTitle">QUẢN LÝ SẢN PHẨM</div>
            <buttom
              className="btn btn-primary mb-4 mx-3"
              onClick={handleClick.handleOpenAddProduct}
            >
              Thêm loại sản phẩm
            </buttom>
            <buttom
              className="btn btn-primary mb-4 mx-3"
              onClick={handleClick.handleOpenAddDetailProduct}
            >
              Thêm chi tiết sản phẩm
            </buttom>
            <buttom
              className="btn btn-primary mb-4 mx-3"
              onClick={handleClick.handleOpenAddRamProduct}
            >
              Thêm Ram
            </buttom>
            <buttom
              className="btn btn-primary mb-4 mx-3"
              onClick={handleClick.handleOpenAddRomProduct}
            >
              Thêm Rom
            </buttom>
            <buttom
              className="btn btn-primary mb-4 mx-3"
              onClick={handleClick.handleOpenAddColorProduct}
            >
              Thêm màu
            </buttom>
            <Table
              isProductPage={isProductPage}
              list={list}
              cells={cells}
              onModalUpdate={handleClick.handleOpenUpdateProduct}
              onModalDelete={handleClick.handleConfirmDeleteProduct}
              onModalDeleteDetail={
                handleClick.handleConfirmDeleteDetailProduct
              }
            />
          </>
        ) : null}


        {isBillPage ? (
          <>
            <div className="listTitle">QUẢN LÝ ĐƠN HÀNG</div>

            <Table
              isBillPage={isBillPage}
              list={list}
              cells={cells}
              onOpenDetailBill={handleClick.onOpenDetailBill}
              onDestroyBill={handleClick.onDestroyBill}
              onConfirmBill={handleClick.onConfirmBill}
              onDeleteBill={handleClick.onDeleteBill}
            />
          </>
        ) : null}

        {isAccountPage ? (
          <>
            <div className="listTitle">QUẢN LÝ TÀI KHOẢN</div>

            <Table
              isAccountPage={isAccountPage}
              list={list}
              cells={cells}
              handleChange={handleChange}
              handleClick={handleClick}
            />
          </>
        ) : null}

        {isBrandPage ? (
          <>
            <div className="listTitle">QUẢN LÝ HÃNG</div>
            <buttom
              className="btn btn-primary mb-4 mx-3"
              onClick={handleClick.handleOpenAddBrand}
            >
              Thêm Hãng
            </buttom>

            <Table
              isBrandPage={isBrandPage}
              list={list}
              cells={cells}
              handleChange={handleChange}
              onModalUpdate={handleClick.handleOpenUpdateBrand}
              onDeleteBrand={handleClick.onDeleteBrand}
            />
          </>
        ) : null}

        {isCommentPage ? (
          <>
            <div className="listTitle">QUẢN LÝ ĐÁNH GIÁ</div>

            <Table
              isCommentPage={isCommentPage}
              list={list}
              cells={cells}
              onDeleteComment={handleClick.onDeleteComment}
              onConfirmComment={handleClick.onConfirmComment}
            />
          </>
        ) : null}

      </div>
    </div>
  );
};

export default Home;
