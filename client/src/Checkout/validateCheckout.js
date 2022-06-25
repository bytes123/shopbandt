export default function validateCheckout(values) {
  let errors = {};
  const regexPhone =
    /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

  if (!values.name) {
    errors.name = "Vui lòng nhập họ và tên";
  }

  if (!values.phone_number) {
    errors.phone_number = "Vui lòng nhập số điện thoại";
  } else if (!regexPhone.test(values.phone_number)) {
    errors.phone_number = "Vui lòng nhập số điện thoại hợp lệ";
  }

  if (!values.address) {
    errors.address = "Vui lòng nhập địa chỉ";
  }

  if (values.district == "") {
    errors.district = "Vui lòng chọn quận/huyện";
  }

  if (values.ward == "") {
    errors.ward = "Vui lòng chọn phường/xã";
  }

  return errors;
}
