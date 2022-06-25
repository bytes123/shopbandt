export default function validateCheckout(values) {
  let errors = {};

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  if (!values.username.trim()) {
    errors.username = "Vui lòng nhập tài khoản";
  }

  if (!values.password.trim()) {
    errors.password = "Vui lòng nhập mật khẩu";
  } else if (values.password.length < 6) {
    errors.password = "Vui lòng nhập mật khẩu từ 6 ký tự trở lên";
  }

  if (!values.confirmPassword.trim()) {
    errors.confirmPassword = "Vui lòng nhập xác nhận mật khẩu";
  } else if (values.confirmPassword != values.password) {
    errors.confirmPassword = "Xác nhận mật khẩu không khớp";
  }

  if (!values.email.trim()) {
    errors.email = "Vui lòng nhập email";
  } else if (!validateEmail(values.email)) {
    errors.email = "Vui lòng nhập email hợp lệ";
  }

  return errors;
}
