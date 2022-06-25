import React, { useState, useEffect } from "react";
import "./AdminPage.css";
import Home from "./pages/home/Home";
import Toast from "../toast/Toast";
import { useStateValue } from "../StateProvider";
import moment from "moment";

export default function AdminPage() {
  const [dataSales, setDataSales] = useState({
    salesToday: 0,
    salesByDate: 0,
    salesByMonth: 0,
    salesByYear: 0,
    salesTomorrow: 0,
    salesMonth: 0,
    salesLastMonth: 0,
    salesYear: 0,
    salesLastYear: 0,
    salesInWeek: {},
  });
  const weekday = [
    "",
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];

  const [dataChart, setDataChart] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const axios = require("axios");
  const { error, success } = Toast;

  const [{ formatMoney }, dispatch] = useStateValue();

  const getSalesToday = async (name) => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:5000/get-sales-today",
      });

      if (response.data) {
        const { revenue } = response.data;
        dataSales.salesToday = revenue ?? 0;
        setDataSales({ ...dataSales });
      } else {
        error("Lỗi");
      }
    } catch (error) {
      error("Lỗi");
    }
  };

  const getSalesTomorrow = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:5000/get-sales-tomorrow",
      });

      if (response.data) {
        const { revenue } = response.data ?? 0;
        dataSales.salesTomorrow = revenue;
        setDataSales({ ...dataSales });
      } else {
        error("Lỗi");
      }
    } catch (error) {
      error("Lỗi");
    }
  };

  const getSalesByDate = async (date) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/get-sales-by-date",
        data: {
          date: moment(date).format("YYYY-MM-DD"),
        },
      });

      if (response.data) {
        const { revenue } = response.data;
        dataSales.salesByDate = revenue ?? 0;
        console.log(dataSales);
        setDataSales({ ...dataSales });
        // const { revenue } = response.data ?? 0;
        // dataSales.salesTomorrow = revenue;
        // setDataSales({ ...dataSales });
      } else {
        error("Lỗi");
      }
    } catch (error) {
      error("Lỗi");
    }
  };

  const getSalesByMonth = async (date) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/get-sales-by-month",
        data: {
          date: moment(date).format("YYYY-MM-DD"),
        },
      });

      if (response.data) {
        const { revenue } = response.data;
        console.log(revenue);
        dataSales.salesByMonth = revenue;
        console.log(dataSales);
        setDataSales({ ...dataSales });
        // const { revenue } = response.data ?? 0;
        // dataSales.salesTomorrow = revenue;
        // setDataSales({ ...dataSales });
      } else {
        error("Lỗi");
      }
    } catch (error) {
      error("Lỗi");
    }
  };

  const getSalesByYear = async (date) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/get-sales-by-year",
        data: {
          date: moment(date).format("YYYY-MM-DD"),
        },
      });

      if (response.data) {
        const { revenue } = response.data;
        dataSales.salesByYear = revenue ?? 0;
        setDataSales({ ...dataSales });
        // const { revenue } = response.data ?? 0;
        // dataSales.salesTomorrow = revenue;
        // setDataSales({ ...dataSales });
      } else {
        error("Lỗi");
      }
    } catch (error) {
      error("Lỗi");
    }
  };

  const getSalesMonth = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:5000/get-sales-year",
      });

      if (response.data) {
        const { revenue } = response.data ?? 0;
        dataSales.salesMonth = revenue;
        setDataSales({ ...dataSales });
      } else {
        error("Lỗi");
      }
    } catch (error) {
      error("Lỗi");
    }
  };

  const getSalesLastMonth = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:5000/get-sales-lastmonth",
      });

      if (response.data) {
        const { revenue } = response.data ?? 0;
        dataSales.salesLastMonth = revenue;
        setDataSales({ ...dataSales });
      } else {
        error("Lỗi");
      }
    } catch (error) {
      error("Lỗi");
    }
  };

  const getSalesYear = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:5000/get-sales-year",
      });

      if (response.data) {
        const { revenue } = response.data ?? 0;
        dataSales.salesYear = revenue;
        setDataSales({ ...dataSales });
      } else {
        error("Lỗi");
      }
    } catch (error) {
      error("Lỗi");
    }
  };

  const getSalesLastYear = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:5000/get-sales-lastyear",
      });

      if (response.data) {
        const { revenue } = response.data ?? 0;
        dataSales.salesLastYear = revenue;
        setDataSales({ ...dataSales });
      } else {
        error("Lỗi");
      }
    } catch (error) {
      error("Lỗi");
    }
  };

  const getSalesInWeek = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:5000/get-sales-inweek",
      });

      if (Array.isArray(response.data)) {
        dataSales.salesInWeek = response.data;
        setDataSales({ ...dataSales });
      } else {
        error("Lỗi");
      }
    } catch (error) {
      error("Lỗi");
    }
  };

  useEffect(() => {
    if (selectedDate != "Invalid Date") {
      getSalesByDate(selectedDate);
      getSalesByMonth(selectedDate);
      getSalesByYear(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    getSalesToday();
    getSalesTomorrow();
    getSalesMonth();
    getSalesLastMonth();
    getSalesYear();
    getSalesLastYear();
    getSalesInWeek();
  }, []);

  useEffect(() => {
    if (dataSales && Array.isArray(dataSales.salesInWeek)) {
      const data = weekday.map((item, index) => {
        return {
          name: item,
          Total: 0,
        };
      });

      dataSales.salesInWeek.forEach((item) => {
        data[item.stat_day].Total = item.total;
      });

      setDataChart(data);
    }
  }, [dataSales]);

  return (
    <div>
      <Home
        selectedDate={selectedDate}
        onSelectedDate={setSelectedDate}
        dataChart={dataChart}
        isHome={true}
        dataSales={dataSales}
      />
    </div>
  );
}
