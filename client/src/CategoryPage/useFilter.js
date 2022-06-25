import { useState, useEffect } from "react";

const useFilter = (callback, validate) => {
  const [filterValues, setFilterValues] = useState({
    filter_brand: "",
    filter_price: "",
    filter_ram: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setNewFilterValues = (name, value) => {
    setFilterValues({
      ...filterValues,
      [name]: value,
    });
  };

  const resetFilterValues = (name, value) => {
    setFilterValues({
      filter_brand: "",
      filter_price: "",
      filter_ram: "",
    });
  };

  return { filterValues, setNewFilterValues, resetFilterValues };
};

export default useFilter;
