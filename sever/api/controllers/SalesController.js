const Bills = require("../models/Bills");
module.exports = {
  getSalesToday(req, res) {
    Bills.getSalesToday((err, response) => {
      if (err) throw err;
      return res.json(response[0]);
    });
  },
  getSalesTomorrow(req, res) {
    Bills.getSalesTomorrow((err, response) => {
      if (err) throw err;
      return res.json(response[0]);
    });
  },
  getSalesMonth(req, res) {
    Bills.getSalesMonth((err, response) => {
      if (err) throw err;
      return res.json(response[0]);
    });
  },
  getSalesLastMonth(req, res) {
    Bills.getSalesLastMonth((err, response) => {
      if (err) throw err;
      return res.json(response[0]);
    });
  },

  getSalesYear(req, res) {
    Bills.getSalesYear((err, response) => {
      if (err) throw err;
      return res.json(response[0]);
    });
  },
  getSalesLastYear(req, res) {
    Bills.getSalesLastYear((err, response) => {
      if (err) throw err;
      return res.json(response[0]);
    });
  },
  getSalesWeek(req, res) {
    Bills.getSalesWeek((err, response) => {
      if (err) throw err;
      return res.json(response);
    });
  },
  getSalesByDate(req, res) {
    const date = req.body.date;
    Bills.getSalesByDate(date, (err, response) => {
      if (err) throw err;
      return res.json(...response);
    });
  },
  getSalesByMonth(req, res) {
    const date = req.body.date;
    Bills.getSalesByMonth(date, (err, response) => {
      if (err) throw err;
      return res.json(...response);
    });
  },
  getSalesByYear(req, res) {
    const date = req.body.date;
    Bills.getSalesByYear(date, (err, response) => {
      if (err) throw err;
      return res.json(...response);
    });
  },
};
