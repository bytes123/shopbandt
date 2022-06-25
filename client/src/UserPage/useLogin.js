import { useStateValue } from "../StateProvider";
import { useState, useEffect } from "react";

const useLogin = (callback) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
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
    newValues(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
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
