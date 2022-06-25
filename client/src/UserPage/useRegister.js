import { useStateValue } from "../StateProvider";
import { useState, useEffect } from "react";

const useLogin = (callback, validate, setNotice) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    clearErrors(name);
    setNotice();
    newValues(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(validate(values));
    setErrors(validate(values));
    setIsSubmitting(true);
  };
  useEffect(() => {
    // console.log(Object.keys(errors).length)
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(values);
    }
  }, [errors]);

  return { values, handleSubmit, handleChange, errors, setErrors };
};

export default useLogin;
