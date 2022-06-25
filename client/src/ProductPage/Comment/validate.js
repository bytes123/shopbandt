export default function validat(values) {
  let errors = {};

  const regexPhone =
    /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

  if (!values.fullname) {
    errors.fullname = "Vui lòng nhập họ và tên";
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = "Vui lòng nhập số điện thoại";
  } else if (!regexPhone.test(values.phoneNumber)) {
    errors.phoneNumber = "Vui lòng nhập số điện thoại hợp lệ";
  }

  return errors;
}
