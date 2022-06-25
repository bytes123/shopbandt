import { useStateValue } from "../StateProvider";
import { useState, useEffect } from "react";

const useCheckout = (callback, validate) => {
  const [values, setValues] = useState({
    gender: "Nam",
    name: "",
    phone_number: "",
    province: "",
    district: "",
    ward: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [intitalState, dispatch] = useStateValue();

  const clearErrors = (name) => {
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const newValues = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const changeProfile = () => {
    dispatch({
      type: "CHANGE_PROFILE",
      payload: {
        name: values.name,
        phone_number: values.phone_number,
        address:
          values.address +
          " " +
          values.ward.name +
          " " +
          values.district.name +
          " " +
          values.province.name,
        request: values.request,
        gender: values.gender,
      },
    });
  };

  const handleAddress = (name, item) => {
    newValues(name, item);
  };

  const handleChange = (e) => {
    const { name, htmlFor, value, innerHTML } = e.target;
    clearErrors(name || htmlFor);
    newValues(name || htmlFor, value || innerHTML);
  };
  useEffect(() => {
    changeProfile();
  }, [values]);

  useEffect(() => {
    if (errors.district) {
      clearErrors("district");
    }
  }, [values.district]);
  useEffect(() => {
    if (errors.ward) {
      clearErrors("ward");
    }
  }, [values.ward]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };
  useEffect(() => {
    // console.log(Object.keys(errors).length)
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(values);
    }
  }, [errors]);

  return { values, handleSubmit, handleChange, handleAddress, errors };
};

export default useCheckout;
