"use strict";
const nodemailer = require("nodemailer");

async function resetLink(email, id) {
  const output = `
  <!doctype html>
  <html lang="en-US">
  
  <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <meta name="description" content="Reset Password Email.">
      <style type="text/css">
          a:hover {text-decoration: underline !important;}
      </style>
  </head>
  
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
      <!--100% body table-->
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
          style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
          <tr>
              <td>
                  <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                      align="center" cellpadding="0" cellspacing="0">
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="text-align:center;">
                            <a href="https://rakeshmandal.com" title="logo" target="_blank">
                              <img width="60" src="https://scontent.fvca1-4.fna.fbcdn.net/v/t1.15752-9/285017660_1688503808175272_3752495671608753735_n.png?_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_ohc=1ERPPn9f1BQAX9CzI_B&tn=kdaB1S8ffr3dsZBs&_nc_ht=scontent.fvca1-4.fna&oh=03_AVKqf3cKUdSQgLg7zx7sLN4vGD3y5SACgEbZyqzzBvBsBQ&oe=62C4ABD2" title="logo" alt="logo">
                            </a>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td>
                              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                  style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                                  <tr>
                                      <td style="padding:0 35px;">
                                          <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Bạn có một lời mời reset lại mật khẩu</h1>
                                          <span
                                              style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                          <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                          Chúng tôi không thể đơn giản gửi cho bạn mật khẩu cũ của bạn. Một liên kết duy nhất để đặt lại mật khẩu của bạn đã được tạo cho bạn. Để đặt lại mật khẩu của bạn, nhấp vào liên kết sau và làm theo hướng dẫn.
                                          </p>
                                          <a href="http://localhost:3000/reset-password/${id}"
                                              style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset mật khẩu</a>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                              </table>
                          </td>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="text-align:center;">
                              <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.siuuphone.com</strong></p>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
      <!--/100% body table-->
  </body>
  
  </html>`;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    domain: "gmail.com",
    auth: {
      user: "minhtan2792001@gmail.com", // generated ethereal user
      pass: "rleykkezpqhvvsti", // generated ethereal password
    },
    authentication: "plain",
  });

  // send mail with defined transport object
  let mainOptions = await transporter.sendMail({
    from: '"Siuu Phone" <minhtan2792001@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Reset mật khẩu ✔",
    html: output, // html body
  });

  transporter.sendMail(mainOptions, (err, info) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
}

module.exports = resetLink;
