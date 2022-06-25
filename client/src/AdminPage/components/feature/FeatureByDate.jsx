import React, { useEffect, useState } from "react";
import "./feature.scss";
import "react-circular-progressbar/dist/styles.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useStateValue } from "../../../StateProvider";

const Feature = ({ selectedDate, dataSales }) => {
    const [{ formatMoney }, dispatch] = useStateValue();
    const {
        salesByDate,
        salesByMonth,
        salesByYear,
    } = dataSales;
    const targetDate = 10000000;
    const targetMonth = targetDate * 30;
    const targetYear = targetMonth * 12;
    const [percentTargetDate, setPercentTargetDate] = useState(0);
    const [percentTargetMonth, setPercentTargetMonth] = useState(0);
    const [percentTargetYear, setPercentTargetYear] = useState(0);

    useEffect(() => {
        setPercentTargetDate(((salesByDate / targetDate) * 100).toFixed(2));
    }, [salesByDate]);

    useEffect(() => {
        setPercentTargetMonth(((salesByMonth / targetMonth) * 100).toFixed(2));
    }, [salesByMonth]);

    useEffect(() => {
        setPercentTargetYear(((salesByYear / targetYear) * 100).toFixed(2));
    }, [salesByYear]);



    return (
        <div className="feature">
            <div className="top">
                <h1 className="title">Tổng doanh thu theo ngày</h1>
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
                        <p className="title">Doanh thu theo ngày </p>
                        <p className="amount">{formatMoney(salesByDate)} VNĐ</p>
                    </div>
                    <div className="item">
                        <div className="featureChart">
                            <CircularProgressbar
                                value={percentTargetMonth}
                                text={`${percentTargetMonth}%`}
                                strokeWidth={5}
                            />
                        </div>
                        <p className="title">Doanh thu theo tháng </p>
                        <p className="amount">{formatMoney(salesByMonth)} VNĐ</p>
                    </div>
                    <div className="item">
                        <div className="featureChart">
                            <CircularProgressbar
                                value={percentTargetYear}
                                text={`${percentTargetYear}%`}
                                strokeWidth={5}
                            />
                        </div>
                        <p className="title">Doanh thu theo năm </p>
                        <p className="amount">{formatMoney(salesByYear)} VNĐ</p>
                    </div>
                </div>
                {/* <p className="desc">
          Previous Transaction Processing, Last Payment may not be inclided
        </p> */}
                <p className="summary">
                    <div className="item">
                        <div className="itemTitle">Mục tiêu ngày</div>
                        <div className={`${salesByDate > targetDate ? "itemResult positive" : "itemResult negative"}`}>
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
                        <div className={`${salesByMonth > targetMonth ? "itemResult positive" : "itemResult negative"}`}>
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
                        <div className={`${salesByYear > targetYear ? "itemResult positive" : "itemResult negative"}`}>
                            {percentTargetYear > 100 ? (
                                <KeyboardArrowUpIcon fontSize="small" />
                            ) : (
                                <KeyboardArrowDownIcon fontSize="small" />
                            )}

                            <div className="resultAmount">{formatMoney(targetYear)} VNĐ</div>
                        </div>
                    </div>
                </p>
            </div>
        </div>
    );
};

export default Feature;
