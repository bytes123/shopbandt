const Bills = require("../models/Bills");
module.exports = {
  insertBills(req, res) {
    console.log(req.body);
    if (req.body.data.profile.bill_ship) {
      const basket = JSON.parse(req.body.data.basket);
      const full_name = req.body.data.profile.full_name;
      const phone_number = req.body.data.profile.phone_number;
      const bill_address = req.body.data.profile.bill_address;
      const bill_ship = req.body.data.profile.bill_ship;
      const bill_request = req.body.data.profile.bill_request;
      const bill_price = req.body.data.profile.bill_price;
      const user_id = req.body.data.profile.user_id;
      const gender = req.body.data.profile.gender;
      const create_date = new Date();

      const data = {
        full_name: full_name,
        phone_number: phone_number,
        gender: gender,
        bill_address: bill_address,
        bill_request: bill_request,
        bill_price: bill_price,
        bill_ship: bill_ship,
        user_id: user_id,
        create_date: create_date,
      };
      Bills.insertBills(data, (err, response) => {
        if (err) throw err;
        Bills.getBillById((err, response) => {
          if (err) throw err;
          basket.map((data) => {
            data.bill_id = response[0].bill_id;
            Bills.insertDetailsBill(data, (err, response) => {
              if (err) throw err;
            });
          });
          return res.json(response);
        });
      });
    } else {
      const basket = JSON.parse(req.body.data.basket);
      const full_name = req.body.data.profile.full_name;
      const phone_number = req.body.data.profile.phone_number;
      const bill_address = req.body.data.profile.bill_address;
      const bill_request = req.body.data.profile.bill_request;
      const bill_price = req.body.data.profile.bill_price;
      const user_id = req.body.data.profile.user_id;
      const gender = req.body.data.profile.gender;
      const create_date = new Date();

      const data = {
        full_name: full_name,
        phone_number: phone_number,
        gender: gender,
        bill_address: bill_address,
        bill_request: bill_request,
        bill_price: bill_price,
        user_id: user_id,
        create_date: create_date,
      };
      Bills.insertBills(data, (err, response) => {
        if (err) throw err;
        Bills.getBillById((err, response) => {
          if (err) throw err;
          basket.map((data) => {
            data.bill_id = response[0].bill_id;
            Bills.insertDetailsBill(data, (err, response) => {
              if (err) throw err;
            });
          });
          return res.json(response);
        });
      });
    }
  },
  getBills(req, res) {
    Bills.getBills((err, response) => {
      if (err) throw err;
      return res.json(response);
    });
  },
  getBillsUser(req, res) {
    const user_id = req.body.user_id;
    console.log(user_id);
    Bills.getBillsUser(user_id, (err, response) => {
      if (err) throw err;
      return res.json(response);
    });
  },
  getDetailBill(req, res) {
    const data = req.body.data;
    console.log(data);
    Bills.getDetailBill(data, (err, response) => {
      if (err) throw err;

      return res.json(response);
    });
  },
  searchBills: (req, res) => {
    const bill_id = req.body.bill_id;
    Bills.searchBills(bill_id, (err, response) => {
      if (err) throw err;
      return res.json(response);
    });
  },
  searchBillsUser: (req, res) => {
    const data = req.body.data;

    Bills.searchBillsUser(data, (err, response) => {
      if (err) throw err;
      return res.json(response);
    });
  },
  confirmBill: (req, res) => {
    const bill_id = req.body.bill_id;
    const confirm_date = new Date();
    const data = {
      confirm_date: confirm_date,
      bill_id: bill_id,
    };

    Bills.confirmBill(data, (err, response) => {
      if (err) throw err;
      return res.json("Duyệt thành công");
    });
  },
  destroyBill: (req, res) => {
    const bill_id = req.body.bill_id;
    const cancel_date = new Date();
    const data = {
      cancel_date: cancel_date,
      bill_id: bill_id,
    };
    Bills.destroyBill(data, (err, response) => {
      if (err) throw err;
      return res.json("Hủy thành công");
    });
  },
  deleteBill: (req, res) => {
    const bill_id = req.body.bill_id;
    Bills.deleteBill(bill_id, (err, response) => {
      if (err) throw err;
      return res.json("Xóa thành công");
    });
  },
};
