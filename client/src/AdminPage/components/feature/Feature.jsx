import React, { useEffect, useState } from "react";
import "./feature.scss";
import "react-circular-progressbar/dist/styles.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useStateValue } from "../../../StateProvider";

const Feature = ({ dataSales }) => {
  const [{ formatMoney }, dispatch] = useStateValue();
  const {
    salesToday,
    salesTomorrow,
    salesMonth,
    salesLastMonth,
    salesYear,
    salesLastYear,
  } = dataSales;
  const targetDate = 30000000;
  const targetMonth = targetDate * 30;
  const targetYear = targetMonth * 12;
  const [percentTargetDate, setPercentTargetDate] = useState(0);
  const [percentTargetMonth, setPercentTargetMonth] = useState(0);
  const [percentTargetYear, setPercentTargetYear] = useState(0);

  useEffect(() => {
    setPercentTargetDate(((salesToday / targetDate) * 100).toFixed(2));
  }, [salesToday]);

  useEffect(() => {
    setPercentTargetMonth(((salesMonth / targetMonth) * 100).toFixed(2));
  }, [salesMonth]);

  useEffect(() => {
    setPercentTargetYear(((salesYear / targetYear) * 100).toFixed(2));
  }, [salesYear]);

  return (
    <div className="feature">
      <div className="top">
        <h1 className="title">Tổng doanh thu</h1>
      </div>
      <div className="bottom">
        <div className="percent_statistic">
          <div className="item">
            <div className="featureChart">
              <CircularProgressbar
                value={percentTargetDate}
                text={`${percentTargetDate}%`}
                strokeWidth={5}
              />
            </div>
            <p className="title">Doanh thu ngày </p>
            <p className="amount">{formatMoney(salesToday)} VNĐ</p>
          </div>
          <div className="item">
            <div className="featureChart">
              <CircularProgressbar
                value={percentTargetMonth}
                text={`${percentTargetMonth}%`}
                strokeWidth={5}
              />
            </div>
            <p className="title">Doanh thu tháng </p>
            <p className="amount">{formatMoney(salesMonth)} VNĐ</p>
          </div>
          <div className="item">
            <div className="featureChart">
              <CircularProgressbar
                value={percentTargetYear}
                text={`${percentTargetYear}%`}
                strokeWidth={5}
              />
            </div>
            <p className="title">Doanh thu năm </p>
            <p className="amount">{formatMoney(salesYear)} VNĐ</p>
          </div>
        </div>
        {/* <p className="desc">
          Previous Transaction Processing, Last Payment may not be inclided
        </p> */}
        <p className="summary">
          <div className="item">
            <div className="itemTitle">Mục tiêu ngày</div>
            <div className={`${salesToday > targetDate ? "itemResult positive" : "itemResult negative"}`}>
              {percentTargetDate > 100 ? (
                <KeyboardArrowUpIcon fontSize="small" />
              ) : (
                <KeyboardArrowDownIcon fontSize="small" />
              )}

              <div className="resultAmount">{formatMoney(targetDate)} VNĐ</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Mục tiêu tháng</div>
            <div className={`${salesMonth > targetMonth ? "itemResult positive" : "itemResult negative"}`}>
              {percentTargetMonth > 100 ? (
                <KeyboardArrowUpIcon fontSize="small" />
              ) : (
                <KeyboardArrowDownIcon fontSize="small" />
              )}

              <div className="resultAmount">{formatMoney(targetMonth)} VNĐ</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Mục tiêu năm</div>
            <div className={`${salesYear > targetYear ? "itemResult positive" : "itemResult negative"}`}>
              {percentTargetYear > 100 ? (
                <KeyboardArrowUpIcon fontSize="small" />
              ) : (
                <KeyboardArrowDownIcon fontSize="small" />
              )}

              <div className="resultAmount">{formatMoney(targetYear)} VNĐ</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Hôm qua</div>
            <div className={`${salesToday > salesTomorrow ? "itemResult positive" : "itemResult negative"}`}>
              {salesToday > salesTomorrow ? (
                <KeyboardArrowUpIcon fontSize="small" />
              ) : (
                <KeyboardArrowDownIcon fontSize="small" />
              )}
              <div className="resultAmount">
                {" "}
                {formatMoney(salesTomorrow)} VNĐ
              </div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Tháng trước</div>
            <div className={`${salesMonth > salesLastMonth ? "itemResult positive" : "itemResult negative"}`}>
              {salesMonth > salesLastMonth ? (
                <KeyboardArrowUpIcon fontSize="small" />
              ) : (
                <KeyboardArrowDownIcon fontSize="small" />
              )}
              <div className="resultAmount">{formatMoney(salesLastMonth)} VNĐ</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Năm trước</div>
            <div className={`${salesYear > salesLastYear ? "itemResult positive" : "itemResult negative"}`}>
              {salesYear > salesLastYear ? (
                <KeyboardArrowUpIcon fontSize="small" />
              ) : (
                <KeyboardArrowDownIcon fontSize="small" />
              )}
              <div className="resultAmount">{formatMoney(salesLastYear)} VNĐ</div>
            </div>
          </div>
        </p>
      </div>
    </div>
  );
};

export default Feature;
